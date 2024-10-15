import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import checkTokenValidity from '../utils/checkTokenValidity';
import removeToken from '../utils/removeToken';

const { width, height } = Dimensions.get('window');

const GameGalleryScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { isValid, userDetails } = await checkTokenValidity();
      setIsLoggedIn(isValid);
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
      routes: [{ name: 'Login' }],
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D3B66" />
      </View>
    );
  }

  const games = [
    {
      image: require('../../assets/game_banner/DropMergetheNumbers.jpg'),
      title: 'Drop & Merge the Numbers',
      developer: 'GMR Bros',
      description: 'A fun and addictive number merging game.',
      visits: '11M',
      url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
    },
    // Add more game objects here
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <View style={styles.nav}>
              {isLoggedIn ? (
                <>
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
                  <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Profile')}>
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
      </View>
      <View style={styles.grid}>
        {games.map((game, index) => (
          <TouchableOpacity key={index} style={styles.gameCard} onPress={() => navigation.navigate('GameDetail', { game })}>
            <Image source={game.image} style={styles.gameImage} />
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameDeveloper}>{game.developer}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
            <Text style={styles.gameVisits}>{game.visits} Visits</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#00000000',
    zIndex: 1,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  gameCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  gameImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  gameTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  gameDeveloper: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  gameVisits: {
    fontSize: 12,
    color: '#4b5563',
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

export default GameGalleryScreen;
