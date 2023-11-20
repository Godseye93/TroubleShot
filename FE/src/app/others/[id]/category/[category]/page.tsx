import BoardList from "./BoardList";

export default function Page({ params }: { params: { name: string } }) {
  return (
    <main className="mt-4 mx-3 flex-1">
      <BoardList name={params.name} />
    </main>
  );
}
