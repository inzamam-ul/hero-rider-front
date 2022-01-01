import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDiI3-wyx5wWaVp-13RmIy5apL7NrjiqIE',
  authDomain: 'ermg-frontend.firebaseapp.com',
  projectId: 'ermg-frontend',
  storageBucket: 'ermg-frontend.appspot.com',
  messagingSenderId: '753921998593',
  appId: '1:753921998593:web:755a6f732fe426836d2500',
};
const initializeAuth = () => {
  initializeApp(firebaseConfig);
};

export default initializeAuth;
