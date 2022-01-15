import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import ResetCSS from 'common/assets/css/style';
import { GlobalStyle, AgencyWrapper } from 'containers/Agency/agency.style';
import Navbar from 'containers/Agency/Navbar';
import BannerSection from 'containers/Agency/BannerSection';
import FeatureSection from 'containers/Agency/FeatureSection';
import AboutUsSection from 'containers/Agency/AboutUsSection';
import WorkHistory from 'containers/Agency/WorkHistory';
import BlogSection from 'containers/Agency/BlogSection';
import TestimonialSection from 'containers/Agency/TestimonialSection';
import TeamSection from 'containers/Agency/TeamSection';
import VideoSection from 'containers/Agency/VideoSection';
import NewsletterSection from 'containers/Agency/NewsletterSection';
import QualitySection from 'containers/Agency/QualitySection';
import Footer from 'containers/Agency/Footer';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import FaqSection from 'containers/Agency/FaqSection';

import { ethers } from 'ethers'
import { useEffect, useState, createContext } from 'react'
import {
  nftaddress, nftmarketaddress, envChainName, envChainId, contract_owner
} from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export const UserContext = createContext()

const Main = () => {
  const [nfts, setNfts] = useState([])
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [contracts, setContracts] = useState([])

  async function loadNfts(nft, market, envChainId) {
    let marketItems = await market.fetchMarketItems()
    marketItems = await Promise.all(marketItems.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      const bidPrice = Number(ethers.utils.formatEther( i.price ))
      // auctionAmount = Math.max(1, auctionAmount)
      let item = {
        tokenId: i.tokenId.toNumber(),
        itemId: i.itemId.toNumber(),
        symbol: 'FIRE',
        image: 'https://ipfs.infura.io/ipfs/QmdCRJtV5zppqUD9vFwFwHSru6SSdQokQZZAKabuPTWKxE',
        nftContract: i.nftContract,
        decimals: 0,
        bidPrice,
        tokenUri: tokenUri || ''
      }
      return item
    }))

    if (marketItems.length > 0) {
      setNfts(marketItems)
    } else {
      let item = {
        tokenId: 0,
        itemId: 0,
        symbol: 'FIRE',
        image: 'https://ipfs.infura.io/ipfs/QmdCRJtV5zppqUD9vFwFwHSru6SSdQokQZZAKabuPTWKxE',
        nftContract: 0,
        decimals: 0,
        bidPrice: 1.01,
        tokenUri: ''
      }
      setNfts([item])
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      let nft = new ethers.Contract(nftaddress, NFT.abi, signer)
      let market = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      setContracts({nft, market, envChainId})

      market.on("MarketItemCreated", (itemId, nftContract, tokenId, seller, owner, price) => {
        loadNfts(nft, market, envChainId)
      })

      market.on("MarketItemSold", (itemId, nftContract, tokenId, owner, seller, price) => {
        loadNfts(nft, market, envChainId)
      })

      loadNfts(nft, market, envChainId)
    }
    return function cleanup() {
      //mounted = false
    }
  }, [])

  async function handleMint(nft) {
    if (nft.tokenId === '-') {
      return setMessage("Unable to connect to network. Please check MetaMask and try again.")
    }
    if (window.ethereum) {
      setMessage("Please wait. Smart contract is processing.")
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        let market = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        let biddingPrice = ethers.utils.parseUnits(nft.bidPrice.toString(), 'ether')
        let transaction = await market.createMarketSale(nft.nftContract, nft.itemId, {value: biddingPrice})
        let tx = await transaction.wait()
        setMessage("")
      } catch (error) {
        if (error.data) {
          setMessage(`Crypto Wallet Error: ${error.data.message}`)
        } else {
          setMessage(`Crypto Wallet Error: ${error.message || error}`)
        }
      }
    } else {
      setMessage("Non-Ethereum browser detected. You should consider installing MetaMask.")
    }
  }

  async function handleWalletRequestPermissions() {
    try {
      await ethWalletRequestPermissions()
      //do not rethrow because Brave wallet does not yet support wallet_requestPermissions
    } catch(error) {
      setMessage(error.message)
    }
  }

  async function handleAccountsRequest() {
    try {
      await ethAccountsRequest()
    } catch(error) {
      setMessage(error.message)
    }
  }

  async function ethAccountsRequest() {
    if (window.ethereum) {
      let result = await Promise.all([
        window.ethereum.request({ method: 'eth_requestAccounts' }),
        window.ethereum.request({ method: 'eth_chainId' })
      ]).catch((error) => {
        console.error(error)
        if (error.code === 4001) {
          throw {title: 'Error - Please check your wallet and try again', message: 'Connection request has been rejected. '}
        } else if (error.code === -32002) {
          throw {title: 'Error - Please check your wallet and try again', message: error.message}
        } else {
          throw {title: 'Error - Please check your wallet and try again', message: error.message}
        }
      })
      if (result) {
        console.log(result)
        let [accounts, chainId] = result
        if (accounts.length === 0) {
          throw {title: 'Error - Please check your wallet and try again', message: `MetaMask is locked or the user has not connected any accounts`}
        }
        if (chainId !== envChainId) {
          throw {title: 'Error - Please check your wallet and try again', message: `Error - Is your wallet connected to ${envChainName}?`}
        }
        setAddress(accounts[0])
        setMessage("Metamask wallet adapter is connected and ready to use.")
      }
    } else {
      throw {title: 'Error - Non-Ethereum browser detected.', message: 'You should consider installing MetaMask'}
    }
  }

  async function ethWalletRequestPermissions() {
    if (window.ethereum) {
      try {
        let permissions = await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {}
            }
          ]
        })
        const accountsPermission = permissions.find(
          (permission) => permission.parentCapability === 'eth_accounts'
        )
        if (accountsPermission) {
          setMessage('eth_accounts permission successfully requested!')
        }
      } catch(error) {
        if (error.code === 4001) {
          throw {title: 'Error - Please check your wallet and try again', message: 'Connection request has been rejected. '}
        } else if (error.code === -32601) {
          throw {title: 'Error - Please check your wallet and try again', message: 'Permissions needed to continue.'}
        } else if (error.code === -32002) {
          throw {title: 'Error - Please check your wallet and try again', message: error.message}
        } else {
          throw {title: 'Error - Please check your wallet and try again', message: error.message}
        }
      }
    } else {
      throw {title: 'Error - Non-Ethereum browser detected.', message: 'You should consider installing MetaMask'}
    }
  }

  return (
    <UserContext.Provider value={{contractsState:[contracts, setContracts], messageState: [message, setMessage], nftsState: [nfts, setNfts], addressState: [address, setAddress]}}>
    <ThemeProvider theme={agencyTheme}>
      <Fragment>
        {/* Start agency head section */}
        <Head>
          <title>SlashFIRE | A react next landing page</title>
          <meta name="theme-color" content="#10ac84" />
          <meta name="Description" content="SlashFIRE react next landing page" />
          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Epilogue&family=Poppins&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="stylesheet"></link>
        </Head>
        <ResetCSS />
        <GlobalStyle />
        {/* End of agency head section */}
        {/* Start agency wrapper section */}
        <AgencyWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar handleWalletRequestPermissions={handleWalletRequestPermissions} />
            </DrawerProvider>
          </Sticky>
          <BannerSection handleAccountsRequest={handleAccountsRequest} handleMint={handleMint} />
        </AgencyWrapper>
        {/* End of agency wrapper section */}
      </Fragment>
    </ThemeProvider>
    </UserContext.Provider>
  );
};
export default Main;
