import CommonComponent from "@/components/CommonComponent";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  return (
    <main>
      <div>this page is Trouble, id is {params.id}</div>
      <CommonComponent />
    </main>
  );
}
