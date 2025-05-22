import { useEffect } from 'react';
import styled from '@emotion/styled';

const MapWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledMap = styled.div`
  width: 90%;
  max-width: 700px;
  height: 360px;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const LinkButton = styled.a`
  padding: 6px 12px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ddd;
  font-size: 14px;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const AddressInfo = styled.div`
  text-align: center;
  margin: 16px 0;
`;

const AddressTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #d36b93;
  margin-bottom: 4px;
`;

const AddressText = styled.div`
  font-size: 14px;
  color: #444;
  line-height: 1.6;
`;

const InfoGroup = styled.div`
  margin-top: 24px;
  font-size: 14px;
  color: #444;
`;

const InfoRow = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const InfoIcon = styled.span`
  color: #d36b93;
  margin-right: 4px;
`;

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      if (!window.naver?.maps) return;

      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(37.3960133, 126.9645232), // ✅ 수정된 좌표
        zoom: 17,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.3960133, 126.9645232), // ✅ 수정된 좌표
        map,
      });
    };

    const interval = setInterval(() => {
      if (window.naver?.maps) {
        clearInterval(interval);
        initMap();
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AddressInfo>
        <AddressTitle>더파티움 평촌 7층</AddressTitle>
        <AddressText>
          경기도 안양시 동안구 시민대로 311 (관양동 1591) <br />
          031-381-5000
        </AddressText>
      </AddressInfo>
      <MapWrapper>
        <StyledMap id="map" />
      </MapWrapper>
      <ButtonGroup>
        <LinkButton href="https://map.naver.com/p/entry/place/38716476" target="_blank">네이버 지도</LinkButton>
        <LinkButton href="https://place.map.kakao.com/138147430" target="_blank">카카오맵</LinkButton>
      </ButtonGroup>
      <InfoGroup>
        <InfoRow>
          <InfoIcon>📍</InfoIcon>
          지하철 4호선 평촌역 2번 출구 도보 약 5분
        </InfoRow>
        <InfoRow>
          <InfoIcon>🅿️</InfoIcon>
          주차안내 건물 지하 주차장 2시간 무료
        </InfoRow>
      </InfoGroup>
    </>
  );
};

export default Map;
