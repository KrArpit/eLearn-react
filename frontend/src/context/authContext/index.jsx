import { registerService, checkUsernameAvailability, loginService, checkAuthService } from "@/service";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children})=>{
    const [signinFormData, setSigninFormData] = useState({
        userEmail: '',
        password: ''
    });
    const [signupFormData, setSignupFormData] = useState({
        userName:'',
        userEmail: '',
        password: ''
    });
    
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    });
    const [isAvailable, setIsAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    //check userName avialibility when userName changes
    useEffect(()=>{
        const checkUsername = async () =>{
            if(signupFormData.userName.length > 0){
                setLoading(true);
                try {
                    const data = await checkUsernameAvailability(signupFormData.userName)
                    setIsAvailable(data.available);
                } catch (error) {
                    console.log('Error checking username', error);
                } finally {
                    setLoading(false);
                }
            }
        }
        const debounceCheck = setTimeout(checkUsername, 500);
        return ()=> clearTimeout(debounceCheck);
    },[signupFormData.userName]);


    async function handleRegisterUser(event) {
        event.preventDefault();
        const data = await registerService(signupFormData);
    }
    
    async function handleLoginUser(event) {
        event.preventDefault();
        const data = await loginService(signinFormData);

        if(data.success){
            sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken))
            setAuth({
                authenticate: true,
                user: data.data.user
            })
        } else{
            setAuth({
                authenticate: false,
                user: null
            })
        }
    }
    //Check auth users
     async function checkAuthUser() {
        const data = await checkAuthService();
        if(data.success){
            setAuth({
                authenticate: true,
                user: data.data.user
            })
        }else{
            setAuth({
                authenticate: false,
                user: null
            })
        }
    }
    useEffect(()=>{
        checkAuthUser()
    },[])

    return(
        <AuthContext.Provider value={{
            signinFormData, 
            setSigninFormData, 
            signupFormData, 
            setSignupFormData,
            handleRegisterUser,
            handleLoginUser,
            isAvailable,
            loading}}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider;