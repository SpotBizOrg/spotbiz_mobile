import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const validateInputs = () => {
    if (!userName || !password) {
      Alert.alert('Error', 'Please fill in both username and password.');
      return false;
    }
    return true;
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
        body: JSON.stringify({ userName, password }),
      });
      const data = await response.json();

      if (response.ok) {
        if (data.role === 'CUSTOMER') {
          navigation.navigate('Game');
        } else {
          Alert.alert('Error', 'You are not authorized to access this page.');
        }
      } else {
        Alert.alert('Error', data.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/images/headerImageLogIn.jpg')}
          style={styles.headerImage}
        />
      </Animated.View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#6b7280"
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#6b7280"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.showPasswordButton}>
                <Image
                  source={{ uri: 'https://placehold.co/20x20' }}
                  style={styles.showPasswordIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            <Text style={styles.loginButtonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signUpText}>
          Don’t have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    height: 350,
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
    backgroundColor: '#fff',
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
    marginTop: 15,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: '#111827',
    backgroundColor: '#f9fafb',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  passwordContainer: {
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 10,
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
    color: '#0D3B66',
    textDecorationLine: 'underline',
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
    color: '#6b7280',
    marginTop: 20,
    fontFamily: 'Poppins',
  },
  signUpLink: {
    color: '#0D3B66',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
});

export default LoginScreen;
