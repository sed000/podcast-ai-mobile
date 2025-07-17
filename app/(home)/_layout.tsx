import { Stack } from "expo-router/stack";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings and Preferences",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="create-podcast"
        options={{ headerShown: false, title: "Create Podcast" }}
      />
      <Stack.Screen
        name="paywall"
        options={{ headerShown: true, title: "Paywall" }}
      />
    </Stack>
  );
}
