import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const QRCodeScannerPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScan = async (e: {data: string}) => {
    const scannedData = e.data;
    setScanResult(scannedData);
    console.log('Scanned QR Code:', scannedData);

    try {
      const response = await fetch(
        `https://2f7c-112-134-198-94.ngrok-free.app/api/v1/coupon/check/${scannedData}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Coupon Result:', result);
        const status = result.status;
        const discount = result.discount;
        console.log('Coupon Status:', status);
        setStatus(status.toUpperCase());
        setDiscount(discount);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setStatus(null);
    setScanResult(null);
    // navigation.navigate('BusinessHomeScreen');
  };

  const handleUse = () => {
    Alert.alert('Coupon Used', 'You have used the coupon!', [{text: 'OK'}]);
    handleClose();
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'PENDING':
        return {
          message: 'This coupon is invalid.',
          color: 'red',
        };
      case 'ISSUED':
        return {
          message: `This coupon can be used. ${discount}% discount.`,
          color: 'green',
        };
      case 'USED':
        return {
          message: 'This coupon is already used.',
          color: 'red',
        };
      case 'DELETED':
        return {
          message: 'This coupon is invalid.',
          color: 'red',
        };
      case 'ERROR':
        return {
          message: 'Something went wrong.',
          color: 'red',
        };
      default:
        return {
          message: 'This coupon is invalid.',
          color: 'red',
        };
    }
  };

  const {message, color} = getStatusMessage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan QR code</Text>
      </View>
      <QRCodeScanner
        onRead={handleScan}
        flashMode={RNCamera.Constants.FlashMode.off}
        containerStyle={styles.scannerContainer}
        cameraStyle={styles.cameraStyle}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, {color}]}>{message}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              {status === 'ISSUED' && (
                <TouchableOpacity style={styles.button} onPress={handleUse}>
                  <Text style={styles.buttonText}>Use</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannerContainer: {
    flex: 1,
  },
  cameraStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '100%',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#0D3B66',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRCodeScannerPage;
