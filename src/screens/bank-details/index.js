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
  UploadDocumentsAnimation,
} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
const BankDetailsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    bank_name: '',
    account_title: '',
    sort_code: '',
    account_number: '',
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
      <Image source={IMG.LogoBackground} style={styles.backgroundimg} />
      <Header1x2x />
      <View style={{alignSelf: 'center'}}>
        <LottieView
          source={UploadDocumentsAnimation}
          autoPlay={true}
          loop={true}
          style={{width: mvs(200), height: mvs(200)}}
        />
      </View>

      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboardcontainer}>
            <Bold
              label={t('bank_details')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.bank_name && errors?.bank_name
                  ? `${t(errors?.bank_name)}`
                  : undefined
              }
              placeholder={t('bank_name')}
              onChangeText={str => setFieldValue('bank_name', str)}
              onBlur={() => setFieldTouched('bank_name', true)}
              value={values.bank_name}
            />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.account_title && errors?.account_title
                  ? `${t(errors?.account_title)}`
                  : undefined
              }
              placeholder={t('account_title')}
              onChangeText={str => setFieldValue('account_title', str)}
              onBlur={() => setFieldTouched('account_title', true)}
              value={values.account_title}
            />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.sort_code && errors?.sort_code
                  ? `${t(errors?.sort_code)}`
                  : undefined
              }
              placeholder={t('sort_code')}
              onChangeText={str => setFieldValue('sort_code', str)}
              onBlur={() => setFieldTouched('sort_code', true)}
              value={values.sort_code}
            />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.account_number && errors?.account_number
                  ? `${t(errors?.account_number)}`
                  : undefined
              }
              placeholder={t('account_number')}
              onChangeText={str => setFieldValue('account_number', str)}
              onBlur={() => setFieldTouched('account_number', true)}
              value={values.account_number}
            />

            <PrimaryButton
              containerStyle={styles.registerbutton}
              loading={loading}
              onPress={() => navigate('ResetPasswordScreen')}
              title={t('register_now')}
            />
          </KeyboardAvoidScrollview>
        </View>
      </View>
    </View>
  );
};
export default BankDetailsScreen;
