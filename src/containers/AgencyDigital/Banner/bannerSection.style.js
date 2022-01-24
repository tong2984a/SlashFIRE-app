import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import BG from 'common/assets/image/agency/banner-img-slash_fire.png';

const BannerWrapper = styled.section`
  padding: 100px 0;
  background-color: rgb(24,14,40);
  background-image: url(${BG?.src});
  background-repeat: no-repeat;
  overflow: hidden;
  min-height: 100vh;

  .solana-img {
    @media (max-width: 990px) {
      transform: scale(0.8);
    }
  }

  .row {
    z-index: 1;
    .col {
      .price_wrapper {
        position: relative;
        display: inline-block;
        width: 200px;
        max-height: 50px;
        padding: 9px 0 7px 27px;
        background: #110620;
        border: 0.740318px solid #F04145;
        border-radius: 7.40318px 0 0 7.40318px;

        ::placeholder {
          font-size: 17px;
        }
        button.eth-buttton {
          max-width: 95px;
          color: #000;
          border-radius: 0 7.40318px  7.40318px 0;

          span.btn-text {
            min-width: none !important;
          }
        }
      }
      .price_wrapper input{
        font-size: 16px;
        background: transparent;
        border: none;
        width: 70%;
      }
      .price_wrapper {
        .btn-text {
          min-width: 100px;
        }
      }
      .membership_nft-info {
        font-family: 'Poppins';
        @media (min-width: 999px) {
          padding-left: 290px;
        }
        .real-price {
          margin: 25px 0;
        }
        h1 {
          color: #fff;
          font-size: 30px;
          line-height: 45px;
        }

        p {
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          line-height: 21px;
        }
        button {
          border-radius: 0 7px 7px 0;
          color: #000;

          span.btn-text {
            min-width: 55px;
          }
        }
        .action-buttons {
          button {
            font-weight: 400;
            font-size: 20px;
            line-height: 30px;
            background-color: #75272F;
            border-radius: 12px;
            color: #fff;
            width: 100%;
          }

          button:nth-child(1) {
            margin-bottom: 20px;
          }
        }
      }
      .membership_card {
        display: flex;
        position: relative;
        flex-direction: row;
        padding: 20px;
        background: rgba(196, 196, 196, 0.119);
        backdrop-filter: blur(56.24px);
        border-radius: 12px;

        .membership_img {
          margin-bottom: 43px;
        }

        .membership_img.banner_img {
          @media (max-width: 990px) {
            width: 100%;
          }
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
          border-radius: 0 0 10px 10px;
          padding: 7px 0;
          display: flex;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          padding-right: 20px;
          background: #180E27;
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
        }
      }
    }
    .placed-bids-filters {
      margin-bottom: 35px;

      .large-filter-text {
        display: none;
        @media(min-width: 990px) {
          margin-left: 350px;
          display: inline-block;
        }
      }

      .mobile-filter-text {
        display: none;
        @media (max-width: 990px) {
          display: block;
        }
      }

      .filters {
        @media(max-width: 990px) {
          flex-direction: column;
        }
      }

     .price_wrapper {
       @media (max-width: 990px) {
         margin-bottom: 20px;
         width: 100%;
       }

       input {
         color: #EA4543;
       }

       .reusecore_button.filter-btn {
         margin-left: 10px;
         border-radius: 5px;
       }

       input::placeholder {
        color: #EA4543;
       }
       color: #EA4543;
       padding-left: 17px;
       border-radius: 6px;

       ::placeholder {
         color: #EA4543;
       }

       &:nth-child(1) {
         margin-right: 15px;
       }
       &:nth-child(2) {
        margin-right: 60px;
      }
      select {
        background: transparent;
        color: #EA4543;
        border: none
      }
     }
    }
    .membership_card.membership_card_horizontal {
      position: relative;
      margin-bottom: 20px;

      @media (max-width: 990px) {
        flex-direction: column;
      }
      .membership_img {
        margin-right: 20px;
        margin-bottom: 0px;

        @media (max-width: 990px) {
          width: 100%;
        }
      }

      .membership_header {
        h2 {
          font-weight: 700;
        }

        p {
          font-weight: 400;
        }
        .closed-bidding {
          position: absolute;
          right: 20px;
        }

        .price_img-wrapper {
          img {
            margin-right: 10px;
          }
          p {
            margin-bottom: 0;
            margin-right: 30px;
          }

          .save-btn {
            border-radius: 10px;
            background: transparent;
            color: #EA4543;
            position: absolute;
            padding: 5px 70px;
            right: 20px;
            min-height: 36px;

             @media (max-width: 990px) {
               bottom: 20px;
             }
          }
        }
      }

      .membership_like {
        position: absolute;
        right: 20px;

        img {
          margin-right: 10px;
        }
        p {
          margin-bottom: 0;
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
      left: -5px;
      margin-top: 150px;

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
        border: 2px solid #FF9E00;
        background: transparent;
      }
      .yellow_circle.dark-red-variant {
        border: 2px solid #EA4543;
      }
    }
  }
  .placed-bids_wrapper {
    margin-top: 130px;
    margin-bottom: 60px;

    @media (max-width: 990px) {
      margin-bottom: 0px;
      margin-top: 50px;
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
      span.btn-text {
        min-width: none !important;
      }
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

export default BannerWrapper;
