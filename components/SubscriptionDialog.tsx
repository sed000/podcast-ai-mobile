import React from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Text } from './ui/text'
import { Alert, View } from 'react-native'
import CancellationDialog from './CancellationDialog'
export default function SubscriptionDialog() {
    function handleCancelSubscription() {
        Alert.alert('Cancel Subscription', 'Are you sure you want to cancel your subscription?')
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant='default' size='lg' className='rounded-full'>
            <Text>Manage Subscription</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className='w-fit'>
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>
             <View className='flex flex-col justify-start gap-4'>
                <Text>You are currently subscribed to PodcastAI.</Text>
                <CancellationDialog />
             </View>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>OK</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}