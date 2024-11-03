import { Skeleton } from "@/components/ui/skeleton";
import { registerService, checkUsernameAvailability, loginService, checkAuthService } from "@/service";
import { validateUsername } from "@/utils/validateUsername";
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
    const [checkUsernameLoading, setCheckUsernameLoading] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState(null);
    const [loading, setLoading] = useState(true)
//------------------------------------
    //check userName avialibility when userName changes in real time     
    useEffect(()=>{
        const checkUsername = async () =>{
            //Run Validation
            const {isValid, message} = validateUsername(signupFormData.userName);
            //check if username fails validation regex
            if(!isValid){
                setUsernameMessage(message);
                setIsAvailable(false);
                return
            } else {
                setUsernameMessage(null);
            }

            if(signupFormData.userName.length > 0){
                setCheckUsernameLoading(true);
                try {
                    const data = await checkUsernameAvailability(signupFormData.userName)
                    setIsAvailable(data.available);
                    setUsernameMessage(data.message);
                } catch (error) {
                    console.log('Error checking username', error);
                } finally {
                    setCheckUsernameLoading(false);
                }
            }
        }
        const debounceCheck = setTimeout(checkUsername, 1000);
        return ()=> clearTimeout(debounceCheck);
    },[signupFormData.userName]);

//--------------------------------------
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
        try {
            const data = await checkAuthService();
        if(data.success){
            setAuth({
                authenticate: true,
                user: data.data.user
            })
            setLoading(false);
        }else{
            setAuth({
                authenticate: false,
                user: null
            })
            setLoading(false);
        }
        } catch (error) {
            if(!error?.response?.data.success){
                setAuth({
                    authenticate: false,
                    user: null
                })
                setLoading(false);   
            }
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
            auth,
            usernameMessage,
            isAvailable,
            checkUsernameLoading}}>{
                loading? <Skeleton/> : children
            }</AuthContext.Provider>
    )
}
export default AuthProvider;