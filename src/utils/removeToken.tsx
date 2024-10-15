import AsyncStorage from '@react-native-async-storage/async-storage';

const removeToken = async () => {
  try {
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    console.log(storedUserDetails);
    if (storedUserDetails) {
      await AsyncStorage.removeItem('userDetails');
    }
    return { isRemoved: true };
  } catch (error) {
    console.error('Failed to remove token', error);
    return { isRemoved: false };
  }
};

export default removeToken;
