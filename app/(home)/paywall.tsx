import React from "react";
import { View } from "react-native";

import RevenueCatUI from "react-native-purchases-ui";

export default function Paywall() {
  return (
    <RevenueCatUI.Paywall
      onDismiss={() => {
      }}
    />
  );
}
