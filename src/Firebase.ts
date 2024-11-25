import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import toast from 'react-hot-toast';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signUp = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
        toast.error('Please fill all the feilds')
        return;
    }
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (error) {
        if(typeof error === "object" && error !== null && "code" in error){
            console.log(error);
            toast.error((error as any).code.split('/')[1].split('-').join(' '))
        }
    }
};

const login = async (email: string, password: string) => {
    if (!email || !password) {
        toast.error('Please enter credentials')
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if(typeof error === "object" && error !== null && "code" in error){
            console.log(error);
            toast.error((error as any).code.split('/')[1].split('-').join(' '))
        }
    }
};

const logout = async () => {
    try {
        signOut(auth);
    } catch (error) {
        console.log(error);
    }
};

export { auth, db, login, signUp, logout };