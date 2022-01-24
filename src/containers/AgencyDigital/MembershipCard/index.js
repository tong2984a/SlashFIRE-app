import React from 'react';
import Box from 'common/components/Box';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import EzGif from 'common/assets/image/agency/ezgif.png';
import PriceImg from 'common/assets/image/agency/logos_ethereum.png';
import Coin from 'common/assets/image/Coin_FRONT_black.png'
import Heart from 'common/assets/image/agency/heart.png';
import Link from 'common/components/Link';

const MembershipCard = ({bid, key}) => {
    const col = {
        pr: '15px',
        pl: '15px',
        width: ['100%', '100%', '100%', '100%'],
    };
    const btnStyle = {
        border: '1px solid #F04145',
        padding: '10px 40px',
        width: '95px',
        color: '#000',
        backgroundColor: '#EA4543',
        fontSize: '16px',
        lineHeight: '24px',
        fontFamily: 'Poppins'
      };
    return (
        <Box key={key} as="article" {...col} className="col membership_card membership_card_horizontal">
            <Image width="25%" className="membership_img" display="inline-block" src={Coin?.src} alt="membership image"/>
            <Box className="membership_info">
            <Box className="membership_header">
                <Heading as="h2" content=''></Heading>
                <Text content=''></Text>
                <Box marginTop="30px" className="membership_header">
                <Heading as="h2" content=""></Heading>
                <Heading className="closed-bidding" as="h2" content=""></Heading>
                <Text content="Bid Price"></Text>
                </Box>
                <Box className="price_img-wrapper" flexBox={true} alignItems="center">
                <Image className="price-img" src={PriceImg?.src} alt="price icon"/>
                <Text marginBottom="0" content={bid.bidPrice}></Text>
                <Text marginBottom="0" content={bid.bidderShort}></Text>
                </Box>
            </Box>
            <Box className="membership_like">
                <Link href="#add_like">
                <Text content=""></Text>
                </Link>
            </Box>
            </Box>
        </Box>
    )
}
export default MembershipCard;
