// app/statuspage/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "../../components/Button";

export default function StatusPage() {
  const [isInUse, setIsInUse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/status/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsInUse(data.isInUse);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsInUse(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (isLoading) {
    return <p className="text-lg sm:text-xl mb-6 text-center">Loading...</p>;
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
        <Button isInUse={isInUse} toggleStatus={toggleStatus} />
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
