import { Alert, View, Platform } from "react-native";
import React, { useState } from "react";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as FileSystem from "expo-file-system";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Text as TextUI } from "./ui/text";
import { Button } from "./ui/button";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

interface PodCardProps {
  title: string;
  description: string;
  podcastId: string;
  audioUrl: string;
}

export default function PodCard({
  title,
  description,
  podcastId,
  audioUrl,
}: PodCardProps) {
  const deletePodcast = useMutation(api.database.deletePodcast);
  const player = useAudioPlayer({ uri: audioUrl });
  const status = useAudioPlayerStatus(player);
  const [isDownloading, setIsDownloading] = useState(false);

  const confirmDelete = () => {
    Alert.alert(
      "Delete Podcast",
      "Are you sure you want to delete this podcast?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deletePodcast({ podcastId: podcastId }),
        },
      ]
    );
  };

  const togglePlayback = () => {
    if (status.playing) {
      player.pause();
      player.seekTo(0);
    } else {
      player.play();
    }
  };

  const downloadAudio = async () => {
    try {
      setIsDownloading(true);

      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filename = `${sanitizedTitle}.mp3`;

      const fileUri = FileSystem.documentDirectory + filename;
      const { uri } = await FileSystem.downloadAsync(audioUrl, fileUri);

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            "audio/mpeg"
          ).then(async (newUri) => {
            await FileSystem.writeAsStringAsync(newUri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });

            Alert.alert(
              "Success",
              `Podcast saved successfully!\nFile: ${filename}`
            );
          });
        } else {
          Alert.alert(
            "Permission Denied",
            "Cannot save file without storage permission"
          );
        }

        await FileSystem.deleteAsync(uri);
      } else {
        Alert.alert(
          "Downloaded!",
          `Podcast saved successfully!\nFile: ${filename}\n\nYou can find it in the Files app under "On My iPhone/iPad" > ${__DEV__ ? "Expo Go" : "Your App Name"}`
        );
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert(
        "Error",
        `Download failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View className="mb-2">
      <Card className="w-full rounded-3xl bg-card border-2 border-primary/10 shadow-sm">
        <CardHeader className="pb-4">
          <View className="flex-row items-start gap-3 mb-3">
            <View className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
              <TextUI className="text-2xl">🎙️</TextUI>
            </View>
            <View className="flex-1">
              <CardTitle>
                <TextUI className="text-2xl font-bold text-foreground leading-tight">{title}</TextUI>
              </CardTitle>
            </View>
          </View>
          <CardDescription>
            <TextUI className="text-base text-muted-foreground leading-relaxed">
              {description}
            </TextUI>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-2">
          <View className="flex flex-row gap-3 mb-4">
            <Button
              variant="default"
              size="default"
              className="flex-1 rounded-2xl bg-primary"
              onPress={togglePlayback}
              disabled={!status.isLoaded}
            >
              <TextUI className="font-semibold">
                {!status.isLoaded
                  ? "⏳ Loading..."
                  : status.playing
                    ? "⏸️ Stop"
                    : "▶️ Listen"}
              </TextUI>
            </Button>
            <Button
              variant="outline"
              size="default"
              className="flex-1 rounded-2xl border-2 border-primary/20 bg-background"
              onPress={downloadAudio}
              disabled={isDownloading}
            >
              <TextUI className="font-semibold">
                {isDownloading ? "⏬ Saving..." : "💾 Download"}
              </TextUI>
            </Button>
          </View>
          
          <View className="border-t border-border/30 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="self-center rounded-xl border border-destructive/30 bg-destructive/5"
              onPress={confirmDelete}
            >
              <TextUI className="text-destructive font-medium">🗑️ Delete</TextUI>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
