import React, {useEffect} from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigation.reset({
        index: 0,
        routes: [{name: 'Home' as never}],
      });
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <ActivityIndicator
          size="large"
          color="#0D3B66"
          style={styles.spinner}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  spinner: {
    marginTop: 20,
  },
});

export default SplashScreen;
