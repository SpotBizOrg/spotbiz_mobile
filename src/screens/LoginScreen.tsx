import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import type {RootStackParamList} from '../types';
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.role === 'CUSTOMER') {
          if (data.status === 'PENDING') {
            setAlertType('notice');
            setAlertTitle('Email Verification');
            setAlertMessage(`Please verify the email sent to ${data.email}.`);
            setAlertVisible(true);
          } else if (data.status === 'APPROVED') {
            await AsyncStorage.setItem('userDetails', JSON.stringify(data));
            navigation.navigate('Home');
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }
        } else if (data.role === 'BUSINESS_OWNER' || data.role === 'ADMIN') {
          if (data.status === 'PENDING') {
            setAlertType('notice');
            setAlertTitle('Business Verification');
            setAlertMessage(
              `Please wait until our admin verify your business.`,
            );
            setAlertVisible(true);
          } else if (data.status === 'APPROVED') {
            await AsyncStorage.setItem('userDetails', JSON.stringify(data));
            navigation.navigate('BusinessHome');
            navigation.reset({
              index: 0,
              routes: [{name: 'BusinessHome'}],
            });
          }
        } else {
          setAlertType('error');
          setAlertTitle('Error');
          setAlertMessage('You are not authorized to access this page.');
          setAlertVisible(true);
        }
      } else if (response.status === 404) {
        setAlertType('error');
        setAlertTitle('Error');
        setAlertMessage('User not found!');
        setAlertVisible(true);
      } else if (response.status === 401) {
        setAlertType('error');
        setAlertTitle('Error');
        setAlertMessage('Invalid credentials!');
        setAlertVisible(true);
      } else {
        setAlertType('error');
        setAlertTitle('Error');
        setAlertMessage('Something went wrong!');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error');
      setAlertMessage('Failed to login. Please try again.');
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
          source={require('../../assets/images/headerImageLogIn.jpg')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/icons/email-icon.png')}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#374151"
              style={styles.input}
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) validateInputs();
              }}
              autoCapitalize="none"
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/icons/password-icon.png')}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="XXXXX"
              placeholderTextColor="#374151"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (passwordError) validateInputs();
              }}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={togglePasswordVisibility}>
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
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}>
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signUpText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
      </View>
      <CustomAlert
        visible={alertVisible}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
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
    height: 370,
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
  loginContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    transform: [{translateY: -10}],
    marginRight: 10,
  },
  showPasswordIcon: {
    width: 20,
    height: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPassword: {
    color: '#000000',
    fontFamily: 'Poppins',
  },
  loginButton: {
    backgroundColor: '#0D3B66',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  signUpText: {
    textAlign: 'center',
    color: '#000000',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  signUpLink: {
    color: '#0D3B66',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: 'Poppins',
  },
});

export default LoginScreen;
