import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Formik, useFormik} from 'formik';
import React from 'react';
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import * as IMG from 'assets/images';

import messaging from '@react-native-firebase/messaging';
import {IconButton, PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIcon,
  PrimaryPhoneInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import OtpModalRenewPassword from 'components/molecules/modals/otp-modal-signup-renewpassword.js.js';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {getCountryCode, onSignup} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {signupFormValidation, UpdateProfileFormValidation} from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import {height, mvs, width} from 'config/metrices';
import Bold from 'typography/bold-text';
import {colors} from 'config/colors';
import {navigate} from 'navigation/navigation-ref';
import {Row} from 'components/atoms/row';
import {FacBookIcon, GoogleIcon} from 'assets/icons';
import {Checkbox} from 'components/atoms/checkbox';
import CountryCodemOdal from 'components/molecules/modals/country-code-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setCountries} from 'store/reducers/user-reducer';
import {DatePicker} from 'components/atoms/date-picker';
Geocoder.init('AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const UpdateProfileScreen = (props: props) => {
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');
  const [countrycodeModal, setCountryCodeModal] = React.useState(false);

  const {navigation} = props;
  const {t} = i18n;
  const {user} = useAppSelector(s => s);
  const userInfo = user?.userInfo;
  console.log('userinfo', userInfo);
  const {location, countries} = user;
  console.log('location=>>>', location);
  const dispatch = useAppDispatch();
  const initialValues = {
    ...userInfo,
  };
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const res = await onSignup({
        ...values,

        fcm_token: '123',
      });

      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getCountryCodeDetails();
  }, []);
  const getCountryCodeDetails = async () => {
    try {
      dispatch(getCountryCode());
      // setLoading(false);
      // setCountryCode(res);
      // console.log('couyntey code', res);
    } catch (error) {
      // setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
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
              label={t('update_profile')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={UpdateProfileFormValidation}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                touched,
                values,
                errors,
                isValid,
              }) => (
                <>
                  {console.log(errors, isValid, touched)}
                  <PrimaryInput
                    error={touched?.first_name ? t(errors.first_name) : ''}
                    placeholder={t('first_name')}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    value={values.first_name}
                  />
                  <PrimaryInput
                    error={touched?.middle_name ? t(errors.middle_name) : ''}
                    placeholder={t('middle_name')}
                    onChangeText={handleChange('middle_name')}
                    onBlur={handleBlur('middle_name')}
                    value={values.middle_name}
                  />
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.surname ? t(errors.surname) : ''}
                    placeholder={t('surname')}
                    onChangeText={handleChange('surname')}
                    onBlur={handleBlur('surname')}
                    value={values.surname}
                  />
                  <Row style={{marginBottom: mvs(20)}}>
                    <PrimaryButton
                      title={t('male')}
                      containerStyle={{
                        width: mvs(88),
                        height: mvs(39),
                        backgroundColor:
                          values?.gender === 'male'
                            ? colors.bluecolor
                            : colors.white,
                        borderColor: colors.bluecolor,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        color:
                          values?.gender === 'male'
                            ? colors.white
                            : colors.black,
                      }}
                      onPress={() => setFieldValue('gender', 'male')}
                    />
                    <PrimaryButton
                      title={t('female')}
                      containerStyle={{
                        width: mvs(88),
                        height: mvs(39),
                        backgroundColor:
                          values?.gender === 'female'
                            ? colors.bluecolor
                            : colors.white,
                        borderColor: colors.bluecolor,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        color:
                          values?.gender === 'female'
                            ? colors.white
                            : colors.black,
                      }}
                      onPress={() => setFieldValue('gender', 'female')}
                    />
                    <PrimaryButton
                      title={t('other')}
                      containerStyle={{
                        width: mvs(88),
                        height: mvs(39),
                        backgroundColor:
                          values?.gender === 'other'
                            ? colors.bluecolor
                            : colors.white,
                        borderColor: colors.bluecolor,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        color:
                          values?.gender === 'other'
                            ? colors.white
                            : colors.black,
                      }}
                      onPress={() => setFieldValue('gender', 'other')}
                    />
                  </Row>
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.email ? t(errors.email) : ''}
                    placeholder={t('email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {/* <PrimaryInput
                    isPassword
                    keyboardType={'email-address'}
                    error={touched?.password ? t(errors.password) : ''}
                    placeholder={t('password')}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <PrimaryInput
                    isPassword
                    keyboardType={'email-address'}
                    error={
                      touched?.confirm_password
                        ? t(errors.confirm_password)
                        : ''
                    }
                    placeholder={t('confirm_password')}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                  /> */}
                  <Row>
                    <Row
                      style={{
                        borderWidth: 1,
                        height: mvs(45),
                        borderRadius: mvs(10),
                        borderColor: colors.bluecolor,
                        padding: mvs(10),
                        width: '30%',
                      }}>
                      <Medium
                        label={countries?.find(x => x?.selected)?.code || 'PK'}
                      />

                      <TouchableOpacity
                        onPress={() => setCountryCodeModal(true)}>
                        <AntDesign
                          name={'caretdown'}
                          size={mvs(20)}
                          color={colors.bluecolor}
                        />
                      </TouchableOpacity>
                    </Row>
                    <PrimaryInput
                      mainContainer={{
                        width: '60%',
                      }}
                      containerStyle={{borderRadius: mvs(10)}}
                      keyboardType={'number-pad'}
                      error={touched?.phone ? t(errors.phone) : ''}
                      placeholder={t('phone')}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                  </Row>

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
                    title={t('update_profile')}
                  />
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidScrollview>
      </View>
      <CountryCodemOdal
        items={countries}
        setItems={items => {
          console.log('items', items);
          dispatch(setCountries(items));
        }}
        visible={countrycodeModal}
        onClose={() => setCountryCodeModal(false)}
      />
    </View>
  );
};
export default UpdateProfileScreen;
