import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
import {height, mvs, width} from 'config/metrices';
import {Formik, useFormik} from 'formik';
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
import {signinFormValidation, signupDetailsFormValidation} from 'validations';
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import {Clock, FacBookIcon, GoogleIcon, LoginAnimation} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {onLogin} from 'services/api/auth-api-actions';
import {requestNotifications} from 'react-native-permissions';
import ResendOtpModal from 'components/molecules/modals/ResendOtp-modal';
import {UTILS} from 'utils';
const LoginScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [email, setEmail] = React.useState('');
  const initialValues = {
    email: '',
    password: '',
    // fcm_token: '123456',
    type: 'Driver',
  };
  const [loading, setLoading] = React.useState(false);
  // const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
  //   useFormik({
  //     initialValues: initialValues,
  //     validateOnBlur: true,
  //     validateOnChange: true,
  //     validationSchema: signinFormValidation,
  //     onSubmit: () => {},
  //   });

  React.useEffect(() => {
    async function requestPermission() {
      const result = await requestNotifications(['alert', 'sound', 'badge']);
      if (result.status === 'granted') {
        // Notifications allowed
      } else {
        // Notifications not allowed
      }
    }

    requestPermission();
  }, []);
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      return true;
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
      return true;
    } else {
      console.log('User has notification permissions disabled');
      return false;
    }
  }

  // const handleFormSubmit = async values => {
  //   try {
  //     await checkApplicationPermission();
  //     let fcmToken = '123456';
  //     try {
  //       setLoading(true);
  //       fcmToken = await messaging().getToken();
  //     } catch (error) {
  //       console.log('fcm token error', error);
  //     }
  //     dispatch(
  //       onLogin(
  //         {...values, fcm_token: fcmToken, online_status: '0'},
  //         setLoading,
  //       ),
  //     );
  //   } catch (error) {
  //     console.log('error=>', error);
  //     setLoading(false);
  //   }
  // };
  const handleFormSubmit = async values => {
    try {
      await checkApplicationPermission();
      let fcmToken = '123456';
      try {
        setLoading(true);
        fcmToken = await messaging().getToken();
      } catch (error) {
        console.log('fcm token error', error);
      }
      const res = await dispatch(
        onLogin(
          {...values, fcm_token: fcmToken, online_status: '0'},
          setLoading,
        ),
      );
      console.log('res', res);
      // return;
      // if (UTILS.returnError('Please verify your email first')) {
      //   setOtpModalVisible(true);
      //   setEmail(values.email);
      // }
      // Check if the response indicates email verification is required
    } catch (error) {
      console.log('error=ss>', error);

      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={IMG.LogoBackground} style={styles.imagebackground} />
      <View style={styles.loginlogoview}>
        <Image
          source={IMG.LoginLogo}
          resizeMode={'contain'}
          style={{width: mvs(300), height: mvs(100)}}
        />
      </View>

      <View style={styles.contentContainerStyle}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboradscrollcontent}>
          <View style={styles.contentContainerStyleNew}>
            <View style={styles.lottieview}>
              {/* <LottieView
                source={LoginAnimation}
                autoPlay={true}
                loop={true}
                style={{width: mvs(100), height: mvs(100)}}
              /> */}
              <Medium
                label={t('login')}
                fontSize={mvs(16)}
                color={colors.black}
              />
            </View>
            <Bold
              label={t('login_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.loginmoverstext}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={signinFormValidation}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                touched,
                values,
                errors,
              }) => (
                <>
                  {console.log('errror2', errors)}
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.email ? t(errors.email) : ''}
                    placeholder={t('email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <PrimaryInput
                    isPassword
                    error={touched?.password ? t(errors.password) : ''}
                    placeholder={t('password')}
                    // label={t('password')}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    containerStyle={{marginBottom: 0}}
                    errorStyle={{marginBottom: 0}}
                  />
                  {/* <Row> */}
                  <TouchableOpacity
                    style={styles.forgotpasswordview}
                    onPress={() => navigate('ForgotPasswordScreen')}>
                    <Medium
                      label={t('forgot_password?')}
                      style={{textDecorationLine: 'underline'}}
                      color={colors.bluecolor}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                      style={styles.forgotpasswordview}
                      onPress={() => navigate('ForgotPasswordScreen')}>
                      <Medium
                        label={'Resend OTP'}
                        style={{textDecorationLine: 'underline'}}
                        color={colors.bluecolor}
                      />
                    </TouchableOpacity> */}
                  {/* </Row> */}
                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(10),
                    }}
                    loading={loading}
                    onPress={handleSubmit}
                    title={t('login')}
                  />
                  <View style={styles.createaccountview}>
                    <Medium
                      label={t('or_create_a_new_account')}
                      color={colors.black}
                    />
                  </View>

                  <PrimaryButton
                    containerStyle={styles.signupbuttoncontainer}
                    // loading={loading}
                    onPress={() => navigate('Signup')}
                    title={t('sign_up')}
                  />
                </>
              )}
            </Formik>
            {/* <View style={styles.createaccountview}>
              <Medium label={t('login_with')} />
            </View> */}
            {/* <Row style={{marginTop: mvs(10)}}>
              <TouchableOpacity style={styles.googlebutton}>
                <Row style={styles.googlefacebookview}>
                  <GoogleIcon height={mvs(20)} width={mvs(20)} />
                  <Medium label={t('google')} style={{marginLeft: mvs(10)}} />
                </Row>
              </TouchableOpacity>
              <TouchableOpacity style={styles.googlebutton}>
                <Row style={styles.googlefacebookview}>
                  <FacBookIcon height={mvs(20)} width={mvs(20)} />
                  <Medium label={t('facebook')} style={{marginLeft: mvs(10)}} />
                </Row>
              </TouchableOpacity>
            </Row> */}
            {/* <OtpModal
              onClose={() => setOtpModalVisible(false)}
              visible={otpModalVisible}
              setValue={setValue}
              value={value}
            /> */}
            <ResendOtpModal
              email={email}
              // email={props?.route?.params?.email}
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
          </View>
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default LoginScreen;
