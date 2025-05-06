import { create } from 'zustand';
import {persist} from "zustand/middleware";
import {UsuarioProps} from "@/types/usuarioProps";


interface UserStore {
    user: UsuarioProps | null;
    setUser: (user: UsuarioProps | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
        }
    )
);
