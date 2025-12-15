import { create } from "zustand";
import {User} from '@supabase/supabase-js';

interface IUsername {
  name: string,
  email: string,
  password: string,
  loading: boolean,
  setName: (value: string) => void,
  setEmail: (value: string) => void,
  setPassword: (value: string) => void,
  resetForm: () => void,
  user: User | null,
  setAuth: (authUser: User | null) => void
}

export const useForm = create<IUsername>((set) => ({
  name: "",
  email: "",
  password: "",
  loading: false,
  
  user: null,
  setAuth: (authUser) => {
    set({user: authUser})
  },

  setName: (value) => set({ name: value }),
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),

  resetForm: () => set({ name: "", email: "", password: "" }),
}));