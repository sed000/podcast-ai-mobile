import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { PodcastProvider } from "~/lib/PodcastContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { useEffect } from "react";
import { config } from "~/lib/config";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

const convex = new ConvexReactClient(config.convexUrl, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {

   // RevenueCat
   useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === "android") {
      try {
        Purchases.configure({
          apiKey: config.revenuecatApiKey,
        });
        console.log("RevenueCat configured successfully");
      } catch (error) {
        console.error("RevenueCat configuration error:", error);
      }
    }
  }, []);


  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ClerkProvider 
      publishableKey={config.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <ConvexProvider client={convex}>
        <PodcastProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Stack>
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(home)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
            <PortalHost />
          </ThemeProvider>
        </PodcastProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
