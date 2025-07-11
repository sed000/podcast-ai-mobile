import { useSSO, useAuth, useUser } from '@clerk/clerk-expo'
import { Redirect, useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useWarmUpBrowser } from '../../lib/useWarmUpBrowser'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'

export default function Page() {
  useWarmUpBrowser()
  const router = useRouter()

  const { startSSOFlow } = useSSO()
  const { isLoaded } = useAuth()
  const { user } = useUser()

  if (user) {
    return <Redirect href={"/(home)"} />
  }

  const onSignInPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: '/(home)',
      })

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
        router.replace('/(home)')
      }
    } catch (err) {
      console.error('SSO error', err)
    }
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className='text-2xl font-bold text-center'>Welcome to PodcastAI</Text>
      <Button
        disabled={!isLoaded}
        variant='default'
        size='lg'
        className='mx-auto rounded-full'
        onPress={onSignInPress}
      >
        <Text>Continue with Google</Text>
      </Button>
    </View>
  )
}