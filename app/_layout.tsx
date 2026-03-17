import AppNavigator from "@/lib/AppNavigator";
import { AuthContextProvider } from "@/lib/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}
