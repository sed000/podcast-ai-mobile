import { View, ScrollView } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { SignOutButton } from "~/components/SignOutButton";
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
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="bg-primary/5 rounded-b-3xl mx-4 mt-2 mb-8 px-6 py-8 border border-primary/10">
          <Link href="/" className="mb-6">
            <View className="w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border">
              <ArrowLeftIcon color="gray" size={20} />
            </View>
          </Link>
          <Text className="text-4xl font-bold text-center text-foreground mb-2">
            ⚙️ Settings
          </Text>
        </View>

        <View className="px-6 flex flex-col gap-6 pb-8">
          <View className="bg-card rounded-2xl p-6 border border-border">
            <Text className="text-2xl font-bold text-foreground mb-6 flex items-center">
              👤 Account
            </Text>
            <View className="gap-y-4">
              <View className="bg-background rounded-xl p-4 border border-border">
                <Text className="text-sm text-muted-foreground mb-1">
                  Email Address
                </Text>
                <Text className="text-lg font-medium text-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </Text>
              </View>
              <View className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <Text className="text-sm text-muted-foreground mb-1">
                  Available Coins
                </Text>
                <Text className="text-2xl font-bold text-foreground flex items-center">
                  🪙 {userDetail?.coins || 0}
                </Text>
              </View>
              <Button
                variant="default"
                size="lg"
                className="rounded-xl bg-primary"
                onPress={() => router.push("/paywall")}
              >
                <Text className="font-semibold">💰 Buy More Coins</Text>
              </Button>
            </View>
          </View>

          <View className="bg-card rounded-2xl p-6 border border-border">
            <Text className="text-2xl font-bold text-foreground mb-6">
              🎨 Appearance
            </Text>
            <View className="flex flex-row items-center justify-between bg-background rounded-xl p-4 border border-border">
              <View>
                <Text className="text-lg font-medium text-foreground">
                  Theme
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Switch between light and dark mode
                </Text>
              </View>
              <ThemeToggle />
            </View>
          </View>

          <View className="bg-card rounded-2xl p-6 border border-border">
            <Text className="text-2xl font-bold text-foreground mb-6">
              🔐 Account Actions
            </Text>
            <View className="gap-y-4">
              <View className="bg-background rounded-xl p-4 border border-border">
                <Text className="text-lg font-medium text-foreground mb-2">
                  Sign Out
                </Text>
                <Text className="text-sm text-muted-foreground mb-4">
                  Sign out of your account on this device
                </Text>
                <Button variant="outline" size="lg" className="rounded-xl border-2">
                  <SignOutButton />
                </Button>
              </View>

              <View className="bg-destructive/5 rounded-xl p-4 border border-destructive/20">
                <Text className="text-lg font-medium text-destructive mb-2">
                  ⚠️ Danger Zone
                </Text>
                <Text className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all data
                </Text>
                <DeleteDialog />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
