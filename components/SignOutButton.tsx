import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { TouchableOpacity } from 'react-native'
import { Text } from './ui/text'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  )
}