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
import { useUser } from "@clerk/clerk-react";
import { router } from "expo-router";
import { usePodcast } from "~/lib/PodcastContext";
import { generatePodcast } from "~/api/api";

const voiceOptions = [
  { label: "Alloy", value: "alloy" },
  { label: "Ash", value: "ash" },
  { label: "Ballad", value: "ballad" },
  { label: "Echo", value: "echo" },
  { label: "Coral", value: "coral" },
  { label: "Fable", value: "fable" },
  { label: "Nova", value: "nova" },
];

export default function CreatePodcast() {
  const [prompt, setPrompt] = useState("");
  const [hostVoice, setHostVoice] = useState("");
  const [guestVoice, setGuestVoice] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const { setGenerating, setError: setPodcastError } = usePodcast();
  const userId = user?.id?.toString();
  useEffect(() => {
    if (prompt.length < 10) {
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
  }, [hostVoice, guestVoice, prompt]);

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
          guestVoice
        );
      } catch (err: any) {
        setPodcastError(err.message || "Failed to generate podcast");
      } finally {
        setGenerating(false);
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <SafeAreaView className="flex-1">
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
              className="text-lg text-black bg-gray-300 border border-border rounded-lg p-4 w-full"
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
              <Button className="w-fit" variant="link">
                <Text>Play Sample</Text>
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
              <Button className="w-fit" variant="link">
                <Text>Play Sample</Text>
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
            {error ? (
              <Text className="text-destructive text-center mt-4">{error}</Text>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
