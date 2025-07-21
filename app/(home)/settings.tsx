import { View } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { SignOutButton } from "~/components/SignOutButton";
import SubscriptionDialog from "~/components/SubscriptionDialog";
import DeleteDialog from "~/components/DeleteDialog";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "lucide-react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function settings() {
  const { user } = useUser();
  const router = useRouter();
  const userDetail = useQuery(
    api.database.getUser,
    user ? { userId: user.id } : "skip"
  );

  return (
    <SafeAreaView className="flex-1 p-4 flex flex-col gap-4 bg-background">
      <Link href="/" className="mb-2 mt-3">
        <ArrowLeftIcon color="gray" />
      </Link>
      <View className="flex flex-col justify-start gap-4 bg-background">
        <Text className="text-2xl font-bold">Account</Text>
        <Text className="text-lg">{user?.emailAddresses[0].emailAddress}</Text>
        <Text className="text-lg font-bold">Coins: {userDetail?.coins}</Text>
        <Button
          variant="default"
          size="lg"
          className="rounded-full"
          onPress={() => router.push("/paywall")}
        >
          <Text>Buy Coins</Text>
        </Button>
      </View>
      <View className="flex flex-row justify-start gap-4 mt-2 mb-2">
        <Text className="text-2xl font-bold">Change Theme</Text>
        <ThemeToggle />
      </View>
      <View className="flex flex-col justify-start  gap-4">
        <Text className="text-2xl font-bold">Sign Out</Text>
        <Button variant="destructive" size="lg" className="rounded-full">
          <SignOutButton />
        </Button>
      </View>
      <View className="flex flex-col justify-start gap-4">
        <Text className="text-2xl font-bold">Delete Account</Text>
        <DeleteDialog />
      </View>
    </SafeAreaView>
  );
}
