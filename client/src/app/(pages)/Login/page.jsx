"use client";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";
import { useEffect } from "react";

const Login = () => {
  const [userLogin, { isLoading: lIsloading, error, isError: lIsError, isSuccess: lIsSuccess, data: userLoginData }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      console.log(response);
      if (response?.data?.user && response?.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        router.push("/Dashboard/AdminHome");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  // Google Login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  // Facebook Login
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/auth/facebook";
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-5">
        <div className="relative sm:w-[40%] sm:mx-auto">
          <div className="relative px-4 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto text-center">
              <ZFormTwo
                isLoading={lIsloading}
                error={error}
                isError={lIsError}
                isSuccess={lIsSuccess}
                submit={handleSubmit}
                data={userLoginData}
                buttonName={"Login"}
              >
                <div>
                  <h1 className="text-2xl mt-2 text-center">Admin Login Here</h1>
                </div>
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative mb-8">
                    {/* Input for email */}
                    <ZEmail
                      name="email"
                      type="text"
                      label={"Email"}
                      defaultKey={""}
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
                      defaultKey={""}
                      placeholder={"Enter your Password"}
                    />
                  </div>
                </div>
              </ZFormTwo>

              {/* OAuth Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={handleFacebookLogin}
                  className="w-full flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign in with Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
