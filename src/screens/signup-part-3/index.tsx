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
import {
  signupCardFormValidation,
  signupDetailsFormValidation,
  signupFormValidation,
} from 'validations';
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
Geocoder.init('AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupCard = (props: props) => {
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');

  // const {navigation} = props;
  const {values} = props?.route?.params;
  console.log('valuescard', props?.route?.params);
  const {t} = i18n;
  const {user} = useAppSelector(s => s);
  const {location} = user;
  console.log('location=>>>', location);

  const dispatch = useAppDispatch();
  const initialValues = {
    card_number: '',
    card_expiry_date: '',
    card_issue_date: '',
    card_cvv: '',
    card_holder: '',
  };
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const res = await onSignup({
        ...values,

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
              label={'Add your Credit Card Information'}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={signupCardFormValidation}
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

                  <View style={{marginTop: mvs(20)}}>
                    <PrimaryInput
                      error={touched?.card_number ? t(errors.card_number) : ''}
                      placeholder={t('Card Number')}
                      // placeholder={'license_number or 12345-1234567-1'}
                      onChangeText={handleChange('card_number')}
                      onBlur={handleBlur('card_number')}
                      value={values.card_number}
                    />
                  </View>
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.card_cvv ? t(errors.card_cvv) : ''}
                    placeholder={'CVV'}
                    onChangeText={handleChange('card_cvv')}
                    onBlur={handleBlur('card_cvv')}
                    value={values.card_cvv}
                  />

                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.card_holder ? t(errors.card_holder) : ''}
                    placeholder={'Card Holder'}
                    onChangeText={handleChange('card_holder')}
                    onBlur={handleBlur('card_holder')}
                    value={values.card_holder}
                  />
                  <DatePicker
                    onPress={() => {
                      setFieldTouched('card_issue_date', true);
                    }}
                    onChangeText={(str: string) => {
                      setFieldValue('card_issue_date', str);
                    }}>
                    <PrimaryInput
                      isCalendar
                      editable={false}
                      error={
                        touched?.card_issue_date ? errors.card_issue_date : ''
                      }
                      placeholder={'Card Issue Date'}
                      onChangeText={value => {
                        setFieldValue('card_issue_date', value);
                      }}
                      onBlur={() => {
                        setFieldTouched('card_issue_date', true);
                      }}
                      value={values.card_issue_date}
                    />
                  </DatePicker>
                  <DatePicker
                    onPress={() => {
                      setFieldTouched('card_expiry_date', true);
                    }}
                    onChangeText={(str: string) => {
                      setFieldValue('card_expiry_date', str);
                    }}>
                    <PrimaryInput
                      isCalendar
                      editable={false}
                      error={
                        touched?.card_expiry_date ? errors.card_expiry_date : ''
                      }
                      placeholder={'Card Expiry Date'}
                      onChangeText={value => {
                        setFieldValue('card_expiry_date', value);
                      }}
                      onBlur={() => {
                        setFieldTouched('card_expiry_date', true);
                      }}
                      value={values.card_expiry_date}
                    />
                  </DatePicker>

                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(10),
                    }}
                    loading={loading}
                    onPress={handleSubmit}
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
export default SignupCard;
