import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
export default function CancellationDialog() {
    const router = useRouter()
    function handleCancelSubscription() {
        Alert.alert('Subscription Cancelled', 'Your subscription has been cancelled.')
        router.push('/')
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="lg" className="w-fit min-h-fit">
          <Text>Cancel Subscription</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your subscription?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>No</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleCancelSubscription}>
            <Text>Yes</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
