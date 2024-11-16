import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import checkTokenValidity from '../utils/checkTokenValidity';
import removeToken from '../utils/removeToken';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  HomeScreen: undefined;
  QRCodeScannerPage: undefined;
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const {width, height} = Dimensions.get('window');

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {isValid, userDetails} = await checkTokenValidity();
      setIsLoggedIn(isValid);
      setUserDetails(userDetails);
    };

    checkSession();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogoutPress = async () => {
    await removeToken();
    toggleMenu();
    navigation.navigate('Login');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D3B66" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <View style={styles.nav}>
            <TouchableOpacity style={styles.notificationButton}>
              <Image
                source={require('../../assets/icons/notification-icon.png')}
                style={styles.notificationIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={toggleMenu}>
              <Image
                source={require('../../assets/business_logos/abans.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isMenuVisible && (
          <View style={styles.menuContainer} pointerEvents="box-none">
            <TouchableOpacity style={styles.menuBackdrop} onPress={toggleMenu}>
              <View style={styles.menu} pointerEvents="box-none">
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={handleLogoutPress}>
                  <Text style={styles.menuButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.detailsContainer}>
          <Image
            source={require('../../assets/business_logos/abans.png')}
            style={styles.businessImage}
          />
          <View style={styles.detailTexts}>
            <Text style={styles.businessNameText}>Abans</Text>
            <Text style={styles.subscriberCountText}>Subscribers: 10</Text>
            <Text style={styles.clickCountText}>Click Count: 25</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            We offer a diverse range of high-quality electronic items, including
            home appliances, personal gadgets, and entertainment systems, backed
            by exceptional customer service and after-sales support, ensuring a
            seamless and satisfying shopping experience for all our customers.
          </Text>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.specialText}>
            Want to manage and customize your business settings more? Visit our
            <Text style={styles.highlightText}> SpotBiz </Text>
            website for more details:
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('http://10.0.2.2:5173/')}>
            <Text style={styles.websiteUrlText}>SpotBiz Website</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>
            Scan QR code to check coupon validity
          </Text>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => navigation.navigate('QRCodeScannerPage')}>
            <Text style={styles.qrButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© SpotBiz International Ltd. 2024</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 43,
    width: 140,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 5,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  profileButton: {
    paddingHorizontal: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  businessImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailTexts: {
    marginLeft: 20,
  },
  businessNameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subscriberCountText: {
    fontSize: 16,
    color: '#333',
  },
  clickCountText: {
    fontSize: 16,
    color: '#333',
  },
  descriptionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 150,
  },
  menuBackdrop: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 0,
    zIndex: 10,
    paddingBottom: 10,
  },
  menuButton: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  menuButtonText: {
    fontSize: 16,
    color: '#000',
  },
  noteContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
  },
  specialText: {
    fontSize: 18,
    color: '#0D3B66',
    marginBottom: 10,
  },
  websiteUrlText: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
  },
  highlightText: {
    fontSize: 18,
    color: '#0D3B66',
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  qrText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  qrButton: {
    backgroundColor: '#0D3B66',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;

// onPress={() => navigation.navigate('QRCodeScannerPage')}
