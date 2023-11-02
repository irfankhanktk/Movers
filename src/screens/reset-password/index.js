import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';

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
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {
  signinFormValidation,
  signupDetailsFormValidation,
  updatePasswordValidation,
} from 'validations';
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
import SignUpModal from 'components/molecules/modals/SignUp-modal';
import ForgotOtpModal from 'components/molecules/modals/forgot-otp-modal';
import {onUpdatePassword} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
const ResetPasswordScreen = props => {
  const dispatch = useAppDispatch();
  const {values} = props?.route?.params;
  console.log('values props', props?.route?.params);
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    // email: '',
    password: '',
    confirm_password: '',
    type: 'Driver',
  };
  const [loading, setLoading] = React.useState(false);
  const [verifyloading, setVerifyLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  const handleFormSubmit = async values => {
    setData(values);
    setOtpModalVisible(true);
  };
  const handleVerify = async () => {
    try {
      setVerifyLoading(true);
      const res = await onUpdatePassword({
        ...data,
        otp: value,
        ...props?.route?.params,
      });
      console.log('res==>', res);
      if (res?.status == true) {
        setOtpModalVisible(false);
        setIsPasswordChanged(true);
      }
      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setVerifyLoading(false);
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
            <Formik
              initialValues={initialValues}
              validationSchema={updatePasswordValidation}
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
                  {!isPasswordChanged ? (
                    <>
                      <View style={styles.lottiview}>
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
                        style={styles.resetpasswordtext}
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
                        errorStyle={{marginBottom: 10}}
                      />
                      <PrimaryInput
                        isPassword
                        error={
                          touched?.confirm_password
                            ? t(errors.confirm_password)
                            : ''
                        }
                        placeholder={t('confirm_password')}
                        // label={t('password')}
                        onChangeText={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')}
                        value={values.confirm_password}
                        containerStyle={{marginBottom: 0}}
                        errorStyle={{marginBottom: 5}}
                      />

                      <PrimaryButton
                        containerStyle={{
                          borderRadius: mvs(10),
                        }}
                        loading={loading}
                        onPress={handleSubmit}
                        title={t('confirm')}
                      />
                    </>
                  ) : (
                    <View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Bold
                          label={t('password_changed')}
                          style={styles.txt}
                        />
                        <Bold
                          label={t('congratulations')}
                          style={styles.txt2}
                        />
                        <Medium
                          label={t(
                            'you_have_successfully_changed_your_password',
                          )}
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
                        onPress={() => navigate('Login')}
                        title={t('back_to_login')}
                      />
                    </View>
                  )}
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidScrollview>
      </View>

      <ForgotOtpModal
        email={props?.route?.params?.email}
        onClose={() => setOtpModalVisible(false)}
        loading={verifyloading}
        visible={otpModalVisible}
        setValue={setValue}
        onPress={handleVerify}
        value={value}
        {...props}
        isSignup={false}
        // onPress={handleSubmit}
        // // email={values?.email}
        // onClose={() => setOtpModalVisible(false)}
        // visible={otpModalVisible}
        // setValue={setValue}
        // value={value}
        // {...props}
      />
    </View>
  );
};
export default ResetPasswordScreen;
