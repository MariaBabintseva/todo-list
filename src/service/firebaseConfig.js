import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA-V26jUJ8EIuX4rf7p_IXy_GE8YD27Q3U",
    authDomain: "todo-list-cfbaa.firebaseapp.com",
    projectId: "todo-list-cfbaa",
    storageBucket: "todo-list-cfbaa.appspot.com",
    messagingSenderId: "170770740995",
    appId: "1:170770740995:web:da26788d36f955284b9b36"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
