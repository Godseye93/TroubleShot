import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import RsidebarSkeleton from "@/components/Skeletons/RsidebarSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
export default function Page() {
  return (
    <main className="mx-3 flex-1">
      <div className="h-12"></div>
      <div className="flex justify-between">
        <SidebarSkeleton />
        <div>
          <ProfileSkeleton />
          <RsidebarSkeleton />
        </div>
      </div>
    </main>
  );
}
