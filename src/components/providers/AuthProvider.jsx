import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const axiosPublic = useAxiosPublic()


  const signupUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  // google login
  const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }

  //update profile
  const updateUserProfile = (username , url)=>{
    return updateProfile(auth.currentUser, {
        displayName: username, photoURL: url
      })
  }
  //sign out
  const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curretUser) => {
      setUser(curretUser);
      if(curretUser){
        //get token and store client side
        const userInfo = {email:curretUser.email}
        axiosPublic.post('/jwt',userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
            setLoading(false);
          }
        })
      }else{
        // TOdo: Remove token (if token stored in client side: local strorage,caching, in memory)
        localStorage.removeItem('access-token')
        setLoading(false);

      }
    
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    signupUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    logOut
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
