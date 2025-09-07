// app/main.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

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

export default function MainScreen() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePlaylist = async () => {
    if (!url.trim()) {
      Alert.alert('Missing URL', 'Please paste a URL before continuing.');
      return;
    }
    setIsLoading(true);

    try {
      // Demo: simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // ✅ Navigate to EndingScreen
      router.push('/ending');
      setUrl('');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appTitle}>JinxBot</Text>
            <Text style={styles.subtitle}>
              Paste a song, playlist, or link to create your AI-powered Spotify playlist
            </Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="Paste your link here..."
              placeholderTextColor="#666"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.createButton, isLoading && styles.buttonDisabled]}
              onPress={handleCreatePlaylist}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={styles.loadingText}>Creating...</Text>
                </View>
              ) : (
                <Text style={styles.createButtonText}>Create Playlist</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* How it works */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>How it works</Text>
            <View style={styles.featureGrid}>
              <FeatureCard
                icon="💬"
                title="Describe"
                subtitle='Type "lofi beats for focus"'
              />
              <FeatureCard
                icon="🔗"
                title="Paste Link"
                subtitle="YouTube or SoundCloud"
              />
              <FeatureCard
                icon="✨"
                title="Generate"
                subtitle="AI builds your playlist"
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              🎶 JinxBot uses AI magic to craft your perfect playlist
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
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#a0a0a0',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  inputSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
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
  createButtonText: {
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
    margin: 6,
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
