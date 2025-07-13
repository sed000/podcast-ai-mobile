import { View } from 'react-native'
import React, { useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { SignOutButton } from '~/components/SignOutButton';
import SubscriptionDialog from '~/components/SubscriptionDialog';

export default function settings() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [coins, setCoins] = useState(0);
    const [subscription, setSubscription] = useState(true);
  return (
    <View className='flex-1 p-4 flex flex-col gap-4 bg-background'>
      <View className='flex flex-col justify-start gap-4 bg-background'>
        <Text className='text-2xl font-bold'>Account</Text>
        <Text className='text-lg'>{user?.emailAddresses[0].emailAddress}</Text>
        <Text className='text-lg font-bold'>Coins: {coins}</Text>
        {subscription ? (
         <SubscriptionDialog />
        ) : (
          <Button  variant='default' size='lg' className='rounded-full'>
            <Text>Subscribe</Text>
          </Button>
        )}
      </View>
      <View className='flex flex-col justify-start  gap-4'>
        <Text className='text-2xl font-bold'>Sign Out</Text>
        <Button variant='destructive' size='lg' className='rounded-full'>
          <SignOutButton />
        </Button>
      </View>
      <View className='flex flex-col justify-start gap-4'>
        <Text className='text-2xl font-bold'>Delete Account</Text>
        <Button variant='destructive' size='lg' className='rounded-full'>
          <Text>Delete Account</Text>
        </Button>
      </View>
    </View>
  )
}