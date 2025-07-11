import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    return <Redirect href={"/(home)"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, title: "Sign In" }}
      />
    </Stack>
  );
}
