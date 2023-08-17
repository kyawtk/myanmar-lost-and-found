"use client";
import Spinner from "@/components/Spinner";

const loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center space-x-2">
        <Spinner></Spinner>
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default loading;
