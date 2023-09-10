import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../api/UserInfo';

export function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorString, setErrorString] = useState('');

  function handleUsernameChange(username) {
    setUsername(username);
  }

  function handlePasswordChange(password) {
    setPassword(password);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
    login(username, password)
      .then((user) => {
        console.log(user);
        props.onLogin(username);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorString('Invalid username or password.');
        setLoginError(true);
      });
    } catch(error) {
        console.error('Error:', error);
        setErrorString('Invalid username or password.');
        setLoginError(true);
    }
  }

  function handleCloseError() {
    setLoginError(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={handleUsernameChange}
        placeholder="Enter username..."
        required
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Enter password..."
        secureTextEntry={true}
        required
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      {loginError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorString}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseError}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    color: 'blue',
    marginTop: 20,
  },
  errorBox: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'red',
  },
});