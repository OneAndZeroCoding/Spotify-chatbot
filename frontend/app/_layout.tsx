// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = 'https://your-backend-url.com'; // UPDATE THIS!

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // const authToken = await AsyncStorage.getItem('jinxbot_auth_token');
      const authToken = null; // Replace with actual token check

      console.log('Checking auth status, token:', authToken ? 'exists' : 'none');

      if (authToken) {
        setIsAuthenticated(true);
        router.replace('/(tabs)');
      } else {
        setIsAuthenticated(false);
        router.replace('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      router.replace('/login');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <ScrollView
        contentContainerStyle={styles.loadingContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loadingContent}>
          <Text style={styles.loadingLogo}>🤖</Text>
          <Text style={styles.loadingTitle}>JinxBot</Text>
          <ActivityIndicator size="large" color="#1DB954" style={styles.spinner} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ScrollView>
    );
  }

  // Main Stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flexGrow: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingLogo: {
    fontSize: 60,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 32,
    textAlign: 'center',
  },
  spinner: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
});
