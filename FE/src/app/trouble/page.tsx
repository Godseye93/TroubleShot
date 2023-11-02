// import Searchbar from "../../components/Searchbar/Searchbar";
import TroubleContents from "./TroubleContents";
import dynamic from "next/dynamic";

const Searchbar = dynamic(() => import("../../components/Searchbar/Searchbar"), {
  loading: () => <p>Loding...</p>,
});
export default function Page() {
  return (
    <main className="mt-4  mx-3 flex-1 ">
      <Searchbar />
      <TroubleContents />
    </main>
  );
}
