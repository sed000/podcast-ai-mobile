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
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { useClerk, useUser } from "@clerk/clerk-expo";
export default function ConfirmDialog() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter()
    const deleteUserMutation = useMutation(api.database.deleteUser);
    async function handleDeleteAccount() {
        await deleteUserMutation({ userId: user?.id! });
        Alert.alert('Account Deleted', 'Your account has been deleted.')
        await user?.delete()
        signOut()
        router.push('/')
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="lg" className="w-fit min-h-fit">
          <Text>Confirm</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Confirming this will delete your account and all your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>No</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleDeleteAccount}>
            <Text>Yes</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
