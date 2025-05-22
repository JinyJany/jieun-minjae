import { useEffect } from 'react';

const NaverMap = () => {
  useEffect(() => {
    const initMap = () => {
      const { naver } = window;
      if (!naver?.maps) return;

      new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 서울
        zoom: 10,
      });
    };

    const timer = setInterval(() => {
      if (window.naver?.maps) {
        clearInterval(timer);
        initMap();
      }
    }, 300);
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;
