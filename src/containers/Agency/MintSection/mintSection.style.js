import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import BG from 'common/assets/image/agency/banner-img-slash_fire.png';

const MintWrapper = styled.section`
  padding: 100px 0;
  background-color: rgb(24,14,40);
  background-image: url(${BG?.src});
  background-repeat: no-repeat;
  background-size: 100% auto;
  overflow: hidden;
  min-height: 100vh;

  .row {
    z-index: 1;
    .col {
      .contact-address_wrapper {
        position: relative;
        display: inline-block;
        width: 90%;
        padding: 19px 0 17px 27px;
        background: #110620;
        border: 1px solid #EA4543;
        border-radius: 10px 0px 0px 10px;

        button {
          span {
            min-width: 120px;
          }
        }
      }
      .contact-address_wrapper input{
        background: transparent;
        border: none;
        width: 100%;
      }
      .contact-address_wrapper {
        .btn-text {
          min-width: 100px;
        }
      }
      .membership_nft-info {
        font-family: 'Poppins';
        @media (min-width: 1024px) {
          padding-left: 120px;
        }
        @media screen
          and (max-device-width: 700px) {
          .div-mobile {    display: block;  }
          .div-desktop {    display: none;  }
        }
        @media screen
          and (min-device-width: 701px) {
          .div-mobile {    display: none;  }
          .div-desktop {    display: block;  }
        }
        h1 {
          color: #fff;
          font-size: 30px;
          line-height: 45px;
        }

        p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 20px;
          line-height: 36px;
        }
        button {
          padding: 10px 70px;
          border-radius: 18px;
          color: #fff;
        }
      }
      .membership_card {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background: rgba(196, 196, 196, 0.119);
        backdrop-filter: blur(56.24px);
        border-radius: 12px;

        @media screen
          and (max-device-width: 700px) {
          .div-mobile {    display: block;  }
          .div-desktop {    display: none;  }
        }
        @media screen
          and (min-device-width: 701px) {
          .div-mobile {    display: none;  }
          .div-desktop {    display: block;  }
        }
        .container {
          height: 120px;
          position: relative;
          //border: 3px solid green;
        }
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          //border: 3px solid green;
        }
        .buy_btn {
          padding: 10px 70px;
          border-radius: 18px;
          color: #fff;
          font-size: 20px;
        }

        .membership_img {
          margin-bottom: 43px;
        }

        .membership_info {
          display: flex;
          margin-bottom: 60px;

          h2, p {
            color: #fff;
            font-family: 'Poppins';
          }

          h2 {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
          }

          p {
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
          }

          .membership_price_header {
            margin: 0 0 0 auto;

            .price_img-wrapper {
              img {
                margin-right: 15px;
              }
              p {
                margin-bottom: 0;
              }
            }
          }
        }
        .membership_likes_info {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: flex-end;

          img {
            display: inline-block;
            margin-right: 18px;
          }
          p {
            margin-bottom: 0;
            font-family: 'Poppins';
            font-size: 12px;
            color: #fff;
            line-height: 18px;
          }
          .membership_buy_btn {
            display: flex;
            position: relative;
            align-items: right;
            justify-content: flex-end;

            img {
              display: inline-block;
              margin-right: 18px;
            }
            p {
              margin-bottom: 0;
              font-family: 'Poppins';
              font-size: 12px;
              color: #fff;
              line-height: 18px;
            }
        }
      }
    }
    .yellow_circle {
      margin-left: 25px;
      background: #FF922D 26.1%;
      border-radius: 50%;
    }
    .social-media_group {
      position: absolute;
      left: 15px;
      margin-top: -50px;

      @media (max-width: 996px) {
        position: relative;
        display: flex;
        margin-top: 20px;
        justify-content: center;
        width: 100%;
        margin: 20px 0;
      }

      .yellow_circle.gray-border {
        border: 2px solid rgba(255, 207, 0, 0.05);
      }

      .yellow_circle  {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #EA4543;
        background: transparent;
      }
    }
  }
  .slash_fire-brief {
    color: #fff;
    margin-top: 90px;
    font-family: 'Poppins';

    h2 {
      font-size: 30px;
      line-height: 45px;
    }
    p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 20px;
      line-height: 36px;
    }
  }
  .button__wrapper {
    margin-top: 40px;
    .reusecore__button {
      &:first-child {
        transition: all 0.3s ease;
        &:hover {
          box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
        }
      }
    }
  }
`;

const DiscountLabel = styled.div`
  display: inline-block;
  border-radius: 4em;
  padding: 7px 25px;
  box-shadow: 0px 4px 50px 0px rgba(22, 53, 76, 0.08);
  margin-bottom: 30px;
  background-color: ${themeGet('colors.white', '#ffffff')};
  @media (max-width: 767px) {
    padding: 7px 10px;
  }
`;

export { DiscountLabel };

export default MintWrapper;
