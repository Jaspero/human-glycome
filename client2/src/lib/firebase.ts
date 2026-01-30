import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVK-OnAr3anNlpTYkXLFS_iaby24cv8II',
  authDomain: 'human-glycome.firebaseapp.com',
  databaseURL: 'https://human-glycome.firebaseio.com',
  projectId: 'human-glycome',
  storageBucket: 'human-glycome.appspot.com',
  messagingSenderId: '233608642790',
  appId: '1:233608642790:web:ffd8a2c8037cabce347b27'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
