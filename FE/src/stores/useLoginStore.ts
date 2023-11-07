import { logoutSubmit } from "@/api/account";
import { ResLogin } from "@/types/CommonType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const StorageKey = "storage-key";
export let user: ResLogin | null;

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
        set({ isLogged: true });
      },
      logout: async () => {
        // 로그아웃 api 요청
        const res = await logoutSubmit({
          seq: user!.member.seq,
          type: 0,
        });
        if (res.success) {
          set({ isLogged: false });
          user = null;
          window.location.href = "/";
        }
      },
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
