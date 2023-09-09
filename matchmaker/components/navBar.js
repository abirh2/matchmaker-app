import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NavigationBar = (props) => {
  const { isLoggedIn, currentUser, handleLogout, handleNavigation } = props;
  return (
    <View style={styles.navBar}>
      <View style={styles.logo}>
        <Image source={require('../assets/logo.png')} style={styles.logoImg} />
      </View>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => handleNavigation('home')}>
          <Text style={styles.navLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('about')}>
          <Text style={styles.navLink}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('recycling info')}>
          <Text style={styles.navLink}>Recycling Info</Text>
        </TouchableOpacity>
        {isLoggedIn ? (
          <>
            <TouchableOpacity onPress={() => handleNavigation('favorites')}>
              <Text style={styles.navLink}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('leaderboard')}>
              <Text style={styles.navLink}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('user')}>
              <View style={styles.userButton}>
                <Image source={require('../assets/user-icon.png')} style={styles.userIcon} />
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
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    height: 80,
    paddingTop: 20,
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
    color: '#fff',
    fontSize: 16,
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

export default NavigationBar;