const path = require('path');

// Determine which config to load based on EAS_BUILD_PROFILE
const buildProfile = process.env.EAS_BUILD_PROFILE || 'development';
console.log('[app.config.js] Loading config for profile:', buildProfile);

// Load the appropriate config file
let envConfig = {};
try {
  envConfig = require(`./config/${buildProfile}.js`);
  console.log('[app.config.js] Successfully loaded config');
} catch (error) {
  console.error(`[app.config.js] Failed to load config for profile ${buildProfile}:`, error);
  // Fallback to development config
  envConfig = require('./config/development.js');
}

// Set environment variables in process.env so they're available to Metro bundler
Object.keys(envConfig).forEach(key => {
  process.env[key] = envConfig[key];
  console.log(`[app.config.js] Set ${key}:`, envConfig[key].substring(0, 20) + '...');
});

module.exports = {
  expo: {
    name: "Loqui",
    slug: "podcastai",
    version: "1.2.0",
    orientation: "portrait",
    icon: "./assets/images/ic-launcher.png",
    scheme: "loqui",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.podcastai",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.verissimus.loqui",
      versionCode: 2,
      permissions: ["com.android.vending.BILLING"],
      blockedPermissions: [
        "android.permission.RECORD_AUDIO"
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/app-icon.png"
    },
    plugins: [
      "expo-router",
      "expo-audio"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "06e9aa21-0e8b-4f9a-a76f-9f1808603fb0"
      },
      ...envConfig
    }
  }
};