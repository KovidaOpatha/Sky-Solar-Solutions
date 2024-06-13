import { SignUp } from "@clerk/clerk-react"

const SignUpPage = () => {
    return(
        <div className="min-h-screen flex items-center justify-center"> 
            <SignUp afterSignUrl={"/"} signUpUrl="/sign-in"/>
        </div>
    );
};

export default SignUpPage;