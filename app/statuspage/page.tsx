"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function StatusPage() {
  const [isInUse, setIsInUse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchStatus();
    }
  }, [status, router]);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/status/");
      const data = await response.json();
      setIsInUse(data.isInUse);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = !isInUse;
      const response = await fetch("/api/status/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isInUse: newStatus }),
      });
      if (response.ok) {
        setIsInUse(newStatus);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return <p className="text-lg sm:text-xl mb-6 text-center">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Is Pogoscanner in gebruik?
      </h1>
      <p className="text-lg sm:text-xl mb-6 text-center">
        Status:{" "}
        <span
          className={`font-semibold ${
            isInUse ? "text-red-500" : "text-green-500"
          }`}
        >
          {isInUse ? "Ja man wegwezen" : "Nee man doe je ding"}
        </span>
      </p>
      <div className="flex justify-center">
        <motion.button
          className={`${
            isInUse
              ? "bg-green-500 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-700"
          } text-white font-bold py-3 px-6 rounded-lg text-lg sm:text-xl`}
          onClick={toggleStatus}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isInUse ? "Vrijgeven" : "Bezet zetten"}
        </motion.button>
      </div>
      <div className="mt-8 flex justify-center">
        <Image
          src={isInUse ? "/fuck-off.webp" : "/sui.gif"}
          alt={isInUse ? "Busy" : "Free"}
          width={500}
          height={500}
          priority={true}
          unoptimized={true}
        />
      </div>
    </div>
  );
}
