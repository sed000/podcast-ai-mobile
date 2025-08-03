import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useWarmUpBrowser } from '../../lib/useWarmUpBrowser'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import { GoogleIcon } from '~/lib/icons/GoogleIcon'

export default function SignInPage() {
  useWarmUpBrowser()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onSignInPress = React.useCallback(async () => {
    try {
      setError(null) 
      const { createdSessionId, setActive } = await startOAuthFlow()
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
        router.replace('/(home)')
      }
    } catch (err) {
      console.error('OAuth error', err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
    }
  }, [startOAuthFlow])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className='text-2xl font-bold text-center'>Welcome to Loqui</Text>
      {error && (
        <Text className='text-red-500 text-center mt-4 mb-4 px-4'>
          {error}
        </Text>
      )}
      <Button variant="default" size="lg" className='mx-auto rounded-full flex-row items-center' onPress={onSignInPress}>
        <GoogleIcon size={20} />
        <Text>Continue with Google</Text>
      </Button>
    </View>
  )
}