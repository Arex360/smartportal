import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getDatabase} from 'firebase/database'
import firebaseConfig from "./config";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const RDb = getDatabase(app)
const storage = getStorage(app);

export { auth, db, storage,RDb };