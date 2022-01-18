import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Button from 'common/components/Button';
import Image from 'common/components/Image';
import Link from 'common/components/Link';
import GlideCarousel from 'common/components/GlideCarousel';
import Container from 'common/components/UI/Container';
import BannerWrapper from './bannerSection.style';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Youtube from 'common/assets/image/agency/youtube.png';
import Discord from 'common/assets/image/agency/discord.png';
import Facebook from 'common/assets/image/agency/facebook.png';
import Instagram from 'common/assets/image/agency/instagram.png';
import Telegram from 'common/assets/image/agency/telegram.png';
import Twitter from 'common/assets/image/agency/twitter.png';
import Heart from 'common/assets/image/agency/heart.png';
import PriceImg from 'common/assets/image/agency/logos_ethereum.png';
import EzGif from 'common/assets/image/agency/ezgif.png';

import { useEffect, useState, createContext, useContext, useRef} from "react"
import { UserContext } from '../../../pages/index'

const BannerSection = ({
  row,
  col,
  col2,
  col3,
  title,
  btnStyle,
  description,
  handleAccountsRequest,
  handleMint
}) => {
  const {contractsState, messageState, nftsState, addressState} = useContext(UserContext)
  const [message, updateMessage] = messageState
  const [nfts, setNfts] = nftsState
  const [address, setAddress] = addressState
  var currentNftIndex = 0

  function handleRun(index) {
    currentNftIndex = index
  }

  return (
    <BannerWrapper>
      <Container fullWidth={true}>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <Box marginBottom={"42px"} paddingTop={"150px"} flexBox={true} justifyContent="center" className="heading_wrapper">
              <Heading as="h1" {...title} content="Welcome"></Heading>
              <Heading as="h1" {...title} color="#fff" content="&nbsp;to"></Heading>
              <Heading as="h1" {...title} content="&nbsp;SlashFIRE"></Heading>
            </Box>
            <Text {...description} mb="120px" content={"Join us to make the biggest gaming guild in the world!"}></Text>
            <Box width={"75%"} marginRight={"auto"} marginLeft={"auto"} marginBottom={"48px"} flexBox={true}>
              <Box className="contact-address_wrapper">
                <input type="text" placeholder={address}/>
              </Box>
              <Button variant="textButton" onClick={handleAccountsRequest}
               title={"Your Address"} {...btnStyle}></Button>
            </Box>
            <aside className="social-media_group">
              <Box marginBottom="5px" width="50px" height="50px" className="yellow_circle">
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
            <Text {...description}  mb="60px" content={message.title}></Text>
            <Text {...description}  mb="60px" content={message.content}></Text>
            <Box marginRight="auto" marginLeft="auto" width={"80%"}>
              <Box className="row" {...row}>
                <Box as="article" {...col3} className="col membership_card">
                  <GlideCarousel
                    handleRun={handleRun}
                    nextButton={
                      <Button
                        icon={<i className="flaticon-next" />}
                        aria-label="Next"
                        variant="textButton"
                        {...BannerSection.defaultProps.glideBtnStyle}
                      />
                    }
                    prevButton={
                      <Button
                        icon={<i className="flaticon-left-arrow" />}
                        aria-label="Prev"
                        variant="textButton"
                        {...BannerSection.defaultProps.glideBtnStyle}
                      />
                    }>
                  <>
                  {nfts.map((nft, i) => (
                    <div key={i}>
                      <Image className="membership_img" src={EzGif?.src} alt="membership image"/>
                      <Box className="membership_info">
                        <Box className="membership_header">
                          <Heading as="h2" content={nft.symbol}></Heading>
                          <Text content={`No. ${nft.itemId}`}></Text>
                        </Box>
                        <Box className="membership_price_header">
                          <Heading as="h2" content="Price"></Heading>
                          <Box className="price_img-wrapper" flexBox={true} alignItems="center">
                            <Image className="price-img" src={PriceImg?.src} alt="price icon"/>
                            <Text content={nft.bidPrice.toString()}></Text>
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
                  </GlideCarousel>
                </Box>
                <Box {...col2} className="col membership_nft-info">
                  <Heading as="h1" content="Membership NFT"></Heading>
                  <Text content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem "></Text>
                  <Button title="Buy Now" {...btnStyle} onClick={() => handleMint(nfts[currentNftIndex])}>Buy Now</Button>
                </Box>
                <Box className="slash_fire-brief">
                 <Heading content="What’s SlashFIRE?" as="h2"></Heading>
                 <Text content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem"></Text>
                </Box>
              </Box>
            </Box>
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
  // next / prev btn style
  glideBtnStyle: {
    minWidth: 'auto',
    minHeight: 'auto',
    mr: '13px',
    fontSize: '16px',
    color: '#EA4543',
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: ['100%', '100%', '100%', '100%'],
  },
  col2: {
    width: ['100%', '100%', '100%', '55%'],
  },
  col3: {
    width: ['100%', '100%', '100%', '45%'],
  },
  title: {
    fontFamily: 'Abril Fatface',
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
    borderRadius: '0 10px 10px 0px',
    border: '1px solid #EA4543',
    padding: '10px 60px',
    widht: '222px',
    color: '#000',
    backgroundColor: '#EA4543',
//    backgroundColor: '#EA4543',
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
