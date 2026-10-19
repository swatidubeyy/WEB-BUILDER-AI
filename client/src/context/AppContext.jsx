import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api.js";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {

    //Authentication state
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    //Auth actions
    const checkSession = async () => {
        try {
            const { data } = await api.get("/api/auth/me");
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    }

    useEffect(() => {
        checkSession()
    }, [checkSession]);

    return (
        <AppContext.Provider value={{
            user,
            loadingUser,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}