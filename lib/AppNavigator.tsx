import useAuth from "@/lib/auth-context";
import { Stack } from "expo-router";

export default function AppNavigator() {
  const { isAuth } = useAuth();
  // const router = useRouter();
  // const segment = useSegments();

  // useEffect(() => {
  //   const inAuthGroup = segment[0] === "auth";
  //   if(!isAuth && !inAuthGroup){
  //     router.replace("/auth");
  //   }
  //   else{
  //     router.replace("/");
  //   }
  // }, []);

  if (!isAuth) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}