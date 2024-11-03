import CommonForm from "@/components/commonForm/index";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {signupFormControls, signinFormControls} from "../../config/index"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/context/authContext";

function AuthPage(){
    const [activeTab, setActiveTab] = useState("signin");
    // -------------- useContext ----------------------
    const { signinFormData,
        setSigninFormData,
        signupFormData,
        setSignupFormData,
        handleRegisterUser,
        handleLoginUser,
        usernameMessage,
        isAvailable,
        loading} = useContext(AuthContext);
    // ----------------------------------
    
// -------------- Function to check form validation --------------
    function checkIfSigninFormValid(){
        return signinFormData && signinFormData.userEmail !== '' && signinFormData.password !== ''
    }
    function checkIfSignupFormValid(){
        return signupFormData && signupFormData.userName !== '' && signupFormData.userEmail !== '' && signupFormData.password !== ''
    }
    //---------------------------------------------------- 

    return(
        <div className="flex flex-col min-h-screen ">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b fixed w-full">
                <Link to={'/'} className="flex items-center justify-center">
                <GraduationCap className="h-8 w-8 mr-2 "/>
                <span className="font-extrabold text-xl">eLearn</span>
                </Link>
            </header>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="signin"
                className="w-full max-w-md mt-5">
                    <TabsList className="grid w-full grid-cols-2 ">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                    <Card className="p-4 space-y-2">
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>Login to your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CommonForm 
                                formControls={signinFormControls}
                                buttonText={'Sign In'}
                                formData={signinFormData}
                                setFormData={setSigninFormData}
                                isButtonDisabled={!checkIfSigninFormValid()}
                                handleSubmit={handleLoginUser}/>
                        </CardContent>
                    </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                    <Card className="p-4 space-y-2">
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>Create a new account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CommonForm 
                                formControls={signupFormControls}
                                buttonText={'Sign Up'}
                                formData={signupFormData}
                                setFormData={setSignupFormData}
                                isButtonDisabled={!checkIfSignupFormValid()}
                                handleSubmit={handleRegisterUser}/>
                                {/* Username Availability Feedback */}
                                {loading ? (
                                <p>Checking availability...</p>
                                ) : isAvailable === null ? null : isAvailable ? (
                                <p className="text-green-500 text-sm">{usernameMessage}</p>
                                ) : (
                                <p className="text-red-500 text-sm">{usernameMessage}</p>
                                )}
                        </CardContent>
                    </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
export default AuthPage;