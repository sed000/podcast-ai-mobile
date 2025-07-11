import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PodCard from "~/components/PodCard";
import { Button } from "~/components/ui/button";
import { Text as TextUI } from "~/components/ui/text";
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View className="flex-1">
      <SafeAreaView>
        <SignedIn>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mt-2 flex flex-row items-start justify-between gap-4 mx-4 mb-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onPress={() => router.push("/settings")}
              >
                <TextUI>Settings</TextUI>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onPress={() => router.push("/create-podcast")}
              >
                <TextUI>Create Podcast</TextUI>
              </Button>
            </View>

            <View className="mx-2 flex flex-col gap-4">
              <PodCard
                title="GeneratedPodcast"
                description="Generate a podcast from your text"
              />
              <PodCard
                title="GeneratedPodcast"
                description="Generate a podcast from your text"
              />
              <PodCard
                title="GeneratedPodcast"
                description="Generate a podcast from your text"
              />
              <PodCard
                title="GeneratedPodcast"
                description="Generate a podcast from your text"
              />
              <PodCard
                title="GeneratedPodcast"
                description="Generate a podcast from your text"
              />
              <PodCard
                title="GeneratedPodcast"
                description="Generate a podcast from your text"
              />
            </View>
          </ScrollView>
        </SignedIn>
      </SafeAreaView>
    </View>
  );
}
