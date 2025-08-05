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
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-8">
        <View className="mb-12 items-center">
          <View className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-6 border-2 border-primary/20">
            <Text className="text-4xl">🎙️</Text>
          </View>
          <Text className="text-4xl font-bold text-center text-foreground mb-3">
            Welcome to Loqui
          </Text>
          <Text className="text-lg text-center text-muted-foreground px-4">
            Create amazing AI-powered podcasts in seconds
          </Text>
        </View>

        {error && (
          <View className="w-full mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
            <Text className="text-destructive text-center font-medium">
              ⚠️ {error}
            </Text>
          </View>
        )}

        <View className="w-full max-w-sm">
          <Button 
            variant="default" 
            size="lg" 
            className="w-full rounded-2xl bg-primary py-4 flex-row items-center justify-center gap-3" 
            onPress={onSignInPress}
          >
            <GoogleIcon size={24} />
            <Text className="text-lg font-semibold">Continue with Google</Text>
          </Button>
          
          <Text className="text-center text-sm text-muted-foreground mt-6 px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>

        <View className="mt-12 gap-y-3">
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl">✨</Text>
            <Text className="text-muted-foreground">AI-powered podcasts</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl">🎭</Text>
            <Text className="text-muted-foreground">Multiple voice options</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl">⚡</Text>
            <Text className="text-muted-foreground">Generated in seconds</Text>
          </View>
        </View>
      </View>
    </View>
  )
}