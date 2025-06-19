import { useEffect } from 'react';
import styled from '@emotion/styled';

const MapWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledMap = styled.div`
  width: 100%;
  max-width: 720px;
  height: 400px;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 16px 0;
`;

const LinkButton = styled.a`
  padding: 6px 16px;
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

const LocationWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const LocationLabel = styled.div`
  font-size: 12px;
  letter-spacing: 3px;
  color: #c4bdbd;
  margin-bottom: 6px;
`;

const LocationTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #aa9292;
  margin-bottom: 16px;
`;

const PlaceName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #2F2120;
  margin-bottom: 8px;
`;

const AddressText = styled.div`
  font-size: 15px;
  color: #777;
  line-height: 1.6;
  margin-bottom: 20px;
`;


const InfoGroup = styled.div`
  margin: 32px auto 0;
  padding: 0 16px;
  max-width: 400px; // ✅ 중앙으로 좁히기
`;

const InfoSection = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 24px 0;
`;

const IconImage = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 20px;
  margin-top: 6px;
  flex-shrink: 0;
`;

const InfoDetails = styled.div`
  text-align: left;          // ✅ 문구 왼쪽 정렬
`;

const InfoTitle = styled.div`
  font-weight: bold;
  color: #888;
  margin-bottom: 4px;
  text-align: left;          // ✅ 왼쪽 정렬
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  text-align: left;          // ✅ 왼쪽 정렬
`;



const Map = () => {
  useEffect(() => {
    const initMap = () => {
      if (!window.naver?.maps) return;

      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(37.3960133, 126.9645232),
        zoom: 16,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.3960133, 126.9645232),
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
      <LocationWrapper>
      <LocationLabel>LOCATION</LocationLabel>
      <LocationTitle>오시는 길</LocationTitle>
      <PlaceName>더파티움 평촌 7층</PlaceName>
      <AddressText>
       경기 안양시 동안구 시민대로 311 금강스마트빌딩 7층 (14055) <br />
        0507-1356-2573
      </AddressText>
    </LocationWrapper>

      <MapWrapper>
        <StyledMap id="map" />
      </MapWrapper>

      <ButtonGroup>
        <LinkButton href="https://map.naver.com/p/entry/place/38716476" target="_blank">네이버 지도</LinkButton>
        <LinkButton href="https://place.map.kakao.com/138147430" target="_blank">카카오맵</LinkButton>
      </ButtonGroup>

      <InfoGroup>
        <InfoSection>
          <IconImage src="/icons/subway.png" alt="지하철 아이콘" />
          <InfoDetails>
            <InfoTitle>지하철</InfoTitle>
            <InfoText>[4호선] 평촌역 3번 출구 도보 약 5분</InfoText>
          </InfoDetails>
        </InfoSection>

        <InfoSection>
          <IconImage src="/icons/car.png" alt="자가용 아이콘" />
          <InfoDetails>
            <InfoTitle>자가용</InfoTitle>
            <InfoText>
              주차안내 건물 지하 주차장 2시간 무료<br />
              안내데스크에서 주차권 수령
            </InfoText>
          </InfoDetails>
        </InfoSection>
      </InfoGroup>

    </>
  );
};

export default Map;
