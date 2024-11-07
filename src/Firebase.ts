import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import toast from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyBkjf7zjNMsZw1w3s1kaA75GXDkq0_8ef8",
  authDomain: "netflix-clone-5adab.firebaseapp.com",
  projectId: "netflix-clone-5adab",
  storageBucket: "netflix-clone-5adab.firebasestorage.app",
  messagingSenderId: "1008166520196",
  appId: "1:1008166520196:web:815f3aee223ae2d26bc9d1"
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