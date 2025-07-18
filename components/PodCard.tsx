import { Alert, View } from 'react-native'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Text as TextUI } from './ui/text'
import { Button } from './ui/button'
import { api } from '../convex/_generated/api'
import { useMutation } from 'convex/react'

interface PodCardProps {
  title: string
  description: string   
  podcastId: string
}

export default function PodCard({ title, description, podcastId }: PodCardProps) {
  const deletePodcast = useMutation(api.database.deletePodcast);
  const confirmDelete = () => {
    Alert.alert('Delete Podcast', 'Are you sure you want to delete this podcast?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deletePodcast({ podcastId: podcastId }) }
    ])
  }
  return (
    <View>
    <Card className='w-full rounded-2xl'>
      <CardHeader>
        <CardTitle>
          <TextUI className='text-2xl font-bold'>{title}</TextUI>
        </CardTitle>
        <CardDescription>
          <TextUI className='text-lg font-medium'>{description}</TextUI>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-start justify-start">
        <Button variant='default' size='lg' className='rounded-md'>
          <TextUI>Listen</TextUI>
        </Button>
        <Button variant='secondary' size='lg' className='rounded-md' onPress={confirmDelete}>
          <TextUI>Delete</TextUI>
        </Button>
      </CardContent>
    </Card>
  </View>
  )
}