// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAHgkK6JFhvkMpZALaAagHyANj6Uyfu5OI",
  authDomain: "wedding-guestbook-24c31.firebaseapp.com",
  databaseURL: "https://wedding-guestbook-24c31-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ 이 줄 추가!
  projectId: "wedding-guestbook-24c31",
  storageBucket: "wedding-guestbook-24c31.firebasestorage.app",
  messagingSenderId: "390031327980",
  appId: "1:390031327980:web:c8a19140e8659f3f6edbc9"
};


const firebaseApp = initializeApp(firebaseConfig);
const realtimeDb = getDatabase(firebaseApp);

export { firebaseApp, realtimeDb }; // ✅ named export
