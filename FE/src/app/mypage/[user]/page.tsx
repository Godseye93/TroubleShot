"use client";
import { useLoginStore } from "@/stores/useLoginStore";

export default function Page() {
  const { user } = useLoginStore();

  return (
    <div className="mt-20 mb-5 flex justify-center w-full">
      <div className="flex-col w-7/12 me-4">
        <div className="bg-white rounded-lg mb-4">asd</div>
        <div className="flex justify-between h-11/12">
          <div className="w-5/12 bg-white rounded-lg">asd</div>
          <div className="w-5/12 bg-white rounded-lg">asd</div>
        </div>
      </div>
      <div className="w-4/12 bg-white rounded-lg">asd</div>
    </div>
  );
}
