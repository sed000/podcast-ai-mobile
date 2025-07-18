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

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onSignInPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
        router.replace('/(home)')
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [startOAuthFlow])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className='text-2xl font-bold text-center'>Welcome to PodcastAI</Text>
      <Button variant="default" size="lg" className='mx-auto rounded-full flex-row items-center' onPress={onSignInPress}>
        <GoogleIcon size={20} />
        <Text>Continue with Google</Text>
      </Button>
    </View>
  )
}