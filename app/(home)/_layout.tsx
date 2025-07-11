import { Stack } from 'expo-router/stack'
import { SignOutButton } from '~/components/SignOutButton'
import { ThemeToggle } from '~/components/ThemeToggle'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false}}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="settings" options={{ headerShown: true, title: 'Settings and Preferences', headerRight: () => <ThemeToggle /> }} />
    </Stack>
  )
}