import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {PUBLIC_FIREBASE_CONFIG} from '$env/static/public';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
