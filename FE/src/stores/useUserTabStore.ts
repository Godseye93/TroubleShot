import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const StorageKey = "user-info";
// export let user: ResLogin | undefined;
interface UserTab {
  nickname: string | null;
  setTabUser: ({ nickname, seq }: { nickname: string; seq: number }) => void;
  seq: number | null;
  setDelTabUser: () => void;
}

export const useUserTabStore = create(
  persist<UserTab>(
    (set) => ({
      nickname: null,
      seq: null,
      setTabUser: ({ nickname, seq }: { nickname: string; seq: number }) => set({ nickname: nickname, seq: seq }),
      setDelTabUser: () => set({ seq: null, nickname: null }),
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
