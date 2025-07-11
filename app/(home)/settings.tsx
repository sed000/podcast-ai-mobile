import { View } from 'react-native'
import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { SignOutButton } from '~/components/SignOutButton';
import { ThemeToggle } from '~/components/ThemeToggle';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function settings() {
    const { user } = useUser();
    const { signOut } = useClerk();
  return (
    <View className='flex-1 mt-4 p-4 flex flex-col gap-4 bg1'>
      <View className='flex flex-col justify-start gap-4'>
        <Text className='text-2xl font-bold'>Account</Text>
        <Text className='text-lg'>{user?.emailAddresses[0].emailAddress}</Text>
        <Button  variant='default' size='lg' className='rounded-full'>
          <Text>Subscription</Text>
        </Button>
      </View>
      <View className='flex flex-col justify-start  gap-4'>
        <Text className='text-2xl font-bold'>Sign Out</Text>
        <Button variant='destructive' size='lg' className='rounded-full'>
          <SignOutButton />
        </Button>
      </View>
      <View className='flex flex-col justify-start  gap-4'>
        <Text className='text-2xl font-bold'>Delete Account</Text>
        <Button variant='destructive' size='lg' className='rounded-full'>
          <Text>Delete Account</Text>
        </Button>
      </View>
    </View>
  )
}