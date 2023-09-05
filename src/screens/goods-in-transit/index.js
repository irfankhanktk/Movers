import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
import {height, mvs, width} from 'config/metrices';
import {Formik, useFormik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {goBack, navigate, resetStack} from 'navigation/navigation-ref';
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
  GoodsInTransitValidation,
  signinFormValidation,
  VehicleInsuranceValidation,
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
  UploadDocumentsAnimation,
} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {DatePicker} from 'components/atoms/date-picker';
import {onStoreVehicle} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
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

  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const res = await onStoreVehicle(values);
      Alert.alert(res?.message);
      goBack();

      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={GoodsInTransitValidation}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                touched,
                values,
                errors,
              }) => (
                <>
                  {console.log('errror2', errors)}
                  <View style={styles.contentContainerStyleNew}>
                    <KeyboardAvoidScrollview
                      contentContainerStyle={styles.keyboradcontainer}>
                      <Bold
                        label={t('goods_in_transit')}
                        color={colors.bluecolor}
                        fontSize={mvs(16)}
                        style={styles.boldtext}
                      />

                      <PrimaryInput
                        keyboardType={'email-address'}
                        error={touched?.name ? t(errors.name) : ''}
                        placeholder={t('name')}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                      <DatePicker
                        onPress={() => setFieldTouched('valid_from', true)}
                        onChangeText={(str: string) =>
                          setFieldValue('valid_from', str)
                        }>
                        <PrimaryInput
                          isCalendar
                          editable={false}
                          error={
                            touched?.valid_from ? t(errors.valid_from) : ''
                          }
                          placeholder={t('valid_from')}
                          onChangeText={handleChange('valid_from')}
                          onBlur={handleBlur('valid_from', true)}
                          value={values.valid_from}
                        />
                      </DatePicker>
                      <DatePicker
                        onPress={() => setFieldTouched('valid_from', true)}
                        onChangeText={(str: string) =>
                          setFieldValue('expiry_date', str)
                        }>
                        <PrimaryInput
                          isCalendar
                          editable={false}
                          error={
                            touched?.expiry_date ? t(errors.expiry_date) : ''
                          }
                          placeholder={t('expiry_date')}
                          onChangeText={handleChange('expiry_date')}
                          onBlur={handleBlur('valid_from', true)}
                          value={values.expiry_date}
                        />
                      </DatePicker>
                    </KeyboardAvoidScrollview>
                  </View>
                  <View style={{paddingHorizontal: mvs(20)}}>
                    <PrimaryButton
                      containerStyle={styles.regiterbutton}
                      loading={loading}
                      onPress={handleSubmit}
                      title={t('register_now')}
                    />
                  </View>
                </>
              )}
            </Formik>
          </>
        </View>
      </ScrollView>
    </View>
  );
};
export default GoodsInTransitScreen;
