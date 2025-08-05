import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PodCard from "~/components/PodCard";
import { Button } from "~/components/ui/button";
import { Text as TextUI } from "~/components/ui/text";
import { usePodcast } from "~/lib/PodcastContext";
import LoadingSpinner from "~/components/LoadingSpinner";
import { api } from "~/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { isGenerating, generatingPrompt, error } = usePodcast();
  const [isLoading, setIsLoading] = useState(true);

  const podcasts = useQuery(
    api.database.getPodcasts,
    user ? { userId: user.id } : "skip"
  );

  useEffect(() => {
    if (podcasts) {
      setIsLoading(false);
    }
  }, [podcasts]);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="px-6 pt-4 pb-8 bg-primary/5 rounded-b-3xl mx-4 mt-2 mb-6 border border-primary/10">
            <TextUI className="text-3xl font-bold text-center mb-6 text-foreground">
              🎙️ Your Podcasts
            </TextUI>
            <View className="flex flex-row items-center justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full flex-1 border-2 border-primary/20 bg-card shadow-sm"
                onPress={() => router.push("/settings")}
              >
                <TextUI className="font-semibold">⚙️</TextUI>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="rounded-full bg-primary shadow-sm"
                onPress={() => router.push("/create-podcast")}
                disabled={isGenerating}
              >
                <TextUI className="font-semibold">✨ Create Podcast</TextUI>
              </Button>
            </View>
          </View>

          {isGenerating && (
            <View className="mx-4 mb-6">
              <LoadingSpinner prompt={generatingPrompt} />
            </View>
          )}

          {error && (
            <View className="mx-4 mb-6 p-6 bg-destructive/10 border-l-4 border-destructive rounded-xl">
              <TextUI className="text-destructive font-bold text-lg mb-2">
                ⚠️ Error generating podcast
              </TextUI>
              <TextUI className="text-destructive/80 text-base">
                Please try again later. Your coins will be refunded.
              </TextUI>
            </View>
          )}

          <View className="px-4 flex flex-col gap-6 pb-8">
            {isLoading && (
              <View className="flex flex-col items-center justify-center gap-6 py-16">
                <View className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <TextUI className="text-2xl">🔄</TextUI>
                </View>
                <TextUI className="text-xl font-semibold text-muted-foreground">
                  Loading your podcasts...
                </TextUI>
              </View>
            )}
            
            {podcasts?.map((podcast) => (
              <PodCard
                key={podcast._id}
                podcastId={podcast._id}
                title={podcast.title}
                description={podcast.description}
                audioUrl={podcast.audioUrl}
              />
            ))}
            
            {!isLoading && !podcasts?.length && (
              <View className="flex flex-col items-center justify-center gap-6 py-16 px-6">
                <View className="text-center gap-y-2">
                  <TextUI className="text-2xl font-bold text-foreground">
                    Ready to create?
                  </TextUI>
                  <TextUI className="text-lg text-muted-foreground px-4">
                    No podcasts found. Start your journey by creating your first amazing podcast!
                  </TextUI>
                </View>
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full mt-4 bg-primary px-8"
                  onPress={() => router.push("/create-podcast")}
                >
                  <TextUI className="font-semibold">🚀 Get Started</TextUI>
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
