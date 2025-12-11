import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.init'

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
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