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

  // Interpolated colors
  const color1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#B22222', '#FF4500'], // deep red → orange-red
  });

  const color2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#8B0000', '#B22222'], // dark red → medium red
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Half */}
      <View style={styles.topHalf}>
        {/* Header */}
        <View style={styles.header}>
          {/* Invisible placeholder (same size as icon) */}
          <View style={styles.iconPlaceholder} />

          {/* Centered Title */}
          <Text style={styles.title}>JinxBot</Text>

          {/* Right User Icon */}
          <TouchableOpacity style={styles.userIcon} onPress={handleGoBack}>
            <Ionicons name="person-circle-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Success Messages */}
        <View style={styles.mainContent}>
          <Text style={styles.successMessage}>Playlist Created!!!</Text>
          <Text style={styles.successMessage}>Check your Spotify.</Text>
        </View>
      </View>

      {/* Bottom Half (Animated Diagonal Gradient) */}
      <AnimatedLinearGradient
        colors={[color1 as any, color2 as any]} // cast for TS
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomHalf}
      >
        <Text style={styles.footerText}>
          Thanks for using our{'\n'}product.
        </Text>
      </AnimatedLinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
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
    shadowOpacity: 0.2,
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
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
  },
  iconPlaceholder: {
    width: 35, // same as userIcon
    height: 35,
    opacity: 0, // invisible but keeps spacing
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userIconText: { fontSize: 18 },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  successMessage: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
});
