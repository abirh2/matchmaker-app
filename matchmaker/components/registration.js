import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUser, checkUsernameExists, checkEmailExists } from '../api/UserInfo';

function Registration() {
    // Variables for user credentials
    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const contributions = 0;
    const favorites = [];
 
    // Variables for errors 
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [errorExists, setErrorExists] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    function handleNameChange(name) {
        setFullName(name);
    }

    function handleEmailChange(email) {
        setEmail(email);
    }

    function handleUsernameChange(username) {
        setUsername(username);
    }

    function handlePasswordChange(password) {
        setPassword(password);
    }

    function handleCloseSuccess() {
        setShowSuccessMessage(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        // Validate input fields
        let valid = true;
    
        if (name.length === 0) {
            setFullNameError('Please enter your full name');
            setRegistrationError(fullNameError);
            valid = false;
        } else {
            setFullNameError('');
        }
    
        // const emailExists = await checkEmailExists(email);
        // if (!isValidEmail(email)) {
        //     setEmailError('Please enter a valid email address');
        //     setRegistrationError(emailError);
        //     valid = false;
        // } else if (emailExists) {
        //     setEmailError('Email address already exists');
        //     setRegistrationError(emailError);
        //     valid = false;
        // } else {
        //     setEmailError('');
        // }

        // const usernameExists = await checkUsernameExists(username);
        // if (usernameExists) {
        //     setUsernameError('Username already exists');
        //     setRegistrationError(usernameError);
        //     valid = false;
        // } else {
        //     setUsernameError('');
        // }
    
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            setRegistrationError(passwordError);
            valid = false;
        } else {
            setPasswordError('');
        }

        if (registrationError.localeCompare('') != 0) {
            setErrorExists(true);
        }
    
        // If all fields are valid, send a POST request to the server to create a new user
        if (valid) {
            const newUser = {
                name,
                email,
                username,
                password,
            };
            setFullName('');
            setEmail('');
            setUsername('');
            setPassword('');
    
            createUser(newUser)
                .then(response => {
                    setShowSuccessMessage('true');
                    console.log(response); // success message or redirect to login page
                })
                .catch(error => {
                    alert(error); // error message
                });
            }
    };
        
    function handleCloseError() {
        setErrorExists(false);
      }

    const isValidEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Create an Account</Text>
        <Text style={styles.label}>Full name:</Text>
        <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            placeholder="Enter name.."
            required
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter email address..."
            required
        />
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
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {errorExists && (
            <View style={styles.errorBox}>
            <Text style={styles.errorText}>{registrationError}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseError}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            </View>
        )}
        {showSuccessMessage && (
            <View style={styles.successBox}>
            <Text style={styles.successText}>Account successfully created. You may now log in.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseSuccess}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );

}

export default Registration;

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
    successBox: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    successText: {
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