import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

export default function MainScreen() {
  const [url, setUrl] = useState('');

  const handleCreatePlaylist = () => {
    router.push('/ending');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header with JinxBot title and account icon */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.title}>JinxBot</Text>
          <TouchableOpacity style={styles.userIcon}>
            <Text style={styles.userIconText}>👤</Text>
          </TouchableOpacity>
        </View>
        
        {/* Main content in the middle */}
        <View style={styles.mainContent}>
          <Text style={styles.inputLabel}>Paste URL</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={setUrl}
            placeholder="URL"
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleCreatePlaylist}
          >
            <Text style={styles.buttonText}>Create Playlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  headerSpacer: {
    width: 30, // Same width as user icon for centering
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    // Drop shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Drop shadow for Android
    elevation: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    // Drop shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Drop shadow for Android
    elevation: 5,
  },
  buttonText: {
    color: '#2c2c2c',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});