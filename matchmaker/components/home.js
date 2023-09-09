import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { TextInput, TouchableOpacity} from 'react-native';

export function Home(props) {
  const handleSubmit = () => {
    props.handleNavigation('list-bins')
  };

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome to Matchmaker</Text>
        <Text style={styles.subheading}>Using RI™ instead of AI for all your matchmaking needs.</Text>
      </View>
      <View style={styles.formContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter location here..."
        /> */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Find my soulmate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});