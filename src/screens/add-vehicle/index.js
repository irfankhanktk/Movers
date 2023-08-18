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
const AddVehicleScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    vehicle_name: '',
    vehcile_no: '',
    vehcile_registration: '',
    vehcile_engine_no: '',
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
      <ImageBackground
        source={IMG.addvehcilebackground}
        style={styles.backgroundimg}>
        <Header1x2x title={t('add_vehicle')} />
        <View style={styles.truckimageview}>
          <Image
            source={IMG.truckvehicle}
            resizeMode={'contain'}
            style={{width: mvs(248), height: mvs(169)}}
          />
        </View>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboardcontentcontainer}>
          <View style={styles.contentContainerStyle}>
            <View style={styles.contentContainerStyleNew}>
              <Bold
                label={t('add_vehicle')}
                color={colors.bluecolor}
                fontSize={mvs(16)}
                style={styles.boldtext}
              />

              <PrimaryInput
                keyboardType={'email-address'}
                error={
                  touched?.vehicle_name && errors?.vehicle_name
                    ? `${t(errors?.vehicle_name)}`
                    : undefined
                }
                placeholder={t('vehicle_name')}
                onChangeText={str => setFieldValue('vehicle_name', str)}
                onBlur={() => setFieldTouched('vehicle_name', true)}
                value={values.vehicle_name}
              />
              <PrimaryInput
                keyboardType={'email-address'}
                error={
                  touched?.vehcile_no && errors?.vehcile_no
                    ? `${t(errors?.vehcile_no)}`
                    : undefined
                }
                placeholder={t('vehcile_no')}
                onChangeText={str => setFieldValue('vehcile_no', str)}
                onBlur={() => setFieldTouched('vehcile_no', true)}
                value={values.vehcile_no}
              />
              <PrimaryInput
                keyboardType={'email-address'}
                error={
                  touched?.vehcile_registration && errors?.vehcile_registration
                    ? `${t(errors?.vehcile_registration)}`
                    : undefined
                }
                placeholder={t('vehcile_registration')}
                onChangeText={str => setFieldValue('vehcile_registration', str)}
                onBlur={() => setFieldTouched('vehcile_registration', true)}
                value={values.vehcile_registration}
              />
              <PrimaryInput
                keyboardType={'email-address'}
                error={
                  touched?.vehcile_engine_no && errors?.vehcile_engine_no
                    ? `${t(errors?.vehcile_engine_no)}`
                    : undefined
                }
                placeholder={t('vehcile_engine_no')}
                onChangeText={str => setFieldValue('vehcile_engine_no', str)}
                onBlur={() => setFieldTouched('vehcile_engine_no', true)}
                value={values.vehcile_engine_no}
              />

              <PrimaryButton
                containerStyle={styles.savebutton}
                loading={loading}
                onPress={() => navigate('ResetPasswordScreen')}
                title={t('save')}
              />
            </View>
          </View>
        </KeyboardAvoidScrollview>
      </ImageBackground>
    </View>
  );
};
export default AddVehicleScreen;
