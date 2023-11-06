import { logoutSubmit } from "@/api/account";
import { ResLogin } from "@/types/CommonType";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useRouter } from "next/navigation";

const StorageKey = "storage-key";
let user: ResLogin | null;

type LoginState = {
  isLogged: boolean;
  login: (params: ResLogin) => void;
  logout: () => void;
};

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLogged: false,
      login: (params: ResLogin) => {
        user = params; // api 응답 useLoginStore 안에 저장
        console.log(user);
        set({ isLogged: true });
      },
      logout: async () => {
        // 로그아웃 api 요청
        const router = useRouter();
        const res = await logoutSubmit({
          seq: user!.member.seq,
          type: 0,
        });
        if (res.success) {
          toast.success("로그아웃 되었습니다.");
          set({ isLogged: false });
          user = null;
          router.push("/");
        }
      },
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
