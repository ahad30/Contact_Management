"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LogoutSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-12 space-y-10 text-center w-[500px]">
        <Image
          src="/cyber_craft.png"
          alt="CyberCraft Bangladesh"
          width={150}
          height={130}
          className="mx-auto"
        />
        <p className="text-lg text-gray-700 mt-4">
          Thank you so much for your nice contribution for today.
        </p>
        <button
          onClick={() => router.push("/Login")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go Back to Login
        </button>
      </div>
    </div>
  );
};

export default LogoutSuccess;
