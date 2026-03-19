import AppNavigator from "@/lib/AppNavigator";
import { AuthContextProvider } from "@/lib/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthContextProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
