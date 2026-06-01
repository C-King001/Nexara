import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Role = "student" | "teacher" | "admin" | null;

interface AuthUser {
  name: string;
  email: string;
  role: Role;
  avatar: string;
  department?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, AuthUser & { password: string }> = {
  "student@ijmb.ng": {
    name: "Aisha Mohammed",
    email: "student@ijmb.ng",
    password: "student123",
    role: "student",
    avatar: "AM",
    department: "Sciences",
  },
  "teacher@ijmb.ng": {
    name: "Dr. Adeyemi Femi",
    email: "teacher@ijmb.ng",
    password: "teacher123",
    role: "teacher",
    avatar: "AF",
    department: "Sciences",
  },
  "admin@ijmb.ng": {
    name: "Admin User",
    email: "admin@ijmb.ng",
    password: "admin123",
    role: "admin",
    avatar: "AU",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("ijmb_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, _password: string, role: Role) => {
    await new Promise((r) => setTimeout(r, 800));
    const mockUser = MOCK_USERS[email];
    if (mockUser) {
      const { password: _, ...userData } = mockUser;
      setUser(userData);
      localStorage.setItem("ijmb_user", JSON.stringify(userData));
    } else {
      const newUser: AuthUser = {
        name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role,
        avatar: email.slice(0, 2).toUpperCase(),
      };
      setUser(newUser);
      localStorage.setItem("ijmb_user", JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ijmb_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useRequireAuth(requiredRole?: Role) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/ijmb/login");
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      navigate(`/ijmb/dashboard/${user?.role}`);
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  return { user, isAuthenticated };
}
