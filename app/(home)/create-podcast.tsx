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
      setError("You don't have enough coins (need 1)");
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
    <ScrollView className="flex-1 bg-background p-6">
      <View className="flex-1">
        <Link href="/" className="mb-4 mt-4">
          <ArrowLeftIcon color="gray" />
        </Link>
        <View className="flex-1 justify-center gap-y-8">
          <Text className="text-4xl font-bold text-center text-foreground">
            Let's create a podcast
          </Text>

          <View className="gap-y-4">
            <Label className="text-lg font-medium text-foreground">
              Enter your prompt
            </Label>
            <TextInput
              placeholder="What do you want to listen about?"
              value={prompt}
              onChangeText={setPrompt}
              className="text-lg border border-border rounded-lg p-4 w-full text-foreground"
              multiline={true}
              maxLength={100}
              placeholderTextColor="gray"
            />
            <Text className="text-sm text-muted-foreground text-right">
              {prompt.length} / 100
            </Text>
          </View>

          <View className="gap-y-4">
            <View>
              <Label className="text-lg font-medium text-foreground mb-2">
                Select host voice
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-foreground text-lg"
                    placeholder="Select a voice..."
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Voices</SelectLabel>
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
                className="w-fit" 
                variant="link" 
                disabled={!hostVoice}
                onPress={() => playVoiceSample(hostVoice)}
              >
                <Text>{hostVoice && playingVoice === hostVoice ? "Stop" : "Play Sample"}</Text>
              </Button>
            </View>

            <View>
              <Label className="text-lg font-medium text-foreground mb-2">
                Select guest voice
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-foreground text-lg"
                    placeholder="Select a voice..."
                  />
                </SelectTrigger>
                <SelectContent>
                  <ScrollView>
                    <SelectGroup>
                      <SelectLabel>Voices</SelectLabel>
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
                className="w-fit" 
                variant="link" 
                disabled={!guestVoice}
                onPress={() => playVoiceSample(guestVoice)}
              >
                <Text>{guestVoice && playingVoice === guestVoice ? "Stop" : "Play Sample"}</Text>
              </Button>
            </View>
          </View>

          <View>
            <Button
              size="lg"
              className="w-full"
              disabled={disabled || isLoading}
              onPress={handleCreatePodcast}
            >
              <Text>{isLoading ? "Creating..." : "Create Podcast"}</Text>
            </Button>
            {error ? <Text className="text-center mt-4">{error}</Text> : null}
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
