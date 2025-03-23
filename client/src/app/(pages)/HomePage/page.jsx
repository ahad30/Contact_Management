"use client";

import { useState } from "react";
import Head from "next/head";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZEmail from "@/components/Form/ZEmail";
import Image from "next/image";
import { useAddContactMutation } from "@/redux/Feature/Admin/contact/contactApi";
import ZInputTextArea from "@/components/Form/ZInputTextArea";

const Home = () => {
  const [addContact, { isLoading: lIsloading, error, isError: lIsError, isSuccess: lIsSuccess, data: contactData }] = useAddContactMutation();
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (data) => {
    addContact(data);
    console.log("Form Submitted", data);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  const handleShareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}&text=Check out this Contact Us page!`,
      "_blank"
    );
  };

  const handleShareViaEmail = () => {
    window.location.href = `mailto:?subject=Contact Us - CyberCraft Bangladesh&body=Check out this page: ${window.location.href}`;
  };

  return (
    <>
      <Head>

        {/* Page Title */}
        <title>Contact Us - CyberCraft Bangladesh</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Get in touch with CyberCraft Bangladesh for creative solutions. Reach out to us for any inquiries or collaborations."
        />
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us - CyberCraft Bangladesh",
            "description": "Get in touch with CyberCraft Bangladesh for creative solutions.",
            "url": "https://contacts-opal-iota.vercel.app",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+123-456-7890",
              "contactType": "customer service",
            },
          })}
        </script>

        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Us - CyberCraft Bangladesh" />
        <meta property="og:description" content="Get in touch with CyberCraft Bangladesh for creative solutions." />
        <meta property="og:image" content="https://contacts-opal-iota.vercel.app/email.png" />
        <meta property="og:url" content="https://contacts-opal-iota.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - CyberCraft Bangladesh" />
        <meta name="twitter:description" content="Get in touch with CyberCraft Bangladesh for creative solutions." />
        <meta name="twitter:image" content="https://contacts-opal-iota.vercel.app/email.png" />
      </Head>

      <div className=" relative" style={{ background: "linear-gradient(174.81deg, #C2DAFFF5 12.182%, #EFF1F02B 157.503%)" }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/Rectangle 3749.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 1 }} />

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row w-full  sm:px-10 gap-10">
            <div className="w-full md:w-[40%] flex flex-col justify-center p-6">
              <div className="hidden md:flex justify-start items-center mb-5">
                <Image src="/cyber_craft.png" alt="Contact Us Illustration" width={250} height={50}  className="object-fill"/>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Welcome back to CyberCraft Bangladesh, where your creativity thrives
              </h2>
              <ZFormTwo submit={handleSubmit} isLoading={lIsloading} error={error} isError={lIsError} isSuccess={lIsSuccess} data={contactData} formType={"create"}>
                <div className="">
                  <ZInputTwo required={1} name="name" type="text" label="Full Name" placeholder="Enter your Name" defaultKey={"py-2"} />
                </div>
                <div className="">
                  <ZEmail required={1} name="email" type="email" label="Email" placeholder="Enter your Email" defaultKey={"py-2"} />
                </div>
                <div className="">
                  <ZInputTextArea required={1} name="message" type="textarea" label="Message" placeholder="Write your message here" />
                </div>
                <button type="submit" className="w-full bg-[#345485] text-white px-4 py-3 rounded-md hover:bg-blue-600">
                  Send Message
                </button>
              </ZFormTwo>
            </div>
            <div className="w-full md:w-[60%]">
              <Image src="/email.png" alt="Contact Us Illustration" width={900} height={900} className="object-cover" />
            </div>
          </div>
        </div>

        {/* Social Sharing Buttons */}
        <div className="fixed  z-10 bottom-10 right-10 flex flex-col space-y-2">
          <button onClick={handleShareOnFacebook} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Share on Facebook
          </button>
          <button onClick={handleShareOnTwitter} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
            Share on Twitter
          </button>
          <button onClick={handleShareViaEmail} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Share via Email
          </button>
          <button onClick={handleCopyLink} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            {isCopied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;