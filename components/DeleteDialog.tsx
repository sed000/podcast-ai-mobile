import React from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Text } from './ui/text'
import { Alert, View } from 'react-native'
import ConfirmDialog from './ConfirmDialog'
export default function DeleteDialog() {
    function handleDeleteAccount() {
        Alert.alert('Account Deleted', 'Your account has been deleted.')
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant='destructive' size='lg' className='rounded-full'>
            <Text>Delete Account</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className='w-fit'>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
             <View className='flex flex-col justify-start gap-4'>
                <Text>Are you sure you want to delete your account?</Text>
                <ConfirmDialog />
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