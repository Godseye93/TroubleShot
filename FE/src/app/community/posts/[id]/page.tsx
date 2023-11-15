import Detail from "@components/Detail/Detail";
type PageParams = {
  id: string;
};

export default function Page({ params }: { params: PageParams }) {
  return (
    <main className="mt-4  mx-3 flex-1 ">
      <Detail id={Number(params.id)} />
    </main>
  );
}
