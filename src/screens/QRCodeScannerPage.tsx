import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {HashLoader} from 'react-spinners';
import {format} from 'date-fns';

const BACKEND_URL = 'http://10.0.2.2:8080/api/v1';

const QRCodeScannerPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [couponId, setcouponId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUseModalVisible, setIsUseModalVisible] = useState(false);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [businessId, setBusinessId] = useState<number>(4);
  const [imageUrl, setimageUrl] = useState<string>(
    'https://iili.io/20X6XVa.png',
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleScan = async (e: {data: string}) => {
    const scannedData = e.data;
    setScanResult(scannedData);
    console.log('Scanned QR Code:', scannedData);

    try {
      const response = await fetch(
        `${BACKEND_URL}/coupon/check/${scannedData}`,
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
        setcouponId(result.coupon_id);
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

  const handleAmountChange = (text: string) => {
    if (text === '') {
      setAmountError(undefined);
      setAmount(undefined);
      return;
    }

    const isValidAmount = /^\d*\.?\d*$/.test(text);

    if (isValidAmount) {
      setAmount(Number(text));
      setAmountError('');
    } else {
      setAmountError('Please enter a valid amount');
    }
  };

  const handleUseClose = () => {
    setIsUseModalVisible(false);
    navigation.navigate('BusinessHomeScreen');
  };

  const handleCouponUse = () => {
    console.log('Amount:', amount, 'businessId:', businessId);
    setIsUseModalVisible(false);
    useCoupon();
  };

  const handleUse = () => {
    handleClose();
    setIsUseModalVisible(true);
  };

  const handleImageUpload = async (imageFile: string | Blob) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await fetch(`${BACKEND_URL}/upload_image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error uploading image:', errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || 'Unknown error'
          }`,
        );
      }

      const imageUrl = await response.text();
      console.log('Image URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('An error occurred during image upload:', error);
      throw error;
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setCouponImage(file);
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  const useCoupon = async () => {
    // let imageUrl = "";

    // setLoading(true);

    // if (couponImage) {
    //   imageUrl = await handleImageUpload(couponImage);
    // } else {
    //   setLoading(false);
    //   throw new Error(`Image is empty`);
    // }

    const timeStamp = new Date();
    const discountValue = ((discount ?? 0) / 100) * amount!;
    console.log(discountValue + ' ' + couponId + ' ' + imageUrl);
    try {
      const response = await fetch(`${BACKEND_URL}/scanned_coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponId: couponId,
          dateTime: format(timeStamp, 'yyyy-MM-dd HH:mm:ss'),
          discount: discountValue,
          billImage: imageUrl,
          businessId: businessId,
        }),
      });

      if (response.status === 200) {
        console.log('Coupon used successfully');
        // navigation.navigate('BusinessHomeScreen');
      }
      console.log('Coupon used unsuccessfully: ', response.status);
    } catch (e) {
      console.log('An error occured: ' + e);
    } finally {
      setLoading(false);
    }
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
          message: `This coupon can be used with ${discount}% discount.`,
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

      <Modal
        visible={isUseModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleUseClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>
              Enter the full amount without discount (Maximum 1000)
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.placeHolderText}> Rs. </Text>
              <TextInput
                placeholder="Enter amount"
                placeholderTextColor="#374151"
                style={styles.input}
                value={amount !== undefined ? amount.toString() : ''}
                onChangeText={text => {
                  handleAmountChange(text);
                }}
              />
            </View>
            {amountError ? (
              <Text style={styles.errorText}>{amountError}</Text>
            ) : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleUseClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCouponUse}>
                <Text style={styles.buttonText}>Use</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        {loading && (
          <View>
            <HashLoader color="#36d7b7" size={50} />
          </View>
        )}
      </View>
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
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginTop: 25,
    marginBottom: 25,
    fontFamily: 'Poppins',
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  placeHolderText: {
    color: '#111827',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  label: {
    color: '#0D3B66',
    marginLeft: 3,
    fontWeight: '600',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
    tintColor: '#374151',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#111827',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
    marginRight: 10,
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
    color: '#000000',
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
    color: '#000000',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  signUpLink: {
    color: '#0D3B66',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: 'Poppins',
  },
});

export default QRCodeScannerPage;
