// src/types/naver.d.ts
declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          elementId: string | HTMLElement,
          options: {
            center: { lat: number; lng: number };
            zoom: number;
          }
        ) => void;
        LatLng: new (lat: number, lng: number) => { lat: number; lng: number };
      };
    };
  }
}
