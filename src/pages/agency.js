import React, { Fragment } from 'react';
import { useEffect, useState, createContext } from 'react'
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import ResetCSS from 'common/assets/css/style';
import { GlobalStyle, AgencyWrapper } from 'containers/Agency/agency.style';
import Navbar from 'containers/AgencyDigital/Navbar';
import BannerSection from 'containers/AgencyDigital/Banner';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import FaqSection from 'containers/Agency/FaqSection';
import { ethers } from 'ethers'
import config from '../config.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import Auction from '../artifacts/contracts/Auction.sol/Auction.json'
export const UserContext = createContext()

const tokenSymbol = config['token']['symbol']
const tokenWatchAssetUrl = config['token']['wallet_watchAsset']['url']
const nftaddress = config['deployed']['nftaddress']
const nftmarketaddress = config['deployed']['nftmarketaddress']
const auctionAddress = config['deployed']['auctionAddress']
const envChainName = config['deployed']['envChain']['name']
const envChainId = config['deployed']['envChain']['id']

const Agency = () => {
  const [info, updateInfo] = useState({})
  const [nfts, setNfts] = useState([{
    tokenId: '-',
    itemId: '-',
    symbol: tokenSymbol,
    image: tokenWatchAssetUrl,
    nftContract: 0,
    decimals: 0,
    bidPrice: '-',
    tokenUri: ''
  }])
  const [formInput, updateFormInput] = useState({ bidPrice: '' })
  const [bids, setBids] = useState([])
  const [refund, setRefund] = useState(0)

  useEffect(() => {
    if (window.ethereum) {
      //let nft = new ethers.Contract(nftaddress, NFT.abi, signer)
      //let market = new ethers.Contract(nftmarketaddress, Market.abi, signer)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      let auctionContract = new ethers.Contract(auctionAddress, Auction.abi, signer)
      const bidFilter = auctionContract.filters.HighestBidIncreased(null, null)
      auctionContract.on(bidFilter, async (sender, value, event) => {
        let [accounts, chainId] = await handleAccountsRequest()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        let auctionContract = new ethers.Contract(auctionAddress, Auction.abi, signer)
        const BLOCKS_PER_DAY = 6_500
        const bidFilter = auctionContract.filters.HighestBidIncreased(null, null)
        const previousBids = await auctionContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
        let arr = previousBids.map((event, i) => {
          let bidder = event.args[0]
          let bidderShort = [bidder.substr(0, 4), bidder.substr(38, 4)].join('...')
          let bidPrice = ethers.utils.formatUnits(event.args[1].toString(), 'ether')
          return {bidder, bidderShort, bidPrice}
        })
        let sorted_arr = arr.sort(function(a, b) {
          return b.bidPrice - a.bidPrice
        })
        setBids(sorted_arr)
        let payment = await auctionContract.payments(accounts[0])
        if (payment > 0) {
          setRefund(payment)
          updateInfo({showModal: true, loading: true, btn:'Withdraw Now', title: "Funds Available", message: "You may withdraw previous bids that were overbid once the auction is over."})
        } else {
          updateInfo({showModal: false, message: ''})
        }
      })
      handleAccountsRequest()
    } else {
      updateInfo({message: "Non-Ethereum browser detected. You should consider installing MetaMask."})
    }
    return function cleanup() {
      //mounted = false
    }
  }, [])

  async function handleAccountsRequest() {
    try {
      return await _ethAccountsRequest()
    } catch(error) {
      updateInfo({message: error.message})
    }
  }

  async function _ethAccountsRequest() {
    if (window.ethereum) {
      let result = await Promise.all([
        window.ethereum.request({ method: 'eth_requestAccounts' }),
        window.ethereum.request({ method: 'eth_chainId' })
      ]).catch((error) => {
        if (error.code === 4001) {
          throw {title: 'Error - Please check your wallet and try again', message: 'Connection request has been rejected. '}
        } else if (error.code === -32002) {
          throw {title: 'Error - Please check your wallet and try again', message: error.message}
        } else {
          throw {title: 'Error - Please check your wallet and try again', message: error.message}
        }
      })
      if (result) {
        let [accounts, chainId] = result
        if (accounts.length === 0) {
          throw {title: 'Error - Please check your wallet and try again', message: `MetaMask is locked or the user has not connected any accounts`}
        }
        if (chainId !== envChainId) {
          throw {title: 'Error - Please check your wallet and try again', message: `Error - Is your wallet connected to ${envChainName}?`}
        }
        updateInfo({message: "Metamask wallet adapter is connected and ready to use."})
      }
      return result
    } else {
      throw {title: 'Error - Non-Ethereum browser detected.', message: 'You should consider installing MetaMask'}
    }
  }

  async function handleRegister() {
    try {
      await _ethRegister()
      //do not rethrow because Brave wallet does not yet support wallet_requestPermissions
    } catch(error) {
      updateInfo({message: error.message})
    }
  }

  async function _ethRegister() {
    if (window.ethereum) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        let wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: nftaddress,
              symbol: tokenSymbol,
              decimals: 0,
              image: tokenWatchAssetUrl,
              abi: NFT.abi
            }
          }
        })
        if (wasAdded) {
          updateInfo({message: "Thanks for your interest!"})
        }
      } catch(err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          updateInfo({message: "Please connect to MetaMask."})
        } else {
          updateInfo({message: err.message || err})
        }
      }
    } else {
      updateInfo({message: "Unable to process without a crypto wallet. Please refresh screen to try again."})
    }
  }

  async function register(nft) {
    updateInfo({message: ''})
    if (nft.tokenId === '-') {
      return updateInfo({message: "Unable to connect to network. Please check MetaMask and try again."})
    }
    if (window.ethereum) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        let wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: nft.nftContract,
              symbol: nft.symbol,
              decimals: 0,
              image: `ipfs://${tokenWatchAssetUrl}`,
              abi: NFT.abi
            }
          }
        })
        if (wasAdded) {
          updateInfo({message: 'Thanks for your interest!'})
        }
      } catch(err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          updateInfo({message: 'Please connect to MetaMask.'})
        } else {
          updateInfo({message: (err.message || err)})
        }
      }
    } else {
      updateInfo({message: "Unable to process without a crypto wallet. Please refresh screen to try again."})
    }
  }

  return (
    <UserContext.Provider value={{infoState: [info, updateInfo], nftsState: [nfts, setNfts], bidsState: [bids, setBids], refundState: [refund, setRefund]}}>
    <ThemeProvider theme={agencyTheme}>
     <Fragment>
        {/* Start agency head section */}
        <Head>
          <title>SlashFIRE</title>
          <meta name="theme-color" content="#10ac84" />
          <meta name="Description" content="SlashFIRE" />
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
              <Navbar handleRegister={handleRegister} />
            </DrawerProvider>
          </Sticky>
          <BannerSection handleAccountsRequest={handleAccountsRequest} />
        </AgencyWrapper>
        {/* End of agency wrapper section */}
      </Fragment>
    </ThemeProvider>
    </UserContext.Provider>
  );
};
export default Agency;
