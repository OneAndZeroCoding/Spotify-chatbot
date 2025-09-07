import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Make LinearGradient animatable
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function EndingScreen() {
  const handleGoBack = () => {
    router.back();
  };

  // Animation value
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animation]);

  // Interpolated colors (Spotify green theme)
  const color1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1DB954', '#1ed760'], // bright greens
  });

  const color2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0a0a0a', '#1a1a1a'], // dark fade
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Half */}
      <View style={styles.topHalf}>
        {/* Header */}
        <View style={styles.header}>
          {/* Invisible placeholder */}
          <View style={styles.iconPlaceholder} />

          {/* Centered Title */}
          <Text style={styles.title}>JinxBot</Text>

          {/* Right User Icon */}
          <TouchableOpacity style={styles.userIcon} onPress={handleGoBack}>
            <Ionicons name="person-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Success Messages */}
        <View style={styles.mainContent}>
          <Text style={styles.successMessage}>✅ Playlist Created!</Text>
          <Text style={styles.subMessage}>Check your Spotify now 🎶</Text>
        </View>
      </View>

      {/* Bottom Half (Animated Gradient) */}
      <AnimatedLinearGradient
        colors={[color1 as any, color2 as any]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomHalf}
      >
        <Text style={styles.footerText}>
          Thanks for using JinxBot{'\n'}Your AI playlist companion
        </Text>
      </AnimatedLinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  topHalf: { flex: 1, padding: 20 },
  bottomHalf: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  iconPlaceholder: {
    width: 35,
    height: 35,
    opacity: 0,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  successMessage: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1DB954',
    textAlign: 'center',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
  },
});
