import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Button from 'common/components/Button';
import Image from 'common/components/Image';
import Link from 'common/components/Link';
import Container from 'common/components/UI/Container';
import BannerWrapper from './bannerSection.style';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Youtube from 'common/assets/image/agencyDigital/youtube.png';
import Solana from 'common/assets/image/agencyDigital/solana.png';

import Discord from 'common/assets/image/agencyDigital/discord.png';
import Facebook from 'common/assets/image/agencyDigital/facebook.png';
import Instagram from 'common/assets/image/agencyDigital/instagram.png';
import Telegram from 'common/assets/image/agencyDigital/telegram.png';
import Twitter from 'common/assets/image/agencyDigital/twitter.png';
import Heart from 'common/assets/image/agency/heart.png';
import PriceImg from 'common/assets/image/agency/logos_ethereum.png';
import EzGif from 'common/assets/image/agency/ezgif.png';
import Coin from 'common/assets/image/Coin_FRONT_black.png'
import MembershipCard from '../MembershipCard/index';
import { ethers } from 'ethers'
import { useEffect, useState, createContext, useContext, useRef} from "react"
import { UserContext } from '../../../pages/agency'

import config from '../../../config.json'
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../../artifacts/contracts/Market.sol/NFTMarket.json'
import Auction from '../../../artifacts/contracts/Auction.sol/Auction.json'

const tokenSymbol = config['token']['symbol']
const tokenWatchImageHash = config['token']['wallet_watchAsset']['image']
const nftaddress = config['deployed']['nftaddress']
const nftmarketaddress = config['deployed']['nftmarketaddress']
const auctionAddress = config['deployed']['auctionAddress']
const envChainName = config['deployed']['envChain']['name']
const envChainId = config['deployed']['envChain']['id']

const BannerSection = ({
  row,
  col,
  col2,
  col3,
  title,
  btnStyle,
  description,
  handleAccountsRequest
}) => {
  const {infoState, nftsState, bidsState, refundState} = useContext(UserContext)
  const [info, updateInfo] = infoState
  const [nfts, setNfts] = nftsState
  const [bids, setBids] = bidsState
  const [refund, setRefund] = refundState
  const [formInput, updateFormInput] = useState({ bidPrice: '' })
  var currentNftIndex = 0

  async function handlePlaceBid() {
    updateInfo({message: ''})
    if (window.ethereum) {
      updateInfo({showModal: true, loading: true, message: "Please wait. Smart contract is processing."})
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        let auctionContract = new ethers.Contract(auctionAddress, Auction.abi, signer)
        let bidPrice = ethers.utils.parseUnits(formInput['bidPrice'].toString(), 'ether')
        let transaction = await auctionContract.bid({value: bidPrice})
        await transaction.wait()
      } catch (error) {
        if (error.data) {
          const reason = error.data.message.split('custom error')[1]
          updateInfo({showModal: false, message: `Crypto Wallet Error: ${reason.split(/(?=[A-Z])/).join(' ')}`})
        } else {
          updateInfo({showModal: false, message: `Crypto Wallet Error: ${error.message || error}`})
        }
      }
    } else {
      updateInfo({message: "Non-Ethereum browser detected. You should consider installing MetaMask."})
    }
  }

  async function handleWithdraw() {
    updateInfo({message: ''})
    if (window.ethereum) {
      updateInfo({showModal: true, loading: true, message: "Please wait. Smart contract is processing."})
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        let auctionContract = new ethers.Contract(auctionAddress, Auction.abi, signer)
        let [accounts, chainId] = await handleAccountsRequest()
        await auctionContract.withdrawPayments(accounts[0])
        updateInfo({message: 'Withdrawal completed successfully.'})
      } catch (error) {
        if (error.data) {
          updateInfo({showModal: false, message: `Crypto Wallet Error: ${error.data.message}`})
        } else {
          updateInfo({showModal: false, message: `Crypto Wallet Error: ${error.message || error}`})
        }
      }
    } else {
      updateInfo({message: "Non-Ethereum browser detected. You should consider installing MetaMask."})
    }
  }

  return (
    <BannerWrapper>
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <Box marginBottom={"142px"} paddingTop={"100px"} flexBox={true} justifyContent="center" className="heading_wrapper">
              <Heading as="h1" {...title} content="&nbsp;SlashFIRE"></Heading>
              <Heading as="h1" {...title} color="#fff" content="&nbsp;"></Heading>
              <Heading as="h1" {...title} content="NFT"></Heading>
              <Heading as="h1" {...title} content="&nbsp;GALLERY"></Heading>
            </Box>
            <aside className="social-media_group">
              <Box marginBottom="5px" width="50px" height="50px" className="yellow_circle dark-red-variant">
                <Link href="#"><Image src={Youtube?.src} alt="Youtube icon"/></Link>
              </Box>
              <Box marginBottom="5px" width="50px" height="50px" className="yellow_circle gray-border">
                <Link href="#"><Image src={Discord?.src} alt="Discord icon"/></Link>
              </Box>
              <Box marginBottom="5px" width="50px" height="50px" className="yellow_circle gray-border">
                <Link href="#"><Image src={Facebook?.src} alt="Facebook icon"/></Link>
              </Box>
              <Box marginBottom="5px" width="50px" height="50px" className="yellow_circle gray-border">
                <Link href="#"><Image src={Instagram?.src} alt="Instagram icon"/></Link>
              </Box>
              <Box marginBottom="5px" width="50px" height="50px" className="yellow_circle gray-border">
                <Link href="#"><Image src={Telegram?.src} alt="Telegram icon"/></Link>
              </Box>
              <Box width="50px" height="50px" className="yellow_circle gray-border">
                <Link href="#"><Image src={Twitter?.src} alt="Twitter icon"/></Link>
              </Box>
            </aside>
            <Text {...description}  mb="60px" content={info.title}></Text>
            <Text {...description}  mb="60px" content={info.message}></Text>
            <Container>
              <Box className="row" {...row}>
                <Box as="article" {...col3} className="col membership_card">
                <>
                {nfts.map((nft, i) => (
                <div key={i}>
                  <Image className="membership_img banner_img" src={Coin?.src} alt="membership image"/>
                  <Box className="membership_info">
                    <Box className="membership_header">
                      <Heading as="h2" content={nft.symbol}></Heading>
                      <Text content={`No. ${nft.itemId}`}></Text>
                    </Box>
                    <Box className="membership_price_header">
                      <Heading as="h2" content="Price"></Heading>
                      <Box className="price_img-wrapper" flexBox={true} alignItems="center">
                        <Image className="price-img" src={PriceImg?.src} alt="price icon"/>
                        <Text content={bids[0]?.bidPrice}></Text>
                      </Box>
                    </Box>
                  </Box>
                  <Link href="#add_like" className="membership_likes_info">
                    <Image className="heart-img" src={Heart?.src} alt="heart icon"/>
                    <Text content="45"></Text>
                  </Link>
                </div>
              ))}
              </>
                </Box>
                <Box {...col2} className="col membership_nft-info">
                  <Heading as="h1" content="Set a reserve price"></Heading>
                  <Box flexBox={true}>
                    <Box className="price_wrapper">
                      <input
                        type="text"
                        value={formInput.bidPrice}
                        onChange={e => updateFormInput({ ...formInput, bidPrice: e.target.value })}
                        placeholder='ETH' />
                    </Box>
                    <Button
                    className="eth-buttton"
                    variant="textButton"
                      title={"ETH"} {...btnStyle}
                      onClick={handleAccountsRequest}
                      icon={<img src={PriceImg?.src} alt="ethereum logo" />}
                      iconPosition={"right"}></Button>
                  </Box>
                  <Text className="real-price" content={`Highest Bid: ${bids[0]?.bidPrice} ETH`}></Text>
                  <Text content="This price will be made public. Bidders will not be able to bid below this price. Once a bid has been placed, a 24 hour auction for the place will begin."></Text>
                  <Box className="action-buttons">
                    <Button
                      className="eth-buttton"
                      variant="textButton"
                      onClick={() => handlePlaceBid()}
                      title={"Place Bid"} {...btnStyle}
                      iconPosition={"right"}></Button>
                      {refund > 0 &&
                     <Button
                      className="eth-buttton"
                      variant="textButton"
                      onClick={() => handleWithdraw()}
                      title={"Withdraw"} {...btnStyle}
                      iconPosition={"right"}></Button>}
                  </Box>
                </Box>
              </Box>
              <Box className="placed-bids_wrapper" flexBox={true} justifyContent="center">
                <Heading as="h2" {...title} content="Placed"></Heading>
                <Heading as="h2" {...title} color="#fff" content="&nbsp;Bids"></Heading>
              </Box>
                {
                  bids.map((bid, key) => {
                   return MembershipCard({bid, key})
                  })
                }
            </Container>
          </Box>
        </Box>
      </Container>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'start',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: ['100%', '100%', '100%', '100%'],
  },
  col2: {
    width: ['100%', '100%', '100%', '65%'],
  },
  col3: {
    width: ['100%', '100%', '100%', '35%'],
  },
  title: {
    fontFamily: 'Himagsikan',
    fontSize: ['26px', '34px', '42px', '52px'],
    fontWeight: '300',
    color: '#EA4543',
    letterSpacing: '-0.025em',
    mb: '0px',
    lineHeight: '62px',
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '20px',
    color: '#fff',
    lineHeight: '30px',
    mb: '0',
  },
  btnStyle: {
    border: '1px solid #F04145',
    padding: '10px 40px',
    width: '95px',
    color: '#000',
    backgroundColor: '#EA4543',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Poppins'
  },
  outlineBtnStyle: {
    minWidth: ['130px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f2137',
    p: '5px 10px',
  },
  discountAmount: {
    fontSize: '14px',
    color: '#10AC84',
    mb: 0,
    as: 'span',
    mr: '0.4em',
  },
  discountText: {
    fontSize: '14px',
    color: '#0f2137',
    mb: 0,
    as: 'span',
  },
};

export default BannerSection;
