import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { generatePodcast } from "~/api/api";
import { useUser } from "@clerk/clerk-react";
import { Link, router } from "expo-router";
import { usePodcast } from "~/lib/PodcastContext";
import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { ArrowLeftIcon } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";

const voiceOptions = [
  { label: "Ash", value: "ash" },
  { label: "Coral", value: "coral" },
  { label: "Echo", value: "echo" },
  { label: "Fable", value: "fable" },
  { label: "Nova", value: "nova" },
  { label: "Onyx", value: "onyx" },
  { label: "Sage", value: "sage" },
];

export default function CreatePodcast() {
  const [prompt, setPrompt] = useState("");
  const [hostVoice, setHostVoice] = useState("");
  const [guestVoice, setGuestVoice] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playingVoice, setPlayingVoice] = useState("");
  const { user } = useUser();
  const { setGenerating, setError: setPodcastError } = usePodcast();
  const createPodcastMutation = useMutation(api.database.createPodcast);
  const userId = user?.id?.toString();
  const voicePlayer = useAudioPlayer();
  const getVoiceUri = (voice: string) => {
    return `https://cdn.openai.com/API/voice-previews/${voice}.flac`;
  };
  const coins = useQuery(api.database.checkCoins, { userId: userId! }) || 0;
  useEffect(() => {
    if (coins === undefined || coins === null) {
      setDisabled(true);
      setError("Loading...");
      return;
    }
    if (coins < 1) {
      setDisabled(true);
      setError("You don't have enough coins (1 coin)");
    } else if (prompt.length < 10) {
      setDisabled(true);
      setError("Prompt must be at least 10 characters");
    } else if (!hostVoice) {
      setDisabled(true);
      setError("Please select a host voice");
    } else if (!guestVoice) {
      setDisabled(true);
      setError("Please select a guest voice");
    } else if (hostVoice === guestVoice) {
      setDisabled(true);
      setError("Host and guest voices cannot be the same");
    } else {
      setDisabled(false);
      setError("");
    }
  }, [hostVoice, guestVoice, prompt, coins]);

  const handleCreatePodcast = async () => {
    if (!disabled && userId && !isLoading) {
      try {
        setIsLoading(true);
        setGenerating(true, prompt);
        setPodcastError(null);
        router.push("/");
        const result = await generatePodcast(
          prompt,
          userId,
          hostVoice,
          guestVoice,
          coins,
          createPodcastMutation
        );
      } catch (err: any) {
        setPodcastError(err.message || "Failed to generate podcast");
      } finally {
        setGenerating(false);
        setIsLoading(false);
      }
    }
  };

  const playVoiceSample = async (voice: string) => {
    if (!voice) return;
    
    if (playingVoice === voice) {
      voicePlayer.pause();
      voicePlayer.seekTo(0);
      setPlayingVoice("");
      return;
    }

    try {
      voicePlayer.replace({ uri: getVoiceUri(voice) });
      voicePlayer.play();
      setPlayingVoice(voice);
    } catch (error) {
      console.error("Failed to play:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-primary/5 rounded-b-3xl mx-4 mt-2 mb-8 px-6 py-8 border border-primary/10">
          <Link href="/" className="mb-6">
            <View className="w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border">
              <ArrowLeftIcon color="gray" size={20} />
            </View>
          </Link>
          <Text className="text-4xl font-bold text-center text-foreground mb-2">
            🎙️ Create Your Podcast
          </Text>
          <Text className="text-lg text-center text-muted-foreground">
            Transform your ideas into engaging conversations
          </Text>
        </View>

        <View className="px-6 gap-y-10 pb-8">
          <View className="bg-card rounded-2xl p-6 border border-border">
            <Label className="text-xl font-bold text-foreground mb-4 flex items-center">
              💭 Your Creative Prompt
            </Label>
            <TextInput
              placeholder="What fascinating topic would you like to explore? Be creative!"
              value={prompt}
              onChangeText={setPrompt}
              className="text-lg border-2 border-primary/20 rounded-xl p-4 w-full text-foreground bg-background min-h-[120px]"
              multiline={true}
              maxLength={100}
              placeholderTextColor="gray"
              textAlignVertical="top"
            />
            <View className="flex-row justify-between items-center mt-3">
              <Text className="text-sm text-muted-foreground">
                💡 Be specific and creative for best results
              </Text>
              <Text className="text-sm text-muted-foreground font-medium">
                {prompt.length} / 100
              </Text>
            </View>
          </View>

          <View className="gap-y-6">
            <Text className="text-2xl font-bold text-center text-foreground mb-2">
              🎭 Choose Your Voices
            </Text>
            
            <View className="bg-card rounded-2xl p-6 border border-border">
              <Label className="text-lg font-bold text-foreground mb-4 flex items-center">
                👤 Host Voice
              </Label>
              <Select>
                <SelectTrigger className="w-full border-2 border-primary/20 rounded-xl bg-background">
                  <SelectValue
                    className="text-foreground text-lg"
                    placeholder="🎤 Select host voice..."
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Voices</SelectLabel>
                    {voiceOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        onPress={() => setHostVoice(option.value)}
                        label={option.label}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button 
                className="mt-3 self-start" 
                variant="outline" 
                disabled={!hostVoice}
                onPress={() => playVoiceSample(hostVoice)}
              >
                <Text className="font-medium">
                  {hostVoice && playingVoice === hostVoice ? "🔇 Stop" : "▶️ Preview"}
                </Text>
              </Button>
            </View>

            <View className="bg-card rounded-2xl p-6 border border-border">
              <Label className="text-lg font-bold text-foreground mb-4 flex items-center">
                👥 Guest Voice
              </Label>
              <Select>
                <SelectTrigger className="w-full border-2 border-primary/20 rounded-xl bg-background">
                  <SelectValue
                    className="text-foreground text-lg"
                    placeholder="🎤 Select guest voice..."
                  />
                </SelectTrigger>
                <SelectContent>
                  <ScrollView>
                    <SelectGroup>
                      <SelectLabel>Available Voices</SelectLabel>
                      {voiceOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          onPress={() => setGuestVoice(option.value)}
                          label={option.label}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
              <Button 
                className="mt-3 self-start" 
                variant="outline" 
                disabled={!guestVoice}
                onPress={() => playVoiceSample(guestVoice)}
              >
                <Text className="font-medium">
                  {guestVoice && playingVoice === guestVoice ? "🔇 Stop" : "▶️ Preview"}
                </Text>
              </Button>
            </View>
          </View>

          <View className="bg-card rounded-2xl p-6 border border-border">
            <Button
              size="lg"
              className="w-full rounded-xl bg-primary py-4"
              disabled={disabled || isLoading}
              onPress={handleCreatePodcast}
            >
              <Text className="text-lg font-bold">
                {isLoading ? "✨ Creating Magic..." : "🚀 Create Podcast"}
              </Text>
            </Button>
            {error ? (
              <View className="mt-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                <Text className="text-center text-destructive font-medium">
                  ⚠️ {error}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
