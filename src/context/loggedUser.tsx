import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../config/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  loggedIn: boolean | null;
  setLoggedIn: (value: boolean) => void;
  loading: boolean;
  user: UserInfos | null | undefined;
};
export type UserInfos = {
  avatar_url: string | null;
  name: string;
  created_at: string;
  updated_at: string;
};
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserInfos | null>();

  useEffect(() => {
    setLoading(true)
    const getSessionStorage = async () => {
      try {
        const sessionString = await AsyncStorage.getItem("@session");
        const session = sessionString ? JSON.parse(sessionString) : null;

        if (session) {
          setLoggedIn(true);
          await getUserData(session.user.id);  
        } else {
          setLoggedIn(false);
        }
      } finally {
        setLoading(false);
      }
    };

    getSessionStorage();

    const {data: listener} = supabase.auth.onAuthStateChange(async (event, session) => {
      
      if(session) {
        await AsyncStorage.setItem('@session', JSON.stringify(session))
      } else {
        await AsyncStorage.removeItem('@session')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, []);

  const getUserData = async (userId: string | undefined) => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single()

    if (error) {
      console.log("ERROR GET USER DATA");
      throw error;
    }
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
