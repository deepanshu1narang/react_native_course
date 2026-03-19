import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";
// Import SecureStore for persistent storage
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    signIn: (email: string, password: string) => Promise<void | string>;
    signUp: (name: string, email: string, password: string, phone?: string) => Promise<void | string>;
    isAuth: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be inside of AuthContextProvider");
    }

    return context;
}

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    const router = useRouter();

    useEffect(() => {
        // On app start, check for a saved sessionId
        const restoreSession = async () => {
            const sessionId = await SecureStore.getItemAsync('sessionId');
            if (sessionId) {
                // If sessionId exists, try to get user (auto-login)
                try {
                    await account.get();
                    setIsAuth(true);
                    getUser();
                } catch {
                    // If session is invalid, clear storage
                    await SecureStore.deleteItemAsync('sessionId');
                    setIsAuth(false);
                }
            } else {
                setIsAuth(false);
            }
        };
        restoreSession();
    }, []);

    // Sign in and persist session
    const signIn = async (email: string, password: string): Promise<void | string> => {
        try {
            // Create session with Appwrite
            const session = await account.createEmailPasswordSession({ email, password });
            // Save session ID to SecureStore for persistence
            await SecureStore.setItemAsync('sessionId', session.$id);
            setIsAuth(true);
            await getUser();
        }
        catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An error occurred";
        }
    }

    const signUp = async (name: string, email: string, password: string, phone?: string): Promise<void | string> => {
        try {
            const userId = ID.unique()
            await account.create({ userId, email, password, name });
            await signIn(email, password);
        }
        catch (error) {
            if (error instanceof Error) {
                return error.message;
            }

            return "An error occurred";
        }
    }

    // Sign out and remove session from storage
    const signOut = async () => {
        try{
            await account.deleteSession({ sessionId: "current" });
            // Remove sessionId from SecureStore
            await SecureStore.deleteItemAsync('sessionId');
            setUser(null);
            setIsAuth(false);
            router.replace("/auth");
        }
        catch(err){
            console.log(err);
        }
    }

    const getUser = async () => {
        try{
            const session = await account.get();
            setUser(session);
        }
        catch (_err){
            setUser(null);
        }
    }
 
    return <AuthContext.Provider value={{ user, signIn, signUp, isAuth, signOut }}>
        {children}
    </AuthContext.Provider>
}