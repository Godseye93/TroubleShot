import dynamic from "next/dynamic";
import HydratedBoard from "./HydratedBoard";
const Searchbar = dynamic(() => import("../../components/Searchbar/Searchbar"), {
  loading: () => <p>Loding...</p>,
});
export default function Page() {
  return (
    <main>
      <Searchbar />
      <HydratedBoard />
    </main>
  );
}
