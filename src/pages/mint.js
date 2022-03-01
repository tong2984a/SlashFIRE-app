import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import ResetCSS from 'common/assets/css/style';
import { GlobalStyle, AgencyWrapper } from 'containers/Agency/agency.style';
import Navbar from 'containers/Agency/Navbar';
import BannerSection from 'containers/Agency/BannerSection';
import MintSection from 'containers/Agency/MintSection';
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

import Coin from 'common/assets/image/Coin_FRONT_black.png'
import { ethers } from 'ethers'
import { useEffect, useState, createContext } from 'react'
import config from '../config.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
const tokenSymbol = config['token']['symbol']
const tokenPrice = config['token']['price']
const tokenWatchAssetUrl = config['token']['wallet_watchAsset']['url']
const tokenURIHash = config['token']['tokenURI.json']['hash']
const nftaddress = config['deployed']['nftaddress']
//const nftmarketaddress = config['deployed']['nftmarketaddress']
const envChainName = config['deployed']['envChain']['name']
const envChainId = config['deployed']['envChain']['id']
export const UserContext = createContext()

const Main = () => {
  const [nft, setNft] = useState({
    tokenId: 0,
    itemId: 0,
    symbol: tokenSymbol,
    image: tokenWatchAssetUrl,
    nftContract: 0,
    decimals: 0,
    bidPrice: tokenPrice,
    tokenUri: ''
  })
  const [address, setAddress] = useState('')
  const [info, updateInfo] = useState({ title: '', message: '' })
  const [contracts, setContracts] = useState([])

  async function getPriceFromAPI() {
    let new_price = tokenPrice
    try {
      const response = await fetch('https://slashfire.io/_functions/nft', {
          method: 'GET'
      })
      const response_data = await response.json()

      new_price = response_data.nft[0].price
      console.log('Success:', response_data)
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        console.error('Error:', message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setNft(prevState => ({
      ...prevState,
      bidPrice: new_price
    }))
    return new_price
  }

  useEffect(() => {
    if (window.ethereum) { //any provider?
      handleAccountsRequest() //display price

      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        handleAccountsRequest() //display price
        if (chainId === envChainId) {
          //handleAccountsRequest() //display price
        } else {
          updateInfo({title: 'Error - Please check your wallet and try again', message: `Error - Is your wallet connected to ${envChainName}?`})
        }
      })
    } else {
      getPriceFromAPI()
      updateInfo({title: 'Error - Non-Ethereum browser detected.', message: 'You should consider installing MetaMask'})
    }
    return function cleanup() {
      //mounted = false
    }
  }, [])

  async function handleMint(nft) {
    if (window.ethereum) { //any provider?
      updateInfo({title: 'Connecting to your MetaMask wallet...', message: 'Please wait.'})
      try {
        let bidPrice = await getPriceFromContract()
        let transaction = await nftContract.createToken(tokenURIHash, {value: bidPrice})
        let tx = await transaction.wait()
        updateInfo({title: '', message: ''})
      } catch (error) {
        if (error.data) {
          updateInfo({title:`Crypto Wallet Error:`, message:`${error.data.message}`})
        } else {
          updateInfo({title:`Crypto Wallet Error:`, message:`${error.message || error}`})
        }
      }
    } else {
      updateInfo({title: 'Error - Non-Ethereum browser detected.', message: 'You should consider installing MetaMask'})
    }
  }

  async function getPriceFromContract() {
    await _ethAccountsRequest()  //any signer account?
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    let nftContract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let bidPrice = await nftContract.getListingPrice()
    setNft(prevState => ({
      ...prevState,
      bidPrice: parseInt(bidPrice) / 10**18,
    }))
    return bidPrice
  }

  async function handleAccountsRequest() {
    try {
      updateInfo({title: 'Connecting to your MetaMask wallet...', message: 'Please wait.'})
      await getPriceFromContract()
      updateInfo({title: 'Metamask wallet adapter is connected and ready to use.', message: ''})
    } catch(error) {
      await getPriceFromAPI()
      updateInfo({title: error.title, message: error.message})
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
        setAddress(accounts[0])
        updateInfo({title: '', message: "Metamask wallet adapter is connected and ready to use."})
      }
    } else {
      throw {title: 'Error - Non-Ethereum browser detected.', message: 'You should consider installing MetaMask'}
    }
  }

  return (
    <UserContext.Provider value={{contractsState:[contracts, setContracts], infoState: [info, updateInfo], nftState: [nft, setNft], addressState: [address, setAddress]}}>
    <ThemeProvider theme={agencyTheme}>
      <AgencyWrapper>
        <MintSection handleAccountsRequest={handleAccountsRequest} handleMint={handleMint} />
      </AgencyWrapper>
    </ThemeProvider>
    </UserContext.Provider>
  );
};
export default Main;
