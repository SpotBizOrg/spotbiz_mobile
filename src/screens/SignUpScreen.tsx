import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/images/headerImageSignUp.jpg')}
          style={styles.headerImage}
        />
      </Animated.View>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor="#6b7280"
              style={styles.input}
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
              />
              <TouchableOpacity style={styles.showPasswordButton}>
                <Image
                  source={{ uri: 'https://placehold.co/20x20' }}
                  style={styles.showPasswordIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
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
    height: 380,
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
  signupButton: {
    backgroundColor: '#0D3B66',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  loginText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  loginLink: {
    color: '#0D3B66',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
});

export default SignUpScreen;