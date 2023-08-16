import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';

import {height, mvs, width} from 'config/metrices';
import {useFormik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate, resetStack} from 'navigation/navigation-ref';
import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {signinFormValidation} from 'validations';
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import {
  Clock,
  FacBookIcon,
  ForgotPasswordAnimation,
  GoogleIcon,
  LoginAnimation,
  PasswordChangedAnimation,
  ResetYourPasswordAnimation,
} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PasswordChangedModal from 'components/molecules/modals/SignUp-modal';
const ResetPasswordScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
    new_password: '',
    confirm_password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signinFormValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    try {
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('fcmToken=>', fcmToken);
          // dispatch(onLogin({ ...values, token: fcmToken }, setLoading, props));
          resetStack('Drawer');
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.container}> */}
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
            {!isPasswordChanged ? (
              <>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {/* <Bold label={t('login')} style={styles.txt} /> */}
                  <LottieView
                    source={ResetYourPasswordAnimation}
                    autoPlay={true}
                    loop={true}
                    style={{width: mvs(100), height: mvs(100)}}
                  />
                </View>
                <Bold
                  label={t('reset_your_password')}
                  color={colors.bluecolor}
                  fontSize={mvs(16)}
                  style={{marginTop: mvs(10), marginBottom: mvs(20)}}
                />
                {/* <KeyboardAvoidScrollview> */}
                <PrimaryInput
                  isPassword
                  error={
                    touched?.new_password && errors?.new_password
                      ? `${t(errors?.new_password)}`
                      : undefined
                  }
                  placeholder={t('new_password')}
                  // label={t('password')}
                  onChangeText={str => setFieldValue('new_password', str)}
                  onBlur={() => setFieldTouched('new_password', true)}
                  value={values.new_password}
                  containerStyle={{marginBottom: 0}}
                  errorStyle={{marginBottom: 0}}
                />
                <PrimaryInput
                  isPassword
                  error={
                    touched?.confirm_password && errors?.confirm_password
                      ? `${t(errors?.confirm_password)}`
                      : undefined
                  }
                  placeholder={t('confirm_password')}
                  // label={t('password')}
                  onChangeText={str => setFieldValue('confirm_password', str)}
                  onBlur={() => setFieldTouched('confirm_password', true)}
                  value={values.confirm_password}
                  containerStyle={{marginBottom: 0}}
                  errorStyle={{marginBottom: 0}}
                />

                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                  }}
                  loading={loading}
                  onPress={() => setOtpModalVisible(true)}
                  title={t('confirm')}
                />
              </>
            ) : (
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Bold label={t('password_changed')} style={styles.txt} />
                  <Bold label={t('congratulations')} style={styles.txt2} />
                  <Medium
                    label={t('you_have_successfully_changed_your_password')}
                    fontSize={mvs(16)}
                    numberOfLines={2}
                    style={{textAlign: 'center'}}
                  />
                  <LottieView
                    source={PasswordChangedAnimation}
                    autoPlay={true}
                    loop={true}
                    style={{width: mvs(200), height: mvs(200)}}
                  />
                </View>

                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                  }}
                  loading={loading}
                  onPress={() => setOtpModalVisible(true)}
                  title={t('back_to_login')}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default ResetPasswordScreen;
