import { SignIn } from "@clerk/clerk-react"


const SignInPage = () => {
    return(
        <div className="min-h-screen flex items-center justify-center"> 
            <SignIn afterSignUrl={"/"} signUpUrl="/sign-up"/>
        </div>
    );
};

export default SignInPage;