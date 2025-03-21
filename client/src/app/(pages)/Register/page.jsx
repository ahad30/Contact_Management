"use client";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import {  useRegisterMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";
import Image from "next/image";

const Register = () => {
 const router = useRouter();
  const [userRegister, { isLoading: lIsloading, error, isError: lIsError, isSuccess: lIsSuccess, data: userRegisterData }] = useRegisterMutation();

  const handleSubmit = async (data) => {
    try {
      const response = await userRegister(data);
      if (response?.data) {
        router.push("/Login");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

    // Google Login
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
      };
    
      // Facebook Login
      const handleFacebookLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/facebook`;
      };


  // Navigate to Sign in Page
  const handleSignIn = () => {
    router.push("/Login");
  };

  return (
    <>
      <div
        className=""
        style={{
          background: "linear-gradient(174.81deg, #C2DAFFF5 12.182%, #EFF1F02B 157.503%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex min-h-screen ">

      
        {/* Left Side: Welcome Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-8">
          <Image
            src="/cyber_craft.png"
            alt="CyberCraft Bangladesh"
            width={300}
            height={130}

          />
          <p className="text-lg text-center text-[#353535] mt-5">
            Welcome back to CyberCraft Bangladesh, where your creativity thrives.
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center sm:py-5">
          <div className="relative sm:w-[100%] sm:mx-auto">
            <div className="relative px-4  md:m-0 m-2 sm:p-20">
              <div className="max-w-md mx-auto text-center">
                <ZFormTwo
                  isLoading={lIsloading}
                  error={error}
                  isError={lIsError}
                  isSuccess={lIsSuccess}
                  submit={handleSubmit}
                  data={userRegisterData}
                >
                 
                  <div className="py-8 text-base  text-gray-700 sm:text-lg ">
                  <div className="relative">
                      {/* Input for password */}
                      <ZInputTwo
                        required={1}
                        name="name"
                        type="text"
                        label={"Full Name"}
                        defaultKey={"py-3"}
                        placeholder={"Enter your Name"}
                      />
                    </div>
                    <div className="relative mb-8">
                      {/* Input for email */}
                      <ZEmail
                        name="email"
                        type="text"
                        label={"Email"}
                        defaultKey={"py-3"}
                        placeholder={"Enter your Email"}
                        required={1}
                      />
                    </div>
                    <div className="relative">
                      {/* Input for password */}
                      <ZInputTwo
                        required={1}
                        name="password"
                        type="password"
                        label={"Password"}
                        defaultKey={"py-3"}
                        placeholder={"Enter your Password"}
                      />
                    </div>
                    <div className="relative">
                      {/* Input for Confirm password */}
                      <ZInputTwo
                        required={1}
                        name="confirmPassword"
                        type="password"
                        label={"Confirm password"}
                        defaultKey={"py-3"}
                        placeholder={"Enter your Confirm Password"}
                      />
                    </div>
                    {/* Full-width Login Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#345485] text-white px-4 py-3 rounded-md hover:bg-blue-600"
                    >
                      Create Account
                    </button>
                  </div>
                </ZFormTwo>

               <div>
                OR
               </div>

               
              {/* OAuth Buttons */}
              <div className="flex mt-6 flex-row gap-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Sign up with Google
                </button>
                <button
                  onClick={handleFacebookLogin}
                  className="w-full flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign up with Facebook
                </button>
              </div>

                {/* Sign Up Button */}
                <div className="mt-6 flex justify-center gap-1">
                  <p className="text-gray-600">Already have an account?</p>
                  <button
                    onClick={handleSignIn}
                    className="font-bold text-[#345485]"
                  >
                    Sign in
                  </button>
                </div>
              </div>    
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Register;