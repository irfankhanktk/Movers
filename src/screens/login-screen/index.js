import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
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
import {Clock, FacBookIcon, GoogleIcon, LoginAnimation} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const LoginScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
    password: '',
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
      {/* <Header1x2x title={t('login')} /> */}
      {/* <View style={styles.container}> */}
      <Image
        source={IMG.LogoBackground}
        style={{
          height: mvs(400),
          width: width,
          position: 'absolute',
        }}
      />
      <View style={{alignSelf: 'center', marginTop: mvs(20)}}>
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {/* <Bold label={t('login')} style={styles.txt} /> */}
              <LottieView
                source={LoginAnimation}
                autoPlay={true}
                loop={true}
                style={{width: mvs(100), height: mvs(100)}}
              />
            </View>
            <Bold
              label={t('login_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={{marginTop: mvs(10), marginBottom: mvs(20)}}
            />
            {/* <KeyboardAvoidScrollview> */}
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.email && errors?.email
                  ? `${t(errors?.email)}`
                  : undefined
              }
              // label={t('email')}
              placeholder={t('email')}
              onChangeText={str => setFieldValue('email', str)}
              onBlur={() => setFieldTouched('email', true)}
              value={values.email}
            />
            <PrimaryInput
              isPassword
              error={
                touched?.password && errors?.password
                  ? `${t(errors?.password)}`
                  : undefined
              }
              placeholder={t('password')}
              // label={t('password')}
              onChangeText={str => setFieldValue('password', str)}
              onBlur={() => setFieldTouched('password', true)}
              value={values.password}
              containerStyle={{marginBottom: 0}}
              errorStyle={{marginBottom: 0}}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginBottom: mvs(15)}}
              onPress={() => navigate('ForgotPasswordScreen')}>
              <Medium
                label={t('forgot_password?')}
                style={{textDecorationLine: 'underline'}}
                color={colors.bluecolor}
              />
            </TouchableOpacity>
            <PrimaryButton
              containerStyle={{
                borderRadius: mvs(10),
              }}
              loading={loading}
              onPress={onSubmit}
              title={t('login')}
            />
            <View
              style={{
                alignSelf: 'center',
                marginTop: mvs(20),
              }}>
              <Medium label={t('or_create_a_new_account')} />
            </View>

            <PrimaryButton
              containerStyle={{
                backgroundColor: colors.bluecolor,
                marginTop: mvs(20),
                borderRadius: mvs(10),
              }}
              loading={loading}
              onPress={() => navigate('Signup')}
              title={t('sign_up')}
            />
            <View
              style={{
                alignSelf: 'center',
                marginTop: mvs(20),
              }}>
              <Medium label={t('login_with')} />
            </View>
            <Row style={{marginTop: mvs(10)}}>
              <TouchableOpacity style={styles.googlebutton}>
                <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                  <GoogleIcon height={mvs(20)} width={mvs(20)} />
                  <Medium label={t('google')} style={{marginLeft: mvs(10)}} />
                </Row>
              </TouchableOpacity>
              <TouchableOpacity style={styles.googlebutton}>
                <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                  <FacBookIcon height={mvs(20)} width={mvs(20)} />
                  <Medium label={t('facebook')} style={{marginLeft: mvs(10)}} />
                </Row>
              </TouchableOpacity>
            </Row>
            <OtpModal
              onClose={() => setOtpModalVisible(false)}
              visible={otpModalVisible}
              setValue={setValue}
              value={value}
            />
            {/* </KeyboardAvoidScrollview> */}
          </View>
        </KeyboardAvoidScrollview>
      </View>

      {/* <View style={styles.button}>
        </View> */}
      {/* </Image> */}
      {/* </View> */}
    </View>
  );
};
export default LoginScreen;
