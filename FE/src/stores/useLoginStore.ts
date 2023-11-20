import { LoginStore, ResLogin } from "@/types/CommonType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const StorageKey = "user-info";

export const useLoginStore = create(
  persist<LoginStore>(
    (set) => ({
      user: null,
      userLogin: (res: ResLogin) => set({ user: res }),
      userLogout: () => set({ user: null }),
      editStoreNickname: (nickname: string) => {
        set((prev) => {
          if (!prev.user) {
            return prev;
          }
          const updatedUser: ResLogin = {
            ...prev.user,
            member: {
              ...prev.user.member,
              nickname: nickname,
            },
          };
          return {
            user: updatedUser,
          };
        });
      },
      changeProfileImg: (profileImg: string) => {
        set((prev) => {
          if (!prev.user) {
            return prev;
          }
          const updatedUser: ResLogin = {
            ...prev.user,
            member: {
              ...prev.user.member,
              profileImg: profileImg,
            },
          };
          return {
            user: updatedUser,
          };
        });
      },
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
