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
Geocoder.init('AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98');

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

  const dispatch = useAppDispatch();
  const initialValues = {
    cnic: '',
    house_name: '',
    first_line_of_address: '',
    city: '',
    postal_code: '',
    roles: 'Driver',
    dob: '',
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
                  <PrimaryInput
                    error={touched?.cnic ? t(errors.cnic) : ''}
                    placeholder={t('cnic')}
                    onChangeText={handleChange('cnic')}
                    onBlur={handleBlur('cnic')}
                    value={values.cnic}
                  />
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

                  <DatePicker
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
export default SignupNext;
