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
  BankDetailsValidation,
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
import {
  getDriverDocument,
  onPostDriverDocument,
  onStoreVehicle,
} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
const BankDetailsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [documentList, setDocumentList] = React.useState('');

  const initialValues = {
    bank_name: '',
    account_title: '',
    sort_code: '',
    account_number: '',
  };
  const [loading, setLoading] = React.useState(false);
  const handleFormSubmit = async values => {
    try {
      console.log('values', values);
      // return;
      setLoading(true);
      const res = await onPostDriverDocument(values);
      Alert.alert(res?.message);
      // goBack();

      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getDriverDocument();
      setDocumentList(res?.driverDetails);

      console.log(res?.driverDetails);
    } catch (error) {
      setLoading(false);
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
              validationSchema={BankDetailsValidation}
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
                      contentContainerStyle={styles.keyboardcontainer}>
                      <Bold
                        label={t('bank_details')}
                        color={colors.bluecolor}
                        fontSize={mvs(16)}
                        style={styles.boldtext}
                      />

                      <PrimaryInput
                        keyboardType={'email-address'}
                        error={touched?.bank_name ? t(errors.bank_name) : ''}
                        placeholder={t('bank_name')}
                        onChangeText={handleChange('bank_name')}
                        onBlur={handleBlur('bank_name')}
                        value={values.bank_name || documentList?.bank_name}
                      />
                      <PrimaryInput
                        keyboardType={'email-address'}
                        error={
                          touched?.account_title ? t(errors.account_title) : ''
                        }
                        placeholder={t('account_title')}
                        onChangeText={handleChange('account_title')}
                        onBlur={handleBlur('account_title')}
                        value={
                          values.account_title || documentList?.account_title
                        }
                      />
                      <PrimaryInput
                        keyboardType={'email-address'}
                        error={touched?.sort_code ? t(errors.sort_code) : ''}
                        placeholder={t('sort_code')}
                        onChangeText={handleChange('sort_code')}
                        onBlur={handleBlur('sort_code')}
                        value={values.sort_code || documentList?.sort_code}
                      />
                      <PrimaryInput
                        keyboardType={'email-address'}
                        error={
                          touched?.account_number
                            ? t(errors.account_number)
                            : ''
                        }
                        placeholder={t('account_number')}
                        onChangeText={handleChange('account_number')}
                        onBlur={handleBlur('account_number')}
                        value={
                          values.account_number || documentList?.account_number
                        }
                      />
                    </KeyboardAvoidScrollview>
                  </View>
                  <View style={{paddingHorizontal: mvs(20)}}>
                    <PrimaryButton
                      containerStyle={styles.registerbutton}
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
export default BankDetailsScreen;
