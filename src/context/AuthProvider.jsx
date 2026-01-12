import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/firebase.init'
import { setPersistence, browserLocalPersistence } from "firebase/auth";

setPersistence(auth, browserLocalPersistence);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    //auto
    setPersistence(auth, browserLocalPersistence);

    //google sign in
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };
    //logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //update user 
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    //observer the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])
    const authInfo = {
        registerUser,
        loginUser,
        googleLogin,
        logOut,
        user,
        setUser,
        updateUserProfile
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider