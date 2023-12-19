import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {useFormik} from 'formik';
import React from 'react';
import {Alert, TouchableOpacity, View, Image} from 'react-native';
import Geocoder from 'react-native-geocoding';

import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIcon,
  PrimaryPhoneInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import OtpModalRenewPassword from 'components/molecules/modals/otp-modal-signup-renewpassword.js.js';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {onSignup} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {signupFormValidation} from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import CustomSwiper from 'components/atoms/swiper';
import Swiper from 'react-native-swiper';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Animated} from 'react-native';
import FadeIn from 'components/atoms/animations/fade-in';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import Light from 'typography/light-text';
import {DatePicker} from 'components/atoms/date-picker';
import {Row} from 'components/atoms/row';
Geocoder.init('AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const DriverSignup = (props: props) => {
  const swiperRef = React.useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [fadeAnim, setFadeAnim] = React.useState(
    React.useRef(new Animated.Value(0)).current,
  );
  const genderList = [
    {id: 1, title: 'Male'},
    {id: 2, title: 'Female'},
    {id: 3, title: 'Other'},
  ];
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
  const {navigation} = props;
  const {t} = i18n;
  const {user} = useAppSelector(s => s);
  const {location} = user;
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
    cnic: '',
    house_no: '',
    dob: '',
    postal_code: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    legal_identity: '',
    company_registration: '',
    vat_registration: '',
    address: '',
    liscence_no: '',
    issue_date: '',
    expiry_date: '',
    goods_name: '',
    account_title: '',
    sort_code: '',
    account_number: '',
    bank_name: '',
    insurance_name: '',
    good_valid_form: '',
    good_expiry_date: '',
    insurance_valid_form: '',
    insurance_expiry_form: '',
    mot_issue_date: '',
    mot_expiry_date: '',
  };
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [liscenceImage, setLiscenceImage] = React.useState('');
  const [motImage, setMotImage] = React.useState('');
  const [vehicleInsuranceImage, setVehicleInsuranceImage] = React.useState('');

  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signupFormValidation,
      onSubmit: () => {},
    });

  console.log('errors=>', errors);
  console.log('values=>', values);
  React.useEffect(() => {
    (async () => {
      try {
        const addressComponent = await UTILS._returnAddress(
          location?.latitude,
          location?.longitude,
        );
        // console.log('addressComponent=>', addressComponent);
        setFieldValue('map_lat', location?.latitude);
        setFieldValue('map_lng', location?.longitude);
        setFieldValue('city', addressComponent?.city);
        setFieldValue('state', addressComponent?.province);
        setFieldValue('country', addressComponent?.country);
      } catch (error) {
        console.log('error in location address', error);
      }
    })();
  }, []);

  const ImageUpload = async () => {
    try {
      const img = await UTILS._returnImageGallery();
      setImage(img);
      setLiscenceImage(img);
      setMotImage(img);
      setVehicleInsuranceImage(img);
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
            <Medium
              style={{marginBottom: mvs(10)}}
              fontSize={mvs(20)}
              label={'Personal Info:'}
            />
            <Regular style={styles.imageText} label={t('your_photo *')} />
            <TouchableOpacity
              onPress={() => ImageUpload()}
              style={styles.imageContainer}>
              <View style={styles.uploadContainer}>
                <AntDesign name="plus" size={25} color={colors.white} />
                <Light
                  color={colors.white}
                  label={'Upload'}
                  fontSize={mvs(18)}
                />
              </View>
              {image ? <Image source={image} style={styles.image} /> : null}
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
              error={errors?.gender && touched?.gender ? errors?.gender : ''}
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
              error={
                touched?.house_no && errors?.house_no ? t(errors?.house_no) : ''
              }
              label={t('house_no')}
              placeholder={t('house_no')}
              onChangeText={str => setFieldValue('house_no', str)}
              onBlur={() => setFieldTouched('house_no', true)}
              value={values.house_no}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.address && errors?.address ? t(errors?.address) : ''
              }
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
              error={
                touched?.postal_code && errors?.postal_code
                  ? t(errors?.postal_code)
                  : ''
              }
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

          <KeyboardAvoidScrollview
            contentContainerStyle={styles.contentContainerStyle}>
            <Medium
              style={{marginBottom: mvs(10)}}
              fontSize={mvs(20)}
              label={'Company Details:'}
            />

            <PrimaryInput
              isRequired
              error={
                touched?.legal_identity && errors?.legal_identity
                  ? t(errors?.legal_identity)
                  : ''
              }
              label={t('legal_identity')}
              placeholder={t('legal_identity')}
              onChangeText={str => setFieldValue('legal_identity', str)}
              onBlur={() => setFieldTouched('legal_identity', true)}
              value={`${values.legal_identity}`}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.company_registration && errors?.company_registration
                  ? t(errors?.company_registration)
                  : ''
              }
              label={t('company_registration')}
              placeholder={t('company_registration')}
              onChangeText={str => setFieldValue('company_registration', str)}
              onBlur={() => setFieldTouched('company_registration', true)}
              value={`${values.company_registration}`}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.vat_registration && errors?.vat_registration
                  ? t(errors?.vat_registration)
                  : ''
              }
              label={t('vat_registration')}
              placeholder={t('vat_registration')}
              onChangeText={str => setFieldValue('vat_registration', str)}
              onBlur={() => setFieldTouched('vat_registration', true)}
              value={`${values.vat_registration}`}
            />
            <Medium
              style={{marginBottom: mvs(10)}}
              fontSize={mvs(20)}
              label={'Liscence Details:'}
            />
            <Regular style={styles.imageText} label={t('license_photo *')} />
            <TouchableOpacity
              onPress={() => ImageUpload()}
              style={styles.imageContainer}>
              <View style={styles.uploadContainer}>
                <AntDesign name="plus" size={25} color={colors.white} />
                <Light
                  color={colors.white}
                  label={'Upload'}
                  fontSize={mvs(18)}
                />
              </View>
              {image ? (
                <Image source={liscenceImage} style={styles.image} />
              ) : null}
            </TouchableOpacity>
            <PrimaryInput
              isRequired
              error={
                touched?.liscence_no && errors?.liscence_no
                  ? t(errors?.liscence_no)
                  : ''
              }
              label={t('liscence_no')}
              placeholder={t('liscence_no')}
              onChangeText={str => setFieldValue('liscence_no', str)}
              onBlur={() => setFieldTouched('liscence_no', true)}
              value={`${values.liscence_no}`}
            />
            <Row>
              <View style={{width: '48%'}}>
                <Regular
                  style={styles.imageText}
                  label={t('Liscence Issued Date *')}
                />
                <DatePicker
                  onChangeText={str => setFieldValue('issue_date', str)}
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.issue_date ? values.issue_date : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
              <View style={{width: '48%'}}>
                <Regular
                  style={styles.imageText}
                  label={t('Liscence Expiry Date *')}
                />
                <DatePicker
                  onChangeText={str => setFieldValue('expiry_date', str)}
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.expiry_date ? values.expiry_date : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
            </Row>

            <Medium
              style={{marginTop: mvs(20), marginBottom: mvs(10)}}
              fontSize={mvs(20)}
              label={'MOT:'}
            />
            <Regular style={styles.imageText} label={t('mot_photo *')} />
            <TouchableOpacity
              onPress={() => ImageUpload()}
              style={styles.imageContainer}>
              <View style={styles.uploadContainer}>
                <AntDesign name="plus" size={25} color={colors.white} />
                <Light
                  color={colors.white}
                  label={'Upload'}
                  fontSize={mvs(18)}
                />
              </View>
              {image ? <Image source={motImage} style={styles.image} /> : null}
            </TouchableOpacity>
            <Row>
              <View style={{width: '48%'}}>
                <Regular
                  style={styles.imageText}
                  label={t('MOT Issued Date *')}
                />
                <DatePicker
                  onChangeText={str => setFieldValue('mot_issue_date', str)}
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.mot_issue_date
                        ? values.mot_issue_date
                        : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
              <View style={{width: '48%'}}>
                <Regular
                  style={styles.imageText}
                  label={t('MOT Expiry Date *')}
                />
                <DatePicker
                  onChangeText={str => setFieldValue('mot_expiry_date', str)}
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.mot_expiry_date
                        ? values.mot_expiry_date
                        : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
            </Row>
          </KeyboardAvoidScrollview>

          <KeyboardAvoidScrollview
            contentContainerStyle={styles.contentContainerStyle}>
            <Medium
              style={{marginBottom: mvs(10)}}
              fontSize={mvs(20)}
              label={'Vehicle Insurance:'}
            />
            <Regular style={styles.imageText} label={t('your_photo *')} />
            <TouchableOpacity
              onPress={() => ImageUpload()}
              style={styles.imageContainer}>
              <View style={styles.uploadContainer}>
                <AntDesign name="plus" size={25} color={colors.white} />
                <Light
                  color={colors.white}
                  label={'Upload'}
                  fontSize={mvs(18)}
                />
              </View>
              {image ? (
                <Image source={vehicleInsuranceImage} style={styles.image} />
              ) : null}
            </TouchableOpacity>
            <PrimaryInput
              isRequired
              error={
                touched?.insurance_name && errors?.insurance_name
                  ? t(errors?.insurance_name)
                  : ''
              }
              label={t('name')}
              placeholder={t('insurance_name')}
              onChangeText={str => setFieldValue('insurance_name', str)}
              onBlur={() => setFieldTouched('insurance_name', true)}
              value={`${values.insurance_name}`}
            />
            <Row>
              <View style={{width: '48%'}}>
                <Regular style={styles.imageText} label={t('Valid From*')} />
                <DatePicker
                  onChangeText={str =>
                    setFieldValue('insurance_valid_form', str)
                  }
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.insurance_valid_form
                        ? values.insurance_valid_form
                        : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
              <View style={{width: '48%'}}>
                <Regular style={styles.imageText} label={t('Expiry Date *')} />
                <DatePicker
                  onChangeText={str =>
                    setFieldValue('insurance_expiry_form', str)
                  }
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.insurance_expiry_form
                        ? values.insurance_expiry_form
                        : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
            </Row>

            <Medium
              style={{marginBottom: mvs(10), marginTop: mvs(20)}}
              fontSize={mvs(20)}
              label={'Goods in Transit:'}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.goods_name && errors?.goods_name
                  ? t(errors?.goods_name)
                  : ''
              }
              label={t('name')}
              placeholder={t('goods_name')}
              onChangeText={str => setFieldValue('goods_name', str)}
              onBlur={() => setFieldTouched('goods_name', true)}
              value={`${values.goods_name}`}
            />
            <Row>
              <View style={{width: '48%'}}>
                <Regular style={styles.imageText} label={t('Valid From*')} />
                <DatePicker
                  onChangeText={str => setFieldValue('good_valid_form', str)}
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.good_valid_form
                        ? values.good_valid_form
                        : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
              <View style={{width: '48%'}}>
                <Regular style={styles.imageText} label={t('Expiry Date *')} />
                <DatePicker
                  onChangeText={str => setFieldValue('good_expiry_date', str)}
                  style={styles.datePickerContainer}>
                  <Regular
                    label={
                      values.good_expiry_date
                        ? values.good_expiry_date
                        : 'Selecte date'
                    }
                  />
                </DatePicker>
              </View>
            </Row>
            <Medium
              style={{marginTop: mvs(20), marginBottom: mvs(10)}}
              fontSize={mvs(20)}
              label={'Bank Details:'}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.bank_name && errors?.bank_name
                  ? t(errors?.bank_name)
                  : ''
              }
              label={t('bank_name')}
              placeholder={t('bank_name')}
              onChangeText={str => setFieldValue('bank_name', str)}
              onBlur={() => setFieldTouched('bank_name', true)}
              value={`${values.bank_name}`}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.account_title && errors?.account_title
                  ? t(errors?.account_title)
                  : ''
              }
              label={t('account_title')}
              placeholder={t('account_title')}
              onChangeText={str => setFieldValue('account_title', str)}
              onBlur={() => setFieldTouched('account_title', true)}
              value={`${values.account_title}`}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.sort_code && errors?.sort_code
                  ? t(errors?.sort_code)
                  : ''
              }
              label={t('sort_code')}
              placeholder={t('sort_code')}
              onChangeText={str => setFieldValue('sort_code', str)}
              onBlur={() => setFieldTouched('sort_code', true)}
              value={`${values.sort_code}`}
            />
            <PrimaryInput
              isRequired
              error={
                touched?.account_number && errors?.account_number
                  ? t(errors?.account_number)
                  : ''
              }
              label={t('account_number')}
              placeholder={t('account_number')}
              onChangeText={str => setFieldValue('account_number', str)}
              onBlur={() => setFieldTouched('account_number', true)}
              value={`${values.account_number}`}
            />
          </KeyboardAvoidScrollview>
        </CustomSwiper>
      </FadeIn>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={{
            height: mvs(50),
            width: mvs(50),
            borderRadius: mvs(50 / 2),
            ...styles.bottom,
          }}
          onPress={() => handleNext()}>
          <AntDesign name={'arrowright'} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DriverSignup;
