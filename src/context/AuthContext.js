import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../utils/init-firebase';
import { createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset, 
  

} from 'firebase/auth';

// import Registerpage from "../pages/Registerpage";

const AuthContext = createContext({
    currentUser: null,
    register: () => new Promise,
    login: () => new Promise,
    logout: () => new Promise,
    signInWithGoogle: () => new Promise, 
    forgotPassword: () => new Promise,
    resetPassword: () => new Promise, 
    
})

export const useAuth = () => useContext(AuthContext);


export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user =>{
            setCurrentUser(user);
        })
        return () => {
            unsubscribe()
        }
    }, [])

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
 
    function resetPassword(oobCode, newPassword){
        return confirmPasswordReset(auth, oobCode, newPassword);
    }

    function  forgotPassword(email){
    // if you do not provide the url, you will not be getting back to the local host page of the website.
        return sendPasswordResetEmail(auth, email,
             {url: 'https://localhost:3000/login'}); 
    }
    


    const value = {
        currentUser,
        register, 
        login, 
        logout, 
        signInWithGoogle, 
        forgotPassword,
        resetPassword, 
        

    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}