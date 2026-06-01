import { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: SavedAddress[];
}

export interface SavedAddress {
  id: string;
  label: string;
  street: string;
  area: string;
  landmark?: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* Mock user for demo purposes */
const MOCK_USER: UserProfile = {
  id: "usr-001",
  name: "Aisha Musa",
  email: "aisha@example.com",
  phone: "08012345678",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      street: "14 Yakubu Gowon Way",
      area: "Kaduna North",
      landmark: "Near Total Filling Station",
    },
    {
      id: "addr-2",
      label: "Office",
      street: "7 Independence Way",
      area: "City Centre",
      landmark: "Opposite NEPA office",
    },
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    /* In production, call Supabase auth here */
    await new Promise((r) => setTimeout(r, 800));
    if (email === MOCK_USER.email || email === "demo@feliciafoods.ng") {
      setUser(MOCK_USER);
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      addresses: [],
    });
    return true;
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
