import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import checkTokenValidity from '../utils/checkTokenValidity';
import removeToken from '../utils/removeToken';

const {width, height} = Dimensions.get('window');

import {NavigationProp, RouteProp} from '@react-navigation/native';

type SearchResultsScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {query: string}}, 'params'>;
};

const SearchResultsScreen = ({navigation, route}: SearchResultsScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const resultsPerPage = 10;
  const {query} = route.params;

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

  const handleProfilePress = () => {
    toggleMenu();
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

  const handleBackgroundPress = () => {
    if (isMenuVisible) {
      setMenuVisible(false);
    }
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchResult', {query: searchText});
  };

  const handleLoadMorePress = () => {
    setCurrentPage(currentPage + 1);
  };

  const searchResults = [
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Abans',
      ratings: '⭐⭐⭐',
      image: require('../../assets/business_logos/abans.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
    {
      name: 'Dealz',
      ratings: '⭐⭐⭐⭐',
      image: require('../../assets/business_logos/idealz.png'),
      address: '332/A Galle Road Panadura',
      contact: '0777xxxxxx',
    },
  ];

  const displayedResults = searchResults.slice(0, currentPage * resultsPerPage);
  const resultsCount = searchResults.length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingTop: 100}}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <View style={styles.nav}>
            {isLoggedIn ? (
              <>
                <TouchableOpacity style={styles.notificationButton}>
                  <Image
                    source={require('../../assets/icons/notification-icon.png')}
                    style={styles.notificationIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={toggleMenu}>
                  <Image
                    source={require('../../assets/icons/profile-icon.jpg')}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInButtonText}>Sign In</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {isMenuVisible && (
          <View style={styles.menuContainer} pointerEvents="box-none">
            <TouchableOpacity style={styles.menuBackdrop} onPress={toggleMenu}>
              <View style={styles.menu} pointerEvents="box-none">
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={handleProfilePress}>
                  <Text style={styles.menuButtonText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={handleLogoutPress}>
                  <Text style={styles.menuButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="What are you looking for"
            placeholderTextColor="#605B49"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <Image
              source={require('../../assets/icons/search-icon.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.resultsText}>
        {resultsCount} Search results for "{query}"
      </Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterByText}>Filter by:</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Ratings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsGrid}>
        {displayedResults.map((result, index) => (
          <View key={index} style={styles.resultCard}>
            <Image source={result.image} style={styles.resultImage} />
            <View style={styles.resultInfo}>
              <Text style={styles.resultName}>{result.name}</Text>
              <Text style={styles.resultRating}>{result.ratings}</Text>
              {result.address && (
                <Text style={styles.resultAddress}>{result.address}</Text>
              )}
              {result.contact && (
                <Text style={styles.resultContact}>{result.contact}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      {displayedResults.length < searchResults.length && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMorePress}>
          <Text style={styles.loadMoreButtonText}>Load More</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
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
    backgroundColor: '#F4D35E',
    paddingVertical: 10,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    backgroundColor: '#FAF0CA',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: -8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: '#000000',
  },
  resultsText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 35,
    marginLeft: 5,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#F4D35E',
    borderRadius: 5,
  },
  filterByText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
  },
  filterButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 15,
  },
  resultCard: {
    width: width * 0.45,
    backgroundColor: '#FAF0CA',
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: width * 0.3,
  },
  resultInfo: {
    padding: 10,
  },
  resultName: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultRating: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 13,
  },
  resultLocation: {
    color: '#555',
    marginBottom: 5,
  },
  resultAddress: {
    color: '#777',
    marginBottom: 5,
  },
  resultContact: {
    color: '#777',
  },
  loadMoreButton: {
    padding: 15,
    backgroundColor: '#0D3B66',
    borderRadius: 5,
    margin: 20,
    marginTop: -10,
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default SearchResultsScreen;
