import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Formik, useFormik} from 'formik';
import React from 'react';
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import * as IMG from 'assets/images';

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
import {signupDetailsFormValidation, signupFormValidation} from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import {mvs, width} from 'config/metrices';
import Bold from 'typography/bold-text';
import {colors} from 'config/colors';
import {navigate} from 'navigation/navigation-ref';
import {Row} from 'components/atoms/row';
import {FacBookIcon, GoogleIcon} from 'assets/icons';
import {Checkbox} from 'components/atoms/checkbox';
import {DatePicker} from 'components/atoms/date-picker';
import SignUpModal from 'components/molecules/modals/SignUp-modal';
import GoogleSearchBar from 'components/atoms/google-auto-place';
import Regular from 'typography/regular-text';
import {DatePickerBirthday} from 'components/atoms/date-picker-birthday';
Geocoder.init('AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupNext = (props: props) => {
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');

  // const {navigation} = props;
  const {values} = props?.route?.params;
  console.log('values props', props?.route?.params);
  const {t} = i18n;
  const {user} = useAppSelector(s => s);
  const {location} = user;
  console.log('location=>>>', location);
  const [data, setdata] = React.useState({});

  const dispatch = useAppDispatch();
  const initialValues = {
    ...data,
    license_number: '',
    // cnic:'38301-1257520-1',
    house_name: '',
    first_line_of_address: '',
    city: '',
    postal_code: '',
    roles: 'Driver',
    dob: '',
    // ...props?.route?.params,
  };
  const [loading, setLoading] = React.useState(false);

  // const handleFormSubmit = async values => {
  //   // dispatch(onSignup(values, setLoading));
  //   navigate('SignupCard', {
  //     ...values,
  //     ...data,
  //   });
  //   {
  //     console.log('values form siubmit', values);
  //   }
  // };
  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const res = await onSignup({
        ...values,
        ...data,
        ...props?.route?.params,
        fcm_token: '123',
      });
      setOtpModalVisible(true);
      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const handlePlaceSelection = (data, details) => {
    // Extract latitude and longitude from details.geometry.location
    const {lat, lng} = details.geometry.location;

    // Determine whether this is for pickup or dropoff

    setdata({
      driver_lat: lat,
      driver_long: lng,
      driver_address: details.formatted_address,
    });
  };
  return (
    <View style={styles.container}>
      {/* <Header1x2x title={t('signup')} /> */}
      <Image source={IMG.LogoBackground} style={styles.logobackground} />
      <Header1x2x />
      <View style={{alignSelf: 'center'}}>
        <Image
          source={IMG.LoginLogo}
          resizeMode={'contain'}
          style={{width: mvs(300), height: mvs(100)}}
        />
      </View>
      <View style={styles.contentContainerStyle}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboardcontentcontainer}
          keyboardShouldPersistTaps={true}>
          <View style={styles.contentContainerStyleNew}>
            <Bold
              label={t('signup_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={signupDetailsFormValidation}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                touched,
                values,
                errors,
              }) => (
                <>
                  {console.log('errror2', errors)}

                  <View style={{marginHorizontal: mvs(20)}}>
                    <Regular
                      numberOfLines={2}
                      label={t('please_enter_area_where_you_want_to_work')}
                      color={colors.bluecolor}
                      fontSize={mvs(12)}
                    />
                    <Regular
                      numberOfLines={2}
                      label={t('please_enable_your_location_to_use_this')}
                      color={colors.primary}
                      fontSize={mvs(14)}
                    />
                    <GoogleSearchBar
                      onPress={handlePlaceSelection}
                      // onPress={(data, details = null) => {
                      //   // setValues({...values.searchMapInput?.details.formatted_address,})
                      //   // 'details' is provided when fetchDetails = true
                      //   console.log(data, details);
                      // }}
                      placeholder={'Select your Pickup Location '}
                    />
                  </View>
                  <View style={{marginTop: mvs(20)}}>
                    <PrimaryInput
                      error={
                        touched?.license_number ? t(errors.license_number) : ''
                      }
                      placeholder={t('License Number')}
                      // placeholder={'license_number or 12345-1234567-1'}
                      onChangeText={handleChange('license_number')}
                      onBlur={handleBlur('license_number')}
                      value={values.license_number}
                    />
                  </View>
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.house_name ? t(errors.house_name) : ''}
                    placeholder={t('house_name')}
                    onChangeText={handleChange('house_name')}
                    onBlur={handleBlur('house_name')}
                    value={values.house_name}
                  />

                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={
                      touched?.first_line_of_address
                        ? t(errors.first_line_of_address)
                        : ''
                    }
                    placeholder={t('first_line_of_address')}
                    onChangeText={handleChange('first_line_of_address')}
                    onBlur={handleBlur('first_line_of_address')}
                    value={values.first_line_of_address}
                  />
                  <PrimaryInput
                    keyboardType={'email_address'}
                    error={touched?.city ? t(errors.city) : ''}
                    // label={t('email')}
                    placeholder={t('city')}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                  />
                  <PrimaryInput
                    keyboardType={'email_address'}
                    error={touched?.postal_code ? t(errors.postal_code) : ''}
                    placeholder={t('postal_code')}
                    onChangeText={handleChange('postal_code')}
                    onBlur={handleBlur('postal_code', true)}
                    value={values.postal_code}
                  />

                  {/* <DatePicker
                    onPress={() => setFieldTouched('dob', true)}
                    onChangeText={(str: string) => setFieldValue('dob', str)}>
                    <PrimaryInput
                      isCalendar
                      editable={false}
                      error={touched?.dob ? t(errors.dob) : ''}
                      placeholder={t('date_of_birth')}
                      onChangeText={handleChange('dob')}
                      onBlur={handleBlur('dob', true)}
                      value={values.dob}
                    />
                  </DatePicker> */}
                  <DatePicker
                    onPress={() => {
                      setFieldTouched('dob', true);
                    }}
                    onChangeText={(str: string) => {
                      setFieldValue('dob', str);
                    }}>
                    <PrimaryInput
                      isCalendar
                      maximumDate={new Date()}
                      editable={false}
                      error={touched?.dob ? errors.dob : ''}
                      placeholder={t('date_of_birth')}
                      onChangeText={value => {
                        setFieldValue('dob', value);
                      }}
                      onBlur={() => {
                        setFieldTouched('dob', true);
                      }}
                      value={values.dob}
                    />
                  </DatePicker>

                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(10),
                    }}
                    loading={loading}
                    onPress={handleSubmit}
                    // title={'Continue'}
                    title={t('login')}
                  />
                </>
              )}
            </Formik>
          </View>

          <SignUpModal
            email={props?.route?.params?.email}
            onClose={() => setOtpModalVisible(false)}
            visible={otpModalVisible}
            setValue={setValue}
            value={value}
            {...props}
            isSignup={false}
            // // email={values?.email}
            // onClose={() => setOtpModalVisible(false)}
            // visible={otpModalVisible}
            // setValue={setValue}
            // value={value}
            // {...props}
          />
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default SignupNext;
