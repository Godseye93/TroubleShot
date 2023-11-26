"use client";
import Detail from "@/components/Detail/Detail";
type PageParams = {
  trouble: string;
};

export default function Page({ params }: { params: PageParams }) {
  return (
    <main className="mt-4  mx-3 flex-1 bg-white">
      <Detail id={Number(params.trouble)} />
    </main>
  );
}
