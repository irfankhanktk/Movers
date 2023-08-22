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
const CompanyDetailsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    legal_identity: '',
    compnay_registration: '',
    vat_registration: '',
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
            contentContainerStyle={styles.keyboardcontenview}>
            <Bold
              label={t('company_details')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.legal_identity && errors?.legal_identity
                  ? `${t(errors?.legal_identity)}`
                  : undefined
              }
              placeholder={t('legal_identity')}
              onChangeText={str => setFieldValue('legal_identity', str)}
              onBlur={() => setFieldTouched('legal_identity', true)}
              value={values.legal_identity}
            />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.compnay_registration && errors?.compnay_registration
                  ? `${t(errors?.compnay_registration)}`
                  : undefined
              }
              placeholder={t('compnay_registration')}
              onChangeText={str => setFieldValue('compnay_registration', str)}
              onBlur={() => setFieldTouched('compnay_registration', true)}
              value={values.compnay_registration}
            />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.vat_registration && errors?.vat_registration
                  ? `${t(errors?.vat_registration)}`
                  : undefined
              }
              placeholder={t('vat_registration')}
              onChangeText={str => setFieldValue('vat_registration', str)}
              onBlur={() => setFieldTouched('vat_registration', true)}
              value={values.vat_registration}
            />
          </KeyboardAvoidScrollview>
        </View>
      </View>
      <View style={{paddingHorizontal: mvs(20)}}>
        <PrimaryButton
          containerStyle={styles.registernowbutton}
          loading={loading}
          onPress={() => navigate('ResetPasswordScreen')}
          title={t('register_now')}
        />
      </View>
    </View>
  );
};
export default CompanyDetailsScreen;
