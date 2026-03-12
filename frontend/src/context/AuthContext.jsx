import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Check existing session
  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);        //  logged in
        } else {
          setUser(null);        //  not logged in
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);      
      });
  }, []);

  //  Login
  const login = async (formData) => {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    setUser(data); //  user now truthy
  };

  //  Signup
  const signup = async (formData) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    const data = await res.json();
    setUser(data);
  };

  //  Logout
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
