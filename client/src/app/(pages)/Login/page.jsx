"use client";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";


const Login = () => {

  const [userLogin, { isLoading: lIsloading, error, isError: lIsError, isSuccess: lIsSuccess, data: userLoginData }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      console.log(response);
      if (response?.data?.user) {

        router.push("/Dashboard/AdminHome");
      }
      } catch (error) {
        console.error("Login failed:", error);
      }
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
                  {/* Input for userPhone */}
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
                  {/* Input for passCode */}
                  <ZInputTwo
                    required={1}
                    name="password"
                    type="password"
                    label={"Passscode"}
                    defaultKey={""}
                    placeholder={"Enter your Passscode"}
                  />
                </div>



              </div>
            </ZFormTwo>
          </div>

       

        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
