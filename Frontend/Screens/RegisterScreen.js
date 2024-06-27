import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Regular expressions for validations
  const nameSurnameRegex = /^[a-zA-Z]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    // Check if terms and conditions are accepted
    if (!acceptTerms) {
      Alert.alert('Please accept the terms and conditions');
      return;
    }

    // Validate name
    if (!nameSurnameRegex.test(name)) {
      Alert.alert('Name should be at least 3 characters long and contain only letters');
      return;
    }

    // Validate surname
    if (!nameSurnameRegex.test(surname)) {
      Alert.alert('Surname should be at least 3 characters long and contain only letters');
      return;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Determine base URL
    const baseURL = Platform.select({
      ios: 'http://192.168.0.2:8000',
      android: 'http://192.168.0.2:8000',
      default: 'http://192.168.0.2:8000'
    });

    try {
      const response = await axios.post(`${baseURL}/api/users/`, {
        name,
        surname,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('User registered successfully');
        navigation.navigate('Login');  // Navigate to Login screen
      } else {
        Alert.alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while registering');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inner}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={styles.checkboxContainer}>
            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
              <View style={styles.checkbox}>
                {showPassword && <MaterialIcons name="check-box" size={20} color="#6200ea" />}
                {!showPassword && <MaterialIcons name="check-box-outline-blank" size={20} color="#6200ea" />}
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.checkboxLabel}>Show Password</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableWithoutFeedback onPress={() => setAcceptTerms(!acceptTerms)}>
              <View style={styles.checkbox}>
                {acceptTerms && <MaterialIcons name="check-box" size={20} color="#6200ea" />}
                {!acceptTerms && <MaterialIcons name="check-box-outline-blank" size={20} color="#6200ea" />}
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.checkboxLabel}>I accept the Terms and Conditions</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonTextSecondary}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#6200ea',
    padding: 3,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#6200ea',
  },
  buttonTextSecondary: {
    color: '#6200ea',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
