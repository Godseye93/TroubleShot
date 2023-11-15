import OtherBoardList from "./OtherBoardList";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="mt-4 mx-3 flex-1">
      <OtherBoardList />
    </main>
  );
}
