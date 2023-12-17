import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  padding:70px;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  @media (max-width: 995px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 685px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
