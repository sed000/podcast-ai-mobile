import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY, EXPO_PUBLIC_AZURE_URL, EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY, EXPO_PUBLIC_CONVEX_URL } from '@env';
// Environment variables are injected by app.config.js
export const config = {
  clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string,
  azureUrl: process.env.EXPO_PUBLIC_AZURE_URL as string,
  revenuecatApiKey: process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY as string,
  convexUrl: process.env.EXPO_PUBLIC_CONVEX_URL as string,
};

// Simple validation - these will throw at app startup if missing
if (!config.clerkPublishableKey) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

if (!config.convexUrl) {
  throw new Error('Missing EXPO_PUBLIC_CONVEX_URL');
}

if (!config.azureUrl) {
  throw new Error('Missing EXPO_PUBLIC_AZURE_URL');
}

if (!config.revenuecatApiKey) {
  throw new Error('Missing EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY');
}
export const getConfig = () => config;