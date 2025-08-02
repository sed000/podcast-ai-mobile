# Environment Configuration

This directory contains environment-specific configurations for the app.

## Files:
- `development.js` - Used for local development and development builds
- `preview.js` - Used for internal testing builds  
- `production.js` - Used for production/app store builds

## How it works:
1. During EAS Build, the `EAS_BUILD_PROFILE` environment variable is set automatically
2. `app.config.js` reads this variable and loads the corresponding config file
3. The config values are set in `process.env` before Metro bundler runs
4. The `EXPO_PUBLIC_*` variables are then inlined into the JavaScript bundle

## Security Note:
These files contain "publishable" keys that are meant to be included in the client-side bundle. 
Do NOT put any secret/private keys here - they will be visible to app users.

## Adding new environment variables:
1. Add the variable to all config files (development.js, preview.js, production.js)
2. Prefix with `EXPO_PUBLIC_` if it needs to be available in the app code
3. Import from `lib/config.ts` in your code