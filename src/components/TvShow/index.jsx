import React from "react";
import styled from "styled-components";

const TvShowContainer = styled.div`
  width: 100%;
  min-height: 6rem;
  display: flex;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
`;

const Thumbnail = styled.img`
  width: auto;
  height: 100%;
  /* display: flex; */
  /* flex: 1; */

  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 16px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Rating = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 1;
`;

const TvShow = (props) => {
  const { thumbnailSrc, name, rating } = props;

  return (
    <TvShowContainer>
      <Thumbnail src={thumbnailSrc} />
      <Name>{name}</Name>
      {<Rating>{rating || "N / A"}</Rating>}
    </TvShowContainer>
  );
};

export default TvShow;
