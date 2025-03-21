"use client";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";
import Image from "next/image";
import Cookies from "js-cookie";

const Login = () => {
  const [
    userLogin,
    {
      isLoading: lIsloading,
      error,
      isError: lIsError,
      isSuccess: lIsSuccess,
      data: userLoginData,
    },
  ] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      // console.log(response)
      if (response?.data?.user && response?.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
         Cookies.set("authToken", response?.data?.token, {
                  expires: 365,
                  path: "/",
                  secure: false,
                });
        router.push("/Dashboard/Contact");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Navigate to Sign Up Page
  const handleSignUp = () => {
    router.push("/Register");
  };

  return (
    <>
      <div
        className=""
        style={{
          background:
            "linear-gradient(174.81deg, #C2DAFFF5 12.182%, #EFF1F02B 157.503%)",
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
              Welcome back to CyberCraft Bangladesh, where your creativity
              thrives.
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
                    data={userLoginData}
                  >
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
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
                      {/* Full-width Login Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#345485] text-white px-4 py-3 rounded-md hover:bg-blue-600"
                      >
                        Login
                      </button>
                    </div>
                  </ZFormTwo>

                  <div>OR</div>

                  {/* Sign Up Button */}
                  <div className="mt-6 flex justify-center gap-1">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                      onClick={handleSignUp}
                      className="font-bold text-[#345485]"
                    >
                      Sign Up
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

export default Login;
