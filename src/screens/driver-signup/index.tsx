import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { useFormik } from 'formik';
import React from 'react';
import { Alert, TouchableOpacity, View, Image } from 'react-native';
import Geocoder from 'react-native-geocoding';

import messaging from '@react-native-firebase/messaging';
import { PrimaryButton } from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIcon,
  PrimaryPhoneInput,
} from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import OtpModalRenewPassword from 'components/molecules/modals/otp-modal-signup-renewpassword.js.js';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { onSignup } from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import { UTILS } from 'utils';
import { signupFormValidation } from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import CustomSwiper from 'components/atoms/swiper';
import Swiper from 'react-native-swiper';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { Animated } from 'react-native';
import FadeIn from 'components/atoms/animations/fade-in';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import Light from 'typography/light-text';
Geocoder.init('AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const DriverSignup = (props: props) => {
  const swiperRef = React.useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [fadeAnim, setFadeAnim] = React.useState(React.useRef(new Animated.Value(0)).current);
  const genderList = [
    { id: 1, title: 'Male' },
    { id: 2, title: 'Female' },
    { id: 3, title: 'Other' },
  ]
  React.useEffect(() => {
    // setFadeAnim(new Animated.Value(0))
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000, // Change the duration as per your preference
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, currentIndex]);
  const handleNext = () => {
    if (currentIndex == 2) {
      // navigate('Login');
    } else {
      swiperRef?.current?.scrollBy(1);
    }
  };
  const { navigation } = props;
  const { t } = i18n;
  const { user } = useAppSelector(s => s);
  const { location } = user;
  console.log('location=>>>', location);

  const dispatch = useAppDispatch();
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    confirm_password: '',
    password: '',
    token: '',
    gender: '',

  };
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState('');

  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signupFormValidation,
      onSubmit: () => { },
    });

  console.log('errors=>', errors);
  console.log('values=>', values);
  React.useEffect(() => {
    (async () => {
      try {

        const addressComponent = await UTILS._returnAddress(location?.latitude, location?.longitude);
        // console.log('addressComponent=>', addressComponent);
        setFieldValue('map_lat', location?.latitude);
        setFieldValue('map_lng', location?.longitude);
        setFieldValue('city', addressComponent?.city);
        setFieldValue('state', addressComponent?.province);
        setFieldValue('country', addressComponent?.country);
      } catch (error) {
        console.log('error in location address', error);

      }
    })()

  }, []);

  const ImageUpload = async () => {
    try {
      const img = await UTILS._returnImageGallery();
      setImage(img);
    } catch (error) {
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('driver_registration')} />

      <FadeIn currentIndex={currentIndex}>
        <CustomSwiper
          onIndexChanged={(index: any) => {
            setCurrentIndex(index);
          }}
          ref={swiperRef}
          style={{
            autoplay: false,
            loop: false,
          }}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.contentContainerStyle}>
            <Medium style={{ marginBottom: mvs(10) }} fontSize={mvs(20)} label={'Personal Info:'} />
            <Regular style={styles.imageText} label={t('your_photo *')} />
            <TouchableOpacity onPress={() => ImageUpload()} style={styles.imageContainer}>
              <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center' }}>
                <AntDesign name='plus' size={25} color={colors.white} />
                <Light color={colors.white} label={'Upload'} fontSize={mvs(18)} />
              </View>
              <Image source={image} style={{ width: 150, height: 150, resizeMode: 'cover' }} />
            </TouchableOpacity>
            <PrimaryInput
              isRequired
              error={touched?.name && errors?.name ? t(errors?.name) : ''}
              label={t('name')}
              placeholder={t('name')}
              onChangeText={str => setFieldValue('name', str)}
              onBlur={() => setFieldTouched('name', true)}
              value={values.name}
            />
            <PrimaryInput
              error={touched?.name && errors?.name ? t(errors?.name) : ''}
              label={t('middle_name')}
              placeholder={t('name')}
              onChangeText={str => setFieldValue('name', str)}
              onBlur={() => setFieldTouched('name', true)}
              value={values.name}
            />
            <PrimaryInput
              isRequired
              error={touched?.name && errors?.name ? t(errors?.name) : ''}
              label={t('sure_name')}
              placeholder={t('name')}
              onChangeText={str => setFieldValue('name', str)}
              onBlur={() => setFieldTouched('name', true)}
              value={values.name}
            />
            <InputWithIcon
              isRequired
              items={genderList}
              id={values?.gender}
              label={t('gender')}
              error={
                errors?.gender && touched?.gender ? errors?.gender : ''
              }
              onChangeText={str => {
                setFieldValue('gender', str);
              }}
              onBlur={() => setFieldTouched('gender', true)}

            />
            <PrimaryInput
              isRequired
              keyboardType={'email-address'}
              error={touched?.email && errors?.email ? t(errors?.email) : ''}
              label={t('email')}
              placeholder={t('email')}
              onChangeText={str => setFieldValue('email', str)}
              onBlur={() => setFieldTouched('email', true)}
              value={values.email}
            />
            <PrimaryInput
              isRequired
              keyboardType={'phone-pad'}
              error={touched?.phone && errors?.phone ? t(errors?.phone) : ''}
              label={t('phone')}
              placeholder={t('phone')}
              onChangeText={str => setFieldValue('phone', str)}
              onBlur={() => setFieldTouched('phone', true)}
              value={values.phone}
            />
            <PrimaryInput
              isRequired
              error={touched?.cnic && errors?.cnic ? t(errors?.cnic) : ''}
              label={t('cnic/passport No.')}
              placeholder={t('cnic')}
              onChangeText={str => setFieldValue('cnic', str)}
              onBlur={() => setFieldTouched('cnic', true)}
              value={values.cnic}
            />
            <PrimaryInput
              isRequired
              error={touched?.house_no && errors?.house_no ? t(errors?.house_no) : ''}
              label={t('house_no')}
              placeholder={t('house_no')}
              onChangeText={str => setFieldValue('house_no', str)}
              onBlur={() => setFieldTouched('house_no', true)}
              value={values.house_no}
            />
            <PrimaryInput
              isRequired
              error={touched?.address && errors?.address ? t(errors?.address) : ''}
              label={t('address')}
              placeholder={t('address')}
              onChangeText={str => setFieldValue('address', str)}
              onBlur={() => setFieldTouched('address', true)}
              value={values.address}
            />
            <PrimaryInput
              isRequired
              error={touched?.city && errors?.city ? t(errors?.city) : ''}
              label={t('city')}
              placeholder={t('city')}
              onChangeText={str => setFieldValue('city', str)}
              onBlur={() => setFieldTouched('city', true)}
              value={values.city}
            />
            <PrimaryInput
              isRequired
              keyboardType={'numeric'}
              error={touched?.postal_code && errors?.postal_code ? t(errors?.postal_code) : ''}
              label={t('postal_code')}
              placeholder={t('postal_code')}
              onChangeText={str => setFieldValue('postal_code', str)}
              onBlur={() => setFieldTouched('postal_code', true)}
              value={values.postal_code}
            />
            <PrimaryInput
              isRequired
              error={touched?.dob && errors?.dob ? t(errors?.dob) : ''}
              label={t('dob')}
              placeholder={t('dob')}
              onChangeText={str => setFieldValue('dob', str)}
              onBlur={() => setFieldTouched('dob', true)}
              value={values.dob}
            />
          </KeyboardAvoidScrollview>
          <View style={styles.slide}>
            <PrimaryInput
              isRequired
              error={touched?.legal_identity && errors?.legal_identity ? t(errors?.legal_identity) : ''}
              label={t('legal_identity')}
              placeholder={t('legal_identity')}
              onChangeText={str => setFieldValue('legal_identity', str)}
              onBlur={() => setFieldTouched('legal_identity', true)}
              value={`${values.legal_identity}`}
            />
            <PrimaryInput
              isRequired
              error={touched?.company_registration && errors?.company_registration ? t(errors?.company_registration) : ''}
              label={t('company_registration')}
              placeholder={t('company_registration')}
              onChangeText={str => setFieldValue('company_registration', str)}
              onBlur={() => setFieldTouched('company_registration', true)}
              value={`${values.company_registration}`}
            />
            <PrimaryInput
              isRequired
              error={touched?.vat_registration && errors?.vat_registration ? t(errors?.vat_registration) : ''}
              label={t('vat_registration')}
              placeholder={t('vat_registration')}
              onChangeText={str => setFieldValue('vat_registration', str)}
              onBlur={() => setFieldTouched('vat_registration', true)}
              value={`${values.vat_registration}`}
            />
          </View>
          <View style={styles.slide}>
            <InputWithIcon
              isRequired
              items={genderList}
              id={values?.gender}
              label={t('choose_category')}
              error={
                errors?.gender && touched?.gender ? errors?.gender : ''
              }
              onChangeText={str => {
                setFieldValue('gender', str);
              }}
              onBlur={() => setFieldTouched('gender', true)}

            />
            <PrimaryInput
              isRequired
              keyboardType={'numeric'}
              error={
                touched?.zip_code && errors?.zip_code ? t(errors?.zip_code) : ''
              }
              label={t('zip_code')}
              placeholder={t('zip_code')}
              onChangeText={str => setFieldValue('zip_code', str)}
              onBlur={() => setFieldTouched('zip_code', true)}
              value={`${values.zip_code}`}
            />
            <PrimaryInput
              isRequired
              error={touched?.city && errors?.city ? t(errors?.city) : ''}
              label={t('city')}
              placeholder={t('city')}
              onChangeText={str => setFieldValue('city', str)}
              onBlur={() => setFieldTouched('city', true)}
              value={`${values.city}`}
            />
            <PrimaryInput
              isRequired
              error={touched?.state && errors?.state ? t(errors?.state) : ''}
              label={t('state')}
              placeholder={t('state')}
              onChangeText={str => setFieldValue('state', str)}
              onBlur={() => setFieldTouched('state', true)}
              value={`${values.state}`}
            />
            <PrimaryInput
              isRequired
              error={touched?.country && errors?.country ? t(errors?.country) : ''}
              label={t('country')}
              placeholder={t('country')}
              onChangeText={str => setFieldValue('country', str)}
              onBlur={() => setFieldTouched('country', true)}
              value={`${values.country}`}
            />
          </View>
        </CustomSwiper>
      </FadeIn>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={{
            height: mvs(50),
            width: mvs(50),
            borderRadius: mvs(50 / 2),
            ...styles.bottom
          }}
          onPress={() => handleNext()}
        >
          <AntDesign name={'arrowright'} color={colors.white} />
        </TouchableOpacity>

      </View>
    </View>
  );
};
export default DriverSignup;
