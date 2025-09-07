// app/login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

function FeatureCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{title}</Text>
      <Text style={styles.featureSubtext}>{subtitle}</Text>
    </View>
  );
}

export default function JinxBotLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSpotifyLogin = async () => {
    setIsLoading(true);
    try {
      // Demo delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Demo Mode',
        'This is a demo version. In production, this would connect to Spotify.',
        [
          {
            text: 'Continue to App',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* App Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>🤖</Text>
            </View>
            <Text style={styles.appTitle}>JinxBot</Text>
            <Text style={styles.tagline}>AI-Powered Playlist Generator</Text>
            <Text style={styles.subtitle}>
              Transform songs, links, or text into perfect Spotify playlists instantly
            </Text>
          </View>

          {/* Authentication Section */}
          <View style={styles.authSection}>
            <View style={styles.spotifyIconContainer}>
              <Text style={styles.spotifyIcon}>♫</Text>
            </View>
            <Text style={styles.authTitle}>Connect Your Spotify</Text>
            <Text style={styles.authDescription}>
              Link your Spotify account to start creating personalized playlists
            </Text>

            <TouchableOpacity
              style={[styles.spotifyButton, isLoading && styles.buttonDisabled]}
              onPress={handleSpotifyLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={styles.loadingText}>Connecting...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.spotifyButtonIcon}>♫</Text>
                  <Text style={styles.spotifyButtonText}>Continue with Spotify</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.privacyNotice}>
              <Text style={styles.privacyText}>
                🔒 We only access playlist creation permissions.{'\n'}
                Your music library and personal data remain private.
              </Text>
            </View>
          </View>

          {/* Features Preview */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>What you can create:</Text>
            <View style={styles.featureGrid}>
              <FeatureCard
                icon="💬"
                title="Text to Playlist"
                subtitle='"Chill indie rock for studying"'
              />
              <FeatureCard
                icon="🔗"
                title="Link Collections"
                subtitle="YouTube, SoundCloud URLs"
              />
              <FeatureCard
                icon="🎵"
                title="Song Lists"
                subtitle="Artist - Song format"
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Powered by AI • Made for music lovers
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#1DB954',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 40,
    color: 'white',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#1DB954',
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#a0a0a0',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  authSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  spotifyIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#1DB954',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  spotifyIcon: {
    fontSize: 30,
    color: 'white',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  authDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#a0a0a0',
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#404040',
    shadowOpacity: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotifyButtonIcon: {
    fontSize: 20,
    color: 'white',
    marginRight: 12,
  },
  spotifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  privacyNotice: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    maxWidth: 320,
  },
  privacyText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#888888',
    lineHeight: 18,
  },
  featuresSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    margin: 6, // replaces gap
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureSubtext: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});
