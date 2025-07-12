import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PodCard from "~/components/PodCard";
import { Button } from "~/components/ui/button";
import { Text as TextUI } from "~/components/ui/text";
import { usePodcast } from "~/lib/PodcastContext";
import LoadingSpinner from "~/components/LoadingSpinner";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { isGenerating, generatingPrompt, error } = usePodcast();

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
                disabled={isGenerating}
              >
                <TextUI>Create Podcast</TextUI>
              </Button>
            </View>

            {isGenerating && (
              <LoadingSpinner prompt={generatingPrompt} />
            )}

            {error && (
              <View className="mx-4 mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
                <TextUI className="text-destructive font-medium">
                  Error generating podcast
                </TextUI>
                <TextUI className="text-destructive text-sm mt-1">
                  Please try again later. Your coins will be refunded.
                </TextUI>
              </View>
            )}

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
