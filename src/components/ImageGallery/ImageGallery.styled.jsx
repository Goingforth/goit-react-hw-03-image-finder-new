import styled from '@emotion/styled';
export const GalLery = styled.ul`
  display: grid;
  max-width: calc((100vw - 48px));
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  // display: flex;

  // flex-basis: calc((100vw - 48px) / 4);
  //width: calc((100vw - 48px) / 4);
  gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
