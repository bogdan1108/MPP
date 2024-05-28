import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const localData = localStorage.getItem("site");
    return localData ? JSON.parse(localData) : { token: '', user: null };
  });

  useEffect(() => {
    // Sync state with local storage changes
    const handleStorageChange = () => {
      const localData = localStorage.getItem("site");
      setAuthData(localData ? JSON.parse(localData) : { token: '', user: null });
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to log in: ${response.status} ${response.statusText}`);
      }
      const res = await response.json();
      if (res.token && res.role) {
        const newAuthData = { token: res.token, user: { role: res.role } };
        setAuthData(newAuthData);
        localStorage.setItem("site", JSON.stringify(newAuthData)); // Store token and role as a JSON string
        return true; // Indicate successful login
      }
      throw new Error("Invalid token or role received from server");
    } catch (err) {
      console.error(err);
      // Implement a redirect to login or a notification for the error
      return false; // Indicate failed login
    }
  };

  const logOut = () => {
    setAuthData({ token: '', user: null });
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider value={{ token: authData.token, user: authData.user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
