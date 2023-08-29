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
import {
  Clock,
  FacBookIcon,
  ForgotPasswordAnimation,
  GoogleIcon,
  LoginAnimation,
} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {onForgot} from 'services/api/auth-api-actions';
const ForgotPasswordScreen = props => {
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
      setLoading(true);
      const res = await onForgot(values);
      setLoading(false);
      console.log('res===>>>>> forgot', res);
      navigate('ResetPasswordScreen');
      // setOtpModalVisible(true);
    } catch (error) {
      console.log('error=>', error);
      setLoading(false);
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
          contentContainerStyle={styles.keyboradscrollcontent}>
          <View style={styles.contentContainerStyleNew}>
            <View style={styles.lottiview}>
              <LottieView
                source={ForgotPasswordAnimation}
                autoPlay={true}
                loop={true}
                style={{width: mvs(100), height: mvs(100)}}
              />
            </View>
            <Bold
              label={t('forgot_password')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.forgottext}
            />

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.email && errors?.email
                  ? `${t(errors?.email)}`
                  : undefined
              }
              placeholder={t('email')}
              onChangeText={str => setFieldValue('email', str)}
              onBlur={() => setFieldTouched('email', true)}
              value={values.email}
            />

            {/* <PrimaryButton
              containerStyle={{
                borderRadius: mvs(10),
              }}
              loading={loading}
              title={t('send')}
            /> */}
            <PrimaryButton
              containerStyle={{
                borderRadius: mvs(10),
              }}
              // disabled={
              //   Object.keys(errors).length > 0 ||
              //   Object.keys(touched).length === 0
              // }
              loading={loading}
              // onPress={() => navigate('ResetPasswordScreen')}
              onPress={onSubmit}
              title={t('send')}
            />
          </View>
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default ForgotPasswordScreen;
