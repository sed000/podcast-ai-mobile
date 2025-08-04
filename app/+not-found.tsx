import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="bg-card rounded-3xl p-8 border border-border items-center max-w-sm w-full">
          <View className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6">
            <Text className="text-4xl">🤔</Text>
          </View>
          
          <Text className="text-3xl font-bold text-foreground mb-3 text-center">
            Page Not Found
          </Text>
          <View className="w-full gap-y-3">
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-2xl bg-primary"
              onPress={() => router.push('/')}
            >
              <Text className="font-semibold">🏠 Go Home</Text>
            </Button>  
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-2xl border-2 border-primary/20"
              onPress={() => router.back()}
            >
              <Text className="font-semibold">← Go Back</Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
}
