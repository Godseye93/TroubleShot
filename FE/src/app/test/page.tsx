import BobySkeleton from "@/components/Skeletons/BobySkeleton";
import CardContentLSkeleton from "@/components/Skeletons/CardContentLSkeleton";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import RsidebarSkeleton from "@/components/Skeletons/RsidebarSkeleton";
import SearchbarSkeleton from "@/components/Skeletons/SearchbarSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
export default function Page() {
  return (
    <main className="mx-3 flex-1">
      <div className="h-12"></div>
      <div className="flex justify-between">
        <SidebarSkeleton />
        <div className="flex-1">
          <SearchbarSkeleton />
          <BobySkeleton />
        </div>
        <div>
          <ProfileSkeleton />
          <RsidebarSkeleton />
        </div>
      </div>
      <div>
        <CardContentLSkeleton />
      </div>
    </main>
  );
}
