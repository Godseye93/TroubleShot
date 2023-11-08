import { logoutSubmit } from "@/api/account";
import { LoginState, ResLogin } from "@/types/CommonType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const StorageKey = "storage-key";
export let user: ResLogin | undefined;

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLogged: false,
      toggleLoginStatus: (userData) => {
        if (!user) {
          user = userData;
          set((prev) => ({ isLogged: !prev.isLogged }));
        } else {
          user = undefined;
          set((prev) => ({ isLogged: !prev.isLogged }));
        }
      },
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
