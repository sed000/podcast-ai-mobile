import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import RevenueCatUI from "react-native-purchases-ui";
import Purchases, { PurchasesOffering } from "react-native-purchases";
import type {
  CustomerInfo,
  PurchasesStoreTransaction,
} from "react-native-purchases";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";

export default function Paywall() {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const { user } = useUser();
  const addPurchase = useMutation(api.database.addPurchase);
  useEffect(() => {
    const getOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          setOffering(offerings.current);
        } else {
          Alert.alert("No Offerings Found", "Could not find any available offerings.");
        }
      } catch (e) {
        console.error("Error getting offerings:", e);
        Alert.alert("Error", "Could not fetch offerings.");
      }
    };
    getOfferings();
  }, []);

  const handlePurchase = ({
    customerInfo,
    storeTransaction,
  }: {
    customerInfo: CustomerInfo;
    storeTransaction: PurchasesStoreTransaction;
  }) => {
    try {
    console.log("Purchase successful:", { customerInfo, storeTransaction });
    if (user) {
      addPurchase({
        userId: user.id,
        revenuecatId: storeTransaction.transactionIdentifier,
      });
    }
    Alert.alert(
      "Purchase Successful",
      "Your coins will be added shortly.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (e) {
      console.error("Error adding purchase:", e);
      Alert.alert("Error", "Failed to add purchase.");
    }
  };

  const handleDismiss = () => {
    console.log("Paywall dismissed");
    router.back();
  };

  return (
    <RevenueCatUI.Paywall
      options={{ offering }}
      onDismiss={handleDismiss}
      onPurchaseCompleted={handlePurchase}
    />
  );
}
