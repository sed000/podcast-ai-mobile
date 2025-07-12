import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Progress } from './ui/progress';
import { Text } from './ui/text';

interface LoadingSpinnerProps {
  prompt: string;
}

export default function LoadingSpinner({ prompt }: LoadingSpinnerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          return 95; 
        }
        return prev + Math.random() * 5; 
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mx-4 mb-6 p-4 bg-muted rounded-lg">
      <Text className="text-lg font-medium mb-2">
        Generating your podcast...
      </Text>
      <Text className="text-sm text-muted-foreground mb-4">
        "{prompt}"
      </Text>
      <Progress value={progress} className="mb-2" />
      <Text className="text-xs text-muted-foreground">
        This may take a few minutes. Please wait...
      </Text>
    </View>
  );
} 