import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {useFormik} from 'formik';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
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
import {signupFormValidation} from 'validations';
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
Geocoder.init('AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupNext = (props: props) => {
  const [otpModalVisible, setOtpModalVisible] = React.useState(true);
  const [value, setValue] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');

  const {navigation} = props;
  const {t} = i18n;
  const {user} = useAppSelector(s => s);
  const {location} = user;
  console.log('location=>>>', location);

  const dispatch = useAppDispatch();
  const initialValues = {
    first_name: '',
    middle_name: '',
    surname: '',
    email: '',
    phone: '',
    confirm_password: '',
    password: '',
    cnic: '',
    passport_no: '',
    house_name: '',
    house_number: '',
    address: '',
    postal_code: '',
    date_of_birth: '',
    city: '',

    // bio: null,
  };
  const [loading, setLoading] = React.useState(false);
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
          contentContainerStyle={styles.keyboardcontentcontainer}>
          <View style={styles.contentContainerStyleNew}>
            <Bold
              label={t('signup_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.cnic && errors?.cnic ? `${t(errors?.cnic)}` : undefined
              }
              placeholder={t('cnic/passport_no')}
              onChangeText={str => setFieldValue('cnic', str)}
              onBlur={() => setFieldTouched('cnic', true)}
              value={values.cnic}
            />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.house_name && errors?.house_name
                  ? `${t(errors?.house_name)}`
                  : undefined
              }
              placeholder={t('house_name/number')}
              onChangeText={str => setFieldValue('house_name', str)}
              onBlur={() => setFieldTouched('house_name', true)}
              value={values.house_name}
            />

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.address && errors?.address
                  ? `${t(errors?.address)}`
                  : undefined
              }
              placeholder={t('first_line_of_address')}
              onChangeText={str => setFieldValue('address', str)}
              onBlur={() => setFieldTouched('address', true)}
              value={values.address}
            />
            <PrimaryInput
              keyboardType={'email_address'}
              error={
                touched?.city && errors?.city ? `${t(errors?.city)}` : undefined
              }
              // label={t('email')}
              placeholder={t('city')}
              onChangeText={str => setFieldValue('city', str)}
              onBlur={() => setFieldTouched('city', true)}
              value={values.city}
            />
            <PrimaryInput
              keyboardType={'email_address'}
              error={
                touched?.postal_code && errors?.postal_code
                  ? `${t(errors?.postal_code)}`
                  : undefined
              }
              placeholder={t('postal_code')}
              onChangeText={str => setFieldValue('postal_code', str)}
              onBlur={() => setFieldTouched('postal_code', true)}
              value={values.postal_code}
            />

            <DatePicker
              onChangeText={(str: string) =>
                setFieldValue('date_of_birth', str)
              }>
              <PrimaryInput
                editable={false}
                error={
                  errors?.date_of_birth && touched?.date_of_birth
                    ? `${errors?.date_of_birth}`
                    : ''
                }
                placeholder={t('date_of_birth')}
                onChangeText={str => setFieldValue('date_of_birth', str)}
                value={values.date_of_birth}
              />
            </DatePicker>

            <PrimaryButton
              containerStyle={{
                borderRadius: mvs(10),
              }}
              loading={loading}
              // onPress={onSubmit}
              title={t('login')}
            />
          </View>
          <SignUpModal
            // email={values?.email}
            onClose={() => setOtpModalVisible(false)}
            visible={otpModalVisible}
            setValue={setValue}
            value={value}
            {...props}
          />
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default SignupNext;
