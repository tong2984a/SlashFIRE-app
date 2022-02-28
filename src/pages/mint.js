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
    bidPrice: '',
    tokenUri: ''
  })
  const [address, setAddress] = useState('')
  const [info, updateInfo] = useState({ title: '', message: '' })
  const [contracts, setContracts] = useState([])

  function test() {
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkpXVFNpZ25pbmdDZXJ0LTIwMjAtTExFIiwicGkuYXRtIjoiNyJ9.eyJzY29wZSI6WyJjYWRhOmFkZHVzZXIiLCJjYWRhOmFkZHN1ZG9lciIsImNhZGE6YWRkcG9saWN5Z3JvdXAiLCJjYWRhOmFkZGhvc3QiLCJjYWRhOmFkZHVuaXhncm91cCIsImNhZGE6YWRkaG9zdGdyb3VwIiwiY2FkYTphZGRzdWRvdGVtcGxhdGUiLCJjYWRhOmNsb25laG9zdCIsImNhZGE6Y2xvbmV1c2VyIiwiY2FkYTphZGR1c2VyZ3JvdXAiLCJjYWRhOmRlbGV0ZWhvc3QiLCJjYWRhOmRlbGV0ZWhvc3Rncm91cCIsImNhZGE6ZGVsZXRlcG9saWN5Z3JvdXAiLCJjYWRhOmRlbGV0ZXN1ZG9lciIsImNhZGE6ZGVsZXRlc3Vkb3RlbXBsYXRlIiwiY2FkYTpkZWxldGV1bml4Z3JvdXAiLCJjYWRhOmRlbGV0ZXVzZXIiLCJjYWRhOmRlbGV0ZXVzZXJncm91cCIsImNhZGE6ZWRpdGhvc3QiLCJjYWRhOmVkaXRob3N0Z3JvdXAiLCJjYWRhOmVkaXRwb2xpY3lncm91cCIsImNhZGE6ZWRpdHN1ZG9lciIsImNhZGE6ZWRpdHN1ZG90ZW1wbGF0ZSIsImNhZGE6ZWRpdHVuaXhncm91cCIsImNhZGE6ZWRpdHVzZXIiLCJjYWRhOmVkaXR1c2VyZ3JvdXAiLCJjYWRhOmtyYnN1cHBvcnR1c2VyIiwiY2FkYTptYW5hZ2VwZXJtaXNzaW9ucyIsImNhZGE6cnNhc3VwcG9ydHVzZXIiLCJjYWRhOnZpZXdob3N0Z3JvdXAiLCJjYWRhOnZpZXdob3N0IiwiY2FkYTp2aWV3cG9saWN5Z3JvdXAiLCJjYWRhOnZpZXdzdWRvZXIiLCJjYWRhOnZpZXdzdWRvdGVtcGxhdGUiLCJjYWRhOnZpZXd1bml4Z3JvdXAiLCJjYWRhOnZpZXd1c2VyIiwiY2FkYTp2aWV3dXNlcmdyb3VwIl0sImNsaWVudF9pZCI6InNyYXZpMDA4Y19kZXZ0ZXN0IiwiaXNzIjoiaHR0cHM6Ly93ZWJzZWMtZGV2LmNhYmxlLmNvbWNhc3QuY29tIiwiZXhwIjoxNjIwNjY3Njk2fQ.JAdt8wcjpdZeTQEd_BI6-hn1RPeiycjcm4_AMsfeXsLEnnj30WCU-fdVxRCRFXuuD3WbulveCbupTeoBHwT1FSaZO6QY3kN2smr00vPgND-Ng82v8Mu9r_YJEJ14YbFq-WvU_U-OWYVzB2vtz8LoI9-BtMOKz4YRQCcgM5TBJpLjK2dXdtP5r1mui4ZMZmiQQiD90Sac9lUWeymrSH08wZKnLj7a5KD1DgPNNYJVkk8zMjF7MsLJ60cVQvG2EDH_DnqVZzbdmW1rHrf6BrJypJfiSO7ONZWbWPNNJiTJJRrUr4mniEMH-zAIkyvLoVV__OwC4fO2OVZOZiYjLm503A");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "XSRF-TOKEN=1646044811|Cnc9rQDPbaXo");

  var raw = JSON.stringify({
    "name": "FIRE",
    "price": 0.371,
    "identity": "admin"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://slashfire.io/_functions/nft", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

  useEffect(() => {
    test()
    if (window.ethereum) { //any provider?
      handleAccountsRequest() //display price

      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        if (chainId === envChainId) {
          handleAccountsRequest() //display price
        } else {
          updateInfo({title: 'Error - Please check your wallet and try again', message: `Error - Is your wallet connected to ${envChainName}?`})
        }
      })
    } else {
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
        await _ethAccountsRequest()  //any signer account?
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        let tokenURIHash = config['token']['tokenURI.json']['hash']
        let nftContract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let price = await nftContract.getListingPrice()
        let transaction = await nftContract.createToken(tokenURIHash, {value: price})

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

  async function handleAccountsRequest() {
    try {
      updateInfo({title: 'Connecting to your MetaMask wallet...', message: 'Please wait.'})
      await _ethAccountsRequest()  //any signer account?
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      let nftContract = new ethers.Contract(nftaddress, NFT.abi, signer)
      let bidPrice = await nftContract.getListingPrice()
      setNft({
        tokenId: 0,
        itemId: 0,
        symbol: tokenSymbol,
        image: tokenWatchAssetUrl,
        nftContract: 0,
        decimals: 0,
        bidPrice: parseInt(bidPrice) / 10**18,
        tokenUri: ''
      })
      updateInfo({title: 'Metamask wallet adapter is connected and ready to use.', message: ''})
    } catch(error) {
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
