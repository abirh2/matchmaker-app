import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Home } from './components/home';
import { About } from './components/about';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import logo from './assets/logo.png';

export default function App() {
  const handleSubmit = () => {
    // handle submit logic
  };

  // Set variables and functions to see if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [location, setSearchedLocation] = useState(''); 

  // Set variables to see what page is user on
  const [page, setPage] = useState('home');
  const [otherProps, setOtherProps] = useState(null);

  function handleLogin(username) {
    setIsLoggedIn(true);
    setCurrentUser(username);
    setPage('home');
    setShowSuccessMessage(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setPage('home');
    setShowSuccessMessage(false);
  }

  const handleNavigation = (newPage, otherProps) => {
    setPage(newPage);
    setOtherProps(otherProps);
  }
  let content = null;
  if (page === 'home') {
    content = <Home handleNavigation={handleNavigation} location={location} setSearchedLocation={setSearchedLocation} />
  } else if (page === 'about') {
    content = <About />
  }

  return (
    <View>
      {/* <NavigationBar /> */}
      <View style={styles.navBar}>
      <View style={styles.logo}>
        <Image source={logo} style={styles.logoImg} />
      </View>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => handleNavigation('home')}>
          <Text style={styles.navLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('about')}>
          <Text style={styles.navLink}>About</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleNavigation('recycling info')}>
          <Text style={styles.navLink}>Recycling Info</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => handleNavigation('bin-test-info')}>
          <Text style={styles.navLink}>Test Bins</Text>
        </TouchableOpacity> */}
        {isLoggedIn ? (
          <>
            {/* <TouchableOpacity onPress={() => handleNavigation('favorites')}>
              <Text style={styles.navLink}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('leaderboard')}>
              <Text style={styles.navLink}>Leaderboard</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => handleNavigation('user')}>
              <View style={styles.userButton}>
                <Image source={userIcon} style={styles.userIcon} />
                <Text style={styles.navLink}>{currentUser}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.navLink}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => handleNavigation('login')}>
              <Text style={styles.navLink}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('registration')}>
              <Text style={styles.navLink}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
      {/* <Home /> */}
      {content}
    
    <NavigationContainer>
    {/* <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: ''}}
      />
      <Stack.Screen name="ListBins" component={ListBins} options={{title: ''}}/>
      <Stack.Screen name="BinInfo" component={RecyclingLocationDetails} options={{title: ''}} />
    </Stack.Navigator> */}
  </NavigationContainer>

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
    fontSize: 18,
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
    backgroundColor: 'green',
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
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 80,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
  },
  logoImg: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  navLinks: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  navLink: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
});
