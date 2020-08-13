import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

export const Styled = {
  Div: styled.div`
    && {
      position: relative;
      border: 1px solid #ddd;
      width: 700px;
      float: left;
      margin-left: 80px;
      margin-right: 1em;
      margin-bottom: 1em;
      padding-top: 3px;
      padding-bottom: 3px;
      font-family:
        Lato, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica, Arial, sans-serif;
      font-size: 18px;
      line-height: 1.4;
    }
  `,

  AboutListingText: styled.span`
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 25px;
    color: #414141;
  `
};

class Description extends React.Component {
  render() {
    return(
      <Styled.Div>
        <Styled.AboutListingText>
          About This Listing
        </Styled.AboutListingText>
      </Styled.Div>
    );
  }
};

export default Description;