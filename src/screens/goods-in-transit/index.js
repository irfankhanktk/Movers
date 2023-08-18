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
import {DatePicker} from 'components/atoms/date-picker';
const GoodsInTransitScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    name: '',
    valid_from: '',
    expiry_date: '',
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
            contentContainerStyle={{
              paddingHorizontal: mvs(0),
              flexGrow: 0,
              paddingBottom: mvs(150),
            }}>
            <Bold
              label={t('goods_in_transit')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={{marginTop: mvs(10), marginBottom: mvs(20)}}
            />

            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.name && errors?.name ? `${t(errors?.name)}` : undefined
              }
              placeholder={t('name')}
              onChangeText={str => setFieldValue('name', str)}
              onBlur={() => setFieldTouched('name', true)}
              value={values.name}
            />
            <DatePicker
              onChangeText={(str: string) => setFieldValue('valid_from', str)}>
              <PrimaryInput
                editable={false}
                error={
                  errors?.valid_from && touched?.valid_from
                    ? `${errors?.valid_from}`
                    : ''
                }
                placeholder={t('valid_from')}
                onChangeText={str => setFieldValue('valid_from', str)}
                value={values.valid_from}
              />
            </DatePicker>
            <DatePicker
              onChangeText={(str: string) => setFieldValue('expiry_date', str)}>
              <PrimaryInput
                editable={false}
                error={
                  errors?.expiry_date && touched?.expiry_date
                    ? `${errors?.expiry_date}`
                    : ''
                }
                placeholder={t('expiry_date')}
                onChangeText={str => setFieldValue('expiry_date', str)}
                value={values.expiry_date}
              />
            </DatePicker>

            <PrimaryButton
              containerStyle={{
                borderRadius: mvs(10),
                marginTop: mvs(20),
              }}
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
export default GoodsInTransitScreen;
