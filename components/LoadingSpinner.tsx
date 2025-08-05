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
    <View className="bg-primary/5 rounded-3xl p-6 border border-primary/20">
      <View className="flex-row items-center gap-4 mb-4">
        <View className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Text className="text-2xl">✨</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold text-foreground mb-1">
            Creating your podcast...
          </Text>
          <Text className="text-sm text-muted-foreground">
            We are working on it...
          </Text>
        </View>
      </View>
      
      <View className="bg-background rounded-2xl p-4 mb-4 border border-border">
        <Text className="text-sm text-muted-foreground mb-2 font-medium">
          Your prompt:
        </Text>
        <Text className="text-base text-foreground italic">
          "{prompt}"
        </Text>
      </View>
      
      <Progress value={progress} className="mb-4 h-3 bg-background" />
      
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-muted-foreground">
          Progress: {Math.round(progress)}%
        </Text>
        <Text className="text-sm text-muted-foreground">
          ⏱️ This may take 2-3 minutes
        </Text>
      </View>
    </View>
  );
} 