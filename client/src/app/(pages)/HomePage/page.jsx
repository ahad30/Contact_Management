"use client";

import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZEmail from "@/components/Form/ZEmail";
import Image from "next/image";
import { useAddContactMutation } from "@/redux/Feature/Admin/contact/contactApi";
import ZInputTextArea from "@/components/Form/ZInputTextArea";

const Home = () => {
  const [addContact, { isLoading: lIsloading, error, isError: lIsError, isSuccess: lIsSuccess, data: contactData }] = useAddContactMutation();

  const handleSubmit = async (data) => {
    addContact(data);
    console.log("Form Submitted", data);
    // API call for sending contact details can be added here
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(174.81deg, #C2DAFFF5 12.182%, #EFF1F02B 157.503%)",
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/Rectangle 3749.png')", // Use the correct path
          // backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1,
          width: "",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row w-full p-4 sm:p-10 gap-10">
          <div className="w-full md:w-[40%] flex flex-col justify-center p-6">
            <div className="hidden md:flex justify-start items-center mb-5">
              <Image
                src="/cyber_craft.png"
                alt="Contact Us Illustration"
                width={250}
                height={50}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Welcome back to CyberCraft Bangladesh, where your creativity thrives
            </h2>
            <ZFormTwo
              submit={handleSubmit}
              isLoading={lIsloading}
              error={error}
              isError={lIsError}
              isSuccess={lIsSuccess}
              data={contactData}
              formType={"create"}
            >
              <div className="">
                <ZInputTwo
                  required={1}
                  name="name"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your Name"
                  defaultKey={"py-2"}
                />
              </div>
              <div className="">
                <ZEmail
                  required={1}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your Email"
                  defaultKey={"py-2"}
                />
              </div>
              <div className="">
                <ZInputTextArea
                  required={1}
                  name="message"
                  type="textarea"
                  label="Message"
                  placeholder="Write your message here"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#345485] text-white px-4 py-3 rounded-md hover:bg-blue-600"
              >
                Send Message
              </button>
            </ZFormTwo>
          </div>
          <div className="w-full md:w-[60%]">
            <Image
              src="/email.png"
              alt="Contact Us Illustration"
              width={900}
              height={900}
              className="object-cover"
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;