import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export function About()  {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.aboutSection}>
        <Text style={styles.heading}>About Matchmaker™</Text>
        <Text style={styles.description}>
          Welcome to Matchmaker™, the future of matchmaking! We revolutionize the matchmaking industry by harnessing the power of human input, trademarked as RI™ (Real Intelligence), to connect people. Say goodbye to soulless AI algorithms and experience the most innovative and personalized matchmaking ever.
        </Text>
      </View>

      <View style={styles.creatorSection}>
        <Text style={styles.heading}>Meet the Creators</Text>
        
        <View style={styles.creator}>
          <Image
            source={require('../assets/logo.png')} // Replace with the actual image source
            style={styles.creatorImage}
          />
          <Text style={styles.creatorName}>Abir Hossain</Text>
        </View>

        <View style={styles.creator}>
          <Image
            source={require('../assets/logo.png')} // Replace with the actual image source
            style={styles.creatorImage}
          />
          <Text style={styles.creatorName}>Claire Liu</Text>
        </View>

        <View style={styles.creator}>
          <Image
            source={require('../assets/logo.png')} // Replace with the actual image source
            style={styles.creatorImage}
          />
          <Text style={styles.creatorName}>Jake Donnini</Text>
        </View>

        <View style={styles.creator}>
          <Image
            source={require('../assets/logo.png')} // Replace with the actual image source
            style={styles.creatorImage}
          />
          <Text style={styles.creatorName}>Jessi Jha</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  aboutSection: {
    marginBottom: 20,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  creatorSection: {
    marginBottom: 100,
  },
  creator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  creatorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  creatorName: {
    fontSize: 18,
    marginTop: 10,
  },
});

// export default About;
