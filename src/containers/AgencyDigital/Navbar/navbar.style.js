import styled from 'styled-components';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .dark-red-variant {
    @media (max-width: 430px) {
      span.btn-text {
        min-width: 50px;
      }
  }

  nav {
    @media (max-width: 430px) {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  @media (max-width: 430px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export { Container };
