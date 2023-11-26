"use client";
import HydratedUserList from "./HydratedUserList";

export default function Page() {
  return (
    <main className="mt-4  mx-3 flex-1 bg-white rounded-lg shadow-md px-16 flex-col items-center ">
      <HydratedUserList />
    </main>
  );
}
