import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import checkTokenValidity from '../utils/checkTokenValidity';
import removeToken from '../utils/removeToken';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { isValid, userDetails } = await checkTokenValidity();
      setIsLoggedIn(isValid);
      setUserDetails(userDetails);
    };

    checkSession();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const goToGames = () => {
    navigation.navigate('GameGallery');
  };

  const handleProfilePress = () => {
    toggleMenu();
  };

  const handleLogoutPress = async () => {
    await removeToken();
    toggleMenu();
    navigation.navigate('Login');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleBackgroundPress = () => {
    if (isMenuVisible) {
      setMenuVisible(false);
    }
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchResult', { query: searchText });
  };

  const categories = [
    { name: 'Stationery', image: require('../../assets/icons/stationery-icon.png') },
    { name: 'Hotels', image: require('../../assets/icons/hotel-icon.png') },
    { name: 'Computer\nShops', image: require('../../assets/icons/computer-icon.png') },
    { name: 'Food', image: require('../../assets/icons/food-icon.png') },
    { name: 'Electronic\nShops', image: require('../../assets/icons/electronic-icon.png') },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D3B66" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground source={require('../../assets/images/bannerImage.png')} style={styles.bannerImage} />
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <View style={styles.nav}>
              {isLoggedIn ? (
                <>
                  <TouchableOpacity style={styles.gameButton} onPress={goToGames}>
                    <Image source={require('../../assets/icons/game-icon.png')} style={styles.gameIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.notificationButton}>
                    <Image source={require('../../assets/icons/notification-icon.png')} style={styles.notificationIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profileButton} onPress={toggleMenu}>
                    <Image source={require('../../assets/icons/profile-icon.jpg')} style={styles.profileImage} />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {isMenuVisible && (
            <View style={styles.menuContainer} pointerEvents="box-none">
              <TouchableOpacity style={styles.menuBackdrop} onPress={toggleMenu}>
                <View style={styles.menu} pointerEvents="box-none">
                  <TouchableOpacity style={styles.menuButton} onPress={handleProfilePress}>
                    <Text style={styles.menuButtonText}>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuButton} onPress={handleLogoutPress}>
                    <Text style={styles.menuButtonText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Find what you need, Where you need it!</Text>
          <Text style={styles.bannerSubtitle}>Search for local Businesses tailored to your preferences</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="What are you looking for"
              placeholderTextColor="#605B49"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={handleSearchPress}>
              <Image source={require('../../assets/icons/search-icon.png')} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.grid}>
        {categories.map((category) => (
          <View key={category.name} style={styles.gridItem}>
            <Image source={category.image} style={styles.gridImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.infoText}>Discover latest offers and win vouchers in Sri Lankan shops being at your comfort zones</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to Find a Shop and their offers at SpotBiz?</Text>
        <View style={styles.cardContent}>
          <Text>• Go to SpotBiz website or download the SpotBiz mobile app</Text>
          <Text>• Find the shop by searching</Text>
          <Text>• Get updated about their latest offers and discounts</Text>
          <Text>• Play games and earn points</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to Register your Business at SpotBiz?</Text>
        <View style={styles.cardContent}>
          <Text>• Go to SpotBiz website or download the SpotBiz mobile app</Text>
          <Text>• Register your shop at the relevant category</Text>
          <Text>• Publish your latest offers and discounts</Text>
          <Text>• Buy packages for more services</Text>
          <Text>• Boost your business at SpotBiz</Text>
        </View>
      </View>
      <Text style={styles.recommendationsTitle}>Recommendations</Text>
      <View style={styles.recommendationsGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.recommendationItem}></View>
        ))}
      </View>
      <Text style={styles.contactTitle}>Contact Us</Text>
      <View style={styles.contactBorder}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#00000000',
  },
  header: {
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
  signInButton: {
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#0D3B66',
    paddingVertical: 10,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  gameButton: {
    padding: 5,
  },
  gameIcon: {
    width: 20,
    height: 20,
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
  banner: {
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: height * 0.6,
    resizeMode: 'cover',
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: '#000000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  gridItem: {
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 5,
    width: '30%',
  },
  gridImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoryName: {
    color: '#000000',
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: '#6b7280',
    marginVertical: 16,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    width: '90%',
    borderRadius: 8,
    marginVertical: 8,
    alignSelf: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    paddingLeft: 16,
  },
  recommendationsTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  recommendationsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  recommendationItem: {
    backgroundColor: '#d1d5db',
    width: '45%',
    height: 100,
    borderRadius: 8,
    marginVertical: 8,
  },
  contactTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  contactBorder: {
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    marginVertical: 8,
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
});

export default HomeScreen;
