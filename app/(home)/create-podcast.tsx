import { Alert, SafeAreaView, ScrollView, TextInput, View } from "react-native";
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
export default function CreatePodcast() {
  const [prompt, setPrompt] = useState("");
  const [hostVoice, setHostVoice] = useState("");
  const [guestVoice, setGuestVoice] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hostVoice === guestVoice) {
      setDisabled(true);
      setError("Host and guest voices cannot be the same");
    }
    if (prompt.length < 10) {
      setDisabled(true);
      setError("Prompt must be at least 10 characters");
    }
    if (hostVoice != guestVoice && prompt.length >= 10) {
      setDisabled(false);
      setError("");
    }
  }, [hostVoice, guestVoice, prompt]);

  return (
    <View className="flex-1 mt-4 p-4 flex flex-col gap-4 bg1">
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-5xl font-bold text-center mt-10">
            Let's create a podcast
          </Text>
          <View className="flex flex-col items-center justify-center mt-10">
            <Label className="text-5xl  font-bold">Enter your prompt</Label>
            <TextInput
              placeholder="What do you want to listen about?"
              value={prompt}
              onChangeText={setPrompt}
              aria-labelledby="input-label"
              className="text-2xl bg-white w-fit border-2 p-2 mx-2 rounded-full"
              multiline={true}
              maxLength={100}
            />
            <Text className="text-md font-bold mt-1">
              {prompt.length} / 100 characters
            </Text>
          </View>
          <View className="flex flex-col items-center justify-center mt-10">
            <Label className="text-5xl font-bold">Select host voice</Label>
            <View className="flex flex-row items-center justify-center gap-2">
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Select a voice for the host"
                  />
                </SelectTrigger>
                <SelectContent className="w-[250px]">
                  <SelectGroup>
                    <SelectLabel>Voices</SelectLabel>
                    <SelectItem
                      label="Apple"
                      value="apple"
                      onPress={() => setHostVoice("apple")}
                    >
                      Apple
                    </SelectItem>
                    <SelectItem
                      label="Banana"
                      value="banana"
                      onPress={() => setHostVoice("banana")}
                    >
                      Banana
                    </SelectItem>
                    <SelectItem
                      label="Blueberry"
                      value="blueberry"
                      onPress={() => setHostVoice("blueberry")}
                    >
                      Blueberry
                    </SelectItem>
                    <SelectItem
                      label="Grapes"
                      value="grapes"
                      onPress={() => setHostVoice("grapes")}
                    >
                      Grapes
                    </SelectItem>
                    <SelectItem
                      label="Pineapple"
                      value="pineapple"
                      onPress={() => setHostVoice("pineapple")}
                    >
                      Pineapple
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" size="lg" className="rounded-full">
                <Text>Play</Text>
              </Button>
            </View>
          </View>
          <View className="flex flex-col items-center justify-center mt-10">
            <Label className="text-5xl font-bold">Select guest voice</Label>
            <View className="flex flex-row items-center justify-center gap-2">
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Select a voice for the guest"
                  />
                </SelectTrigger>
                <SelectContent className="w-[250px]">
                  <SelectGroup>
                    <SelectLabel>Voices</SelectLabel>
                    <SelectItem
                      label="Apple"
                      value="apple"
                      onPress={() => setGuestVoice("apple")}
                    >
                      Apple
                    </SelectItem>
                    <SelectItem
                      label="Banana"
                      value="banana"
                      onPress={() => setGuestVoice("banana")}
                    >
                      Banana
                    </SelectItem>
                    <SelectItem
                      label="Blueberry"
                      value="blueberry"
                      onPress={() => setGuestVoice("blueberry")}
                    >
                      Blueberry
                    </SelectItem>
                    <SelectItem
                      label="Grapes"
                      value="grapes"
                      onPress={() => setGuestVoice("grapes")}
                    >
                      Grapes
                    </SelectItem>
                    <SelectItem
                      label="Pineapple"
                      value="pineapple"
                      onPress={() => setGuestVoice("pineapple")}
                    >
                      Pineapple
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" size="lg" className="rounded-full">
                <Text>Play</Text>
              </Button>
            </View>
            <Button
              variant="default"
              size="lg"
              className="rounded-full mt-4"
              disabled={disabled}
            >
              <Text>Create Podcast</Text>
            </Button>
            {error && <Text className="text-red-500">{error}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
