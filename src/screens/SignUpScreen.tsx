import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNo = (phoneNo) => {
    const phoneNoRegex = /^(?:\d{10}|\+94\d{9})$/;
    return phoneNoRegex.test(phoneNo);
  };

  const validateInputs = () => {
    let valid = true;

    if (!name) {
      setNameError('Name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!phoneNo) {
      setPhoneNoError('Phone number is required.');
      valid = false;
    } else if (!validatePhoneNo(phoneNo)) {
      setPhoneNoError('Please enter a valid phone number.');
      valid = false;
    } else {
      setPhoneNoError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleRegistration = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    const data = {
      name,
      email,
      phoneNo,
      password,
      role: 'CUSTOMER',
      status: 'PENDING'
    };

    const requestBody = JSON.stringify(data);

    try {
      const response = await fetch('http://10.0.2.2:8080/api/v1/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (response.status === 200) {
        setAlertType('success');
        setAlertTitle('Registration Successful');
        setAlertMessage(`A confirmation email has been sent to \n${email}.\nPlease confirm your email to login.`);
        setAlertVisible(true);
      } else if (response.status === 409) {
        setAlertType('notice');
        setAlertTitle('Notice');
        setAlertMessage('User already exists.');
        setAlertVisible(true);
      } else {
        setAlertType('error');
        setAlertTitle('Error');
        setAlertMessage(responseData.message || 'Something went wrong.');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error');
      setAlertMessage('Failed to register. Please try again.');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/headerImageSignUp.jpg')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Create Your Account</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputWrapper}>
              <Image source={require('../../assets/icons/user-icon.png')} style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#374151"
                style={styles.input}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) validateInputs();
                }}
                autoCapitalize="none"
              />
            </View>
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Image source={require('../../assets/icons/email-icon.png')} style={styles.inputIcon} />
              <TextInput
                placeholder="sample@example.com"
                placeholderTextColor="#374151"
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateInputs();
                }}
                autoCapitalize="none"
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputWrapper}>
              <Image source={require('../../assets/icons/phone-icon.png')} style={styles.inputIcon} />
              <TextInput
                placeholder="+94X XXX XXXX"
                placeholderTextColor="#374151"
                style={styles.input}
                value={phoneNo}
                onChangeText={(text) => {
                  setPhoneNo(text);
                  if (phoneNoError) validateInputs();
                }}
                autoCapitalize="none"
              />
            </View>
            {phoneNoError ? <Text style={styles.errorText}>{phoneNoError}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <View style={styles.inputWrapper}>
                <Image source={require('../../assets/icons/password-icon.png')} style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter new strong password"
                  placeholderTextColor="#374151"
                  secureTextEntry={!isPasswordVisible}
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validateInputs();
                  }}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity style={styles.showPasswordButton} onPress={togglePasswordVisibility}>
                <Image
                  source={
                    isPasswordVisible
                      ? require('../../assets/icons/hide-icon.png')
                      : require('../../assets/icons/view-icon.png')
                  }
                  style={styles.showPasswordIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={handleRegistration} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
          </TouchableOpacity>
        </View>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
        </Text>
      </View>
      <CustomAlert
        visible={alertVisible}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => {
          setAlertVisible(false);
          if (alertType === 'success') {
            navigation.navigate('Login');
          }
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    height: 400,
    backgroundColor: '#FFA726',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  signupContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginTop: 25,
    marginBottom: 25,
    fontFamily: 'Poppins',
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  label: {
    color: '#0D3B66',
    marginBottom: 8,
    marginLeft: 3,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
    tintColor: '#374151',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#111827',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    marginRight: 10,
  },
  showPasswordIcon: {
    width: 20,
    height: 20,
  },
  signupButton: {
    backgroundColor: '#0D3B66',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  loginText: {
    textAlign: 'center',
    color: '#000000',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  loginLink: {
    color: '#0D3B66',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins',
  },
});

export default SignUpScreen;
