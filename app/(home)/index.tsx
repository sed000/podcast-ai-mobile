import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PodCard from "~/components/PodCard";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text as TextUI } from "~/components/ui/text";
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaView className="mt-4">
      <SignedIn>
        <ScrollView>
          <View className="flex flex-row items-start justify-between gap-4 mb-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onPress={() => router.push("/settings")}
            >
              <TextUI>Settings</TextUI>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              <TextUI>Create Podcast</TextUI>
            </Button>
          </View>
    
          <View className="flex flex-col gap-4">
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
  );
}
