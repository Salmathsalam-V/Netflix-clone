import { getApp, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth,signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBU6_7x540XpRBCI9FBZjz1CI_uV78JFjM",
  authDomain: "netflix-d6a30.firebaseapp.com",
  projectId: "netflix-d6a30",
  storageBucket: "netflix-d6a30.firebasestorage.app",
  messagingSenderId: "790154190822",
  appId: "1:790154190822:web:418832f040d240fdd1c027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join());
    }
}

//Login
const login =async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join());
    }
}
const logout =()=>{
    signOut(auth);

}
export {auth,db,login,signup,logout};