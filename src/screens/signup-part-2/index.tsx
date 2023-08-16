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
      <Image
        source={IMG.LogoBackground}
        style={{
          height: mvs(400),
          width: width,
          position: 'absolute',
        }}
      />
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
          contentContainerStyle={{
            paddingHorizontal: mvs(0),
            flexGrow: 0,
            paddingBottom: mvs(150),
          }}>
          <View style={styles.contentContainerStyleNew}>
            <Bold
              label={t('signup_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={{marginTop: mvs(10), marginBottom: mvs(20)}}
            />
            {/* <KeyboardAvoidScrollview> */}

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.cnic && errors?.cnic ? `${t(errors?.cnic)}` : undefined
              }
              // label={t('email')}
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
              // label={t('email')}
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
              // label={t('email')}
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
              // label={t('email')}
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

            {/* </KeyboardAvoidScrollview> */}
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
      {/* <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
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
          isRequired
          keyboardType={'email-address'}
          error={touched?.email && errors?.email ? t(errors?.email) : ''}
          label={t('email')}
          placeholder={t('email')}
          onChangeText={str => setFieldValue('email', str)}
          onBlur={() => setFieldTouched('email', true)}
          value={values.email}
        />
        <PrimaryPhoneInput
          isRequired
          error={errors?.phone && touched?.phone ? `${t(errors?.phone)}` : ''}
          label={t('phone')}
          placeholder={t('phone_no')}
          onChangeText={str => {
            setFieldValue('phone', str);
            setFieldTouched('phone', true);
          }}
          onBlur={() => setFieldTouched('phone', true)}
          value={values.phone}
        />
        <PrimaryInput
          isRequired
          isPassword
          error={
            touched?.password && errors?.password
              ? t(errors?.password)
              : undefined
          }
          placeholder={'********'}
          label={t('password')}
          onChangeText={str => setFieldValue('password', str)}
          onBlur={() => setFieldTouched('password', true)}
          value={values.password}
        />
        <PrimaryInput
          isRequired
          isPassword
          error={
            touched?.confirm_password && errors?.confirm_password
              ? t(errors?.confirm_password)
              : undefined
          }
          placeholder={'********'}
          label={t('confirm_pass')}
          onChangeText={str => setFieldValue('confirm_password', str)}
          onBlur={() => setFieldTouched('confirm_password', true)}
          value={values.confirm_password}
        />
        <InputWithIcon
          isRequired
          label={t('choose_category')}
          error={
            errors?.doc_cat_id && touched?.doc_cat_id ? errors?.doc_cat_id : ''
          }
          items={[]}
          onChangeText={str => {
            setFieldValue('doc_cat_id', str);
          }}
          onBlur={() => setFieldTouched('doc_cat_id', true)}
          id={values?.doc_cat_id}

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
        <PrimaryInput
          isRequired
          keyboardType={'numeric'}
          error={touched?.price && errors?.price ? t(errors?.price) : ''}
          label={t('price')}
          placeholder={t('price')}
          onChangeText={str => setFieldValue('price', str)}
          onBlur={() => setFieldTouched('price', true)}
          value={`${values.price}`}
        />
        <PrimaryInput
          isRequired
          keyboardType={'numeric'}
          error={
            touched?.experience && errors?.experience
              ? t(errors?.experience)
              : ''
          }
          label={t('experience')}
          placeholder={t('experience')}
          onChangeText={str => setFieldValue('experience', str)}
          onBlur={() => setFieldTouched('experience', true)}
          value={`${values.experience}`}
        />
        <PrimaryInput
          isRequired
          error={
            touched?.short_description && errors?.short_description
              ? t(errors?.short_description)
              : ''
          }
          label={t('short_description')}
          placeholder={t('short_description')}
          onChangeText={str => setFieldValue('short_description', str)}
          onBlur={() => setFieldTouched('short_description', true)}
          value={`${values.short_description}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.min_day_before_booking && errors?.min_day_before_booking
              ? t(errors?.min_day_before_booking)
              : ''
          }
          label={t('min_day_before_booking')}
          placeholder={t('min_day_before_booking')}
          onChangeText={str => setFieldValue('min_day_before_booking', str)}
          onBlur={() => setFieldTouched('min_day_before_booking', true)}
          value={`${values.min_day_before_booking}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.min_day_stays && errors?.min_day_stays
              ? t(errors?.min_day_stays)
              : ''
          }
          label={t('min_day_stays')}
          placeholder={t('min_day_stays')}
          onChangeText={str => setFieldValue('min_day_stays', str)}
          onBlur={() => setFieldTouched('min_day_stays', true)}
          value={`${values.min_day_stays}`}
        />
        <Medium
          style={styles.accountText}
          onPress={props?.navigation?.goBack}
          label={`${t('already_acc')}`}
        />
        <PrimaryButton
          loading={loading}
          disabled={
            Object.keys(errors)?.length > 0 ||
            Object.keys(touched)?.length === 0
          }
          title={t('signup')}
          onPress={() => {
            messaging()
              .getToken()
              .then(fcmToken => {
                console.log('fcmToken=>', fcmToken);
                dispatch(
                  onSignup(
                    { ...values, token: fcmToken },
                    setLoading,
                    props,
                    setOtpModalVisible,
                  ),
                );
              })
              .catch(error => console.log(error));
          }}
          containerStyle={styles.button}
        />
      
      </KeyboardAvoidScrollview> */}
    </View>
  );
};
export default SignupNext;
