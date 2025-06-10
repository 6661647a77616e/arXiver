import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'arXiv Mobile',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
