#!/usr/bin/env node

console.log('Testing environment configuration...\n');

// Test different profiles
const profiles = ['development', 'preview', 'production'];

profiles.forEach(profile => {
  console.log(`\n=== Testing ${profile} profile ===`);
  
  // Set the EAS_BUILD_PROFILE
  process.env.EAS_BUILD_PROFILE = profile;
  
  // Clear the require cache to force reload
  delete require.cache[require.resolve('../app.config.js')];
  Object.keys(require.cache).forEach(key => {
    if (key.includes('/config/')) {
      delete require.cache[key];
    }
  });
  
  try {
    // Load app.config.js
    const appConfig = require('../app.config.js');
    
    // Check if environment variables are set
    const envVars = [
      'EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'EXPO_PUBLIC_AZURE_URL', 
      'EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY',
      'EXPO_PUBLIC_CONVEX_URL'
    ];
    
    console.log('Environment variables:');
    envVars.forEach(varName => {
      const value = process.env[varName];
      if (value) {
        console.log(`✅ ${varName}: ${value.substring(0, 30)}...`);
      } else {
        console.log(`❌ ${varName}: NOT SET`);
      }
    });
    
    // Check if they're in extra
    console.log('\nIn app.config.expo.extra:');
    envVars.forEach(varName => {
      const value = appConfig.expo.extra[varName];
      if (value) {
        console.log(`✅ ${varName}: ${value.substring(0, 30)}...`);
      } else {
        console.log(`❌ ${varName}: NOT SET`);
      }
    });
    
  } catch (error) {
    console.error(`❌ Error loading config for ${profile}:`, error.message);
  }
});

console.log('\n✅ Configuration test complete!');