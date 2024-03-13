import { toast } from 'react-toastify';

import { AxiosError, AxiosResponse } from 'axios';
import { mutate } from 'swr';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import api from '@services/api';
import { User } from 'src/@types/user';

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface StateProps {
  user: User | null;
  token: string;
  isLoading: boolean;
  signed: boolean;
}

interface ActionsProps {
  getUser(): Promise<void>;
  setToken(token: string): void;
  setSigned(signed: boolean): void;
  setIsLoading(loading: boolean): void;
  saveToken(accessToken: string): Promise<boolean>;
  setUser(user: User): void;
  logout(expired?: boolean): void;
  login({ login, password }: { login: string; password: string }): Promise<boolean>;
  init(): void;
}

type AuthProps = StateProps & ActionsProps;

const initialState: StateProps = {
  isLoading: false,
  signed: false,
  token: '',
  user: null,
};

export const useAuth = create(
  persist(
    immer<AuthProps>((set, get) => ({
      ...initialState,

      setToken: (token: string) => {
        set({ token });
      },
      setSigned: (signed: boolean) => {
        set({ signed });
      },
      setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
      setUser: (user: User) => {
        set({ user });
      },
      getUser: async () => {
        const { setIsLoading } = get();

        setIsLoading(true);

        try {
          const { data: currentUser } = await api.get<User>('current-user');

          set({
            user: currentUser,
          });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      },
      login: async ({ login, password }: { login: string; password: string }) => {
        const { saveToken, setIsLoading } = get();

        setIsLoading(true);

        try {
          const response = await api.post<LoginResponse>('login', {
            login,
            password,
          });

          const { data } = response;

          api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

          setIsLoading(false);

          return saveToken(data.accessToken);
        } catch (error) {
          if ((error as AxiosError).response?.status) {
            toast.error('Login e/ou senha incorretos!');
          } else {
            toast.error((error as AxiosError).message);
          }

          setIsLoading(false);

          return false;
        }
      },
      saveToken: async (accessToken: string) => {
        const { setIsLoading } = get();

        setIsLoading(true);

        const { data: currentUser } = await api.get<User>('current-user');

        if (currentUser) {
          set({
            user: currentUser,
            token: accessToken,
            signed: true,
          });
        } else {
          toast.error('Sessão expirada!');
        }

        setIsLoading(false);

        return true;
      },
      logout: (expired) => {
        const { signed } = get();

        if (expired && signed) {
          toast.error('Sessão expirada!');
        }

        if (signed) {
          set({ signed: false, token: '', user: null });

          mutate(() => true, undefined, false);
        }
      },

      init: () => {
        const { token, setSigned, getUser, logout, setIsLoading } = get();

        if (token) {
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
          setIsLoading(false);
        }

        setSigned(!!token);

        api.interceptors.response.use(
          (response: AxiosResponse) => response,
          (error) => {
            if (
              (error?.response?.status === 401 || error?.response?.status === 403) &&
              !error?.response?.config?.url?.includes('login')
            ) {
              logout(true);

              return Promise.reject(error);
            }

            return Promise.reject(error);
          },
        );

        if (token) getUser();
      },
    })),
    {
      name: 'auth',
      partialize: (state) => ({
        ...state,
        ...initialState,
        token: state?.token,
      }),
    },
  ),
);

useAuth.getState().init();
