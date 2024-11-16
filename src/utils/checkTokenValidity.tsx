import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const checkTokenValidity = async () => {
  try {
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    console.log(storedUserDetails);
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      const token = userDetails.token;
      console.log(token);
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          return {isValid: true, userDetails};
        } else {
          await AsyncStorage.removeItem('userDetails');
          return {isValid: false};
        }
      }
    }
    return {isValid: false};
  } catch (error) {
    console.error('Failed to check token validity', error);
    return {isValid: false};
  }
};

export default checkTokenValidity;
