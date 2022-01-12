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
  @media (min-width: 320px) {
    padding-left: 25px;
    padding-right: 23px;
  }
`;

export { Container };
