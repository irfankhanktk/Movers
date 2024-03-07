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
  addVheicleValidation,
  CompanyDetailsValidation,
  signinFormValidation,
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
import {Loader} from 'components/atoms/loader';
const CompanyDetailsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [documentList, setDocumentList] = React.useState('');
  const initialValues = {
    legal_identity: documentList?.legal_identity || '',
    company_reg: documentList?.company_reg || '',
    vat_reg: documentList?.vat_reg || '',
    // ...(props?.route?.params?.documentList || {}),
  };
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async values => {
    try {
      console.log('values', values);
      if (!values.legal_identity) {
        Alert.alert('Legal Identity is required');
        return; // Return early if validation fails
      }
      if (!values.company_reg) {
        Alert.alert('Company Registration number is required');
        return; // Return early if validation fails
      }
      if (!values.vat_reg) {
        Alert.alert('VAT Registration number is required');
        return; // Return early if validation fails
      }
      // return;
      setLoading(true);
      const res = await onPostDriverDocument(values);
      Alert.alert(res?.data?.message);
      goBack();

      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  // const handleFormSubmit = async values => {
  //   try {
  //     console.log('values', values);
  //     // return;
  //     setLoading(true);
  //     const res = await onPostDriverDocument(values);
  //     Alert.alert(res?.data?.message);
  //     goBack();

  //     console.log(res);
  //   } catch (error) {
  //     Alert.alert('Error', UTILS.returnError(error));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.contentContainerStyle}>
            <>
              <Formik
                initialValues={initialValues}
                // validationSchema={CompanyDetailsValidation}
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
                    <View style={styles.contentContainerStyleNew}>
                      <KeyboardAvoidScrollview
                        contentContainerStyle={styles.keyboardcontenview}>
                        <View style={{marginHorizontal: mvs(20)}}>
                          <Bold
                            label={t('company_details')}
                            color={colors.bluecolor}
                            fontSize={mvs(16)}
                            style={styles.boldtext}
                          />
                          <View style={{marginVertical: mvs(14)}}>
                            <PrimaryInput
                              keyboardType={'email-address'}
                              error={
                                touched?.legal_identity
                                  ? t(errors.legal_identity)
                                  : ''
                              }
                              placeholder={t('legal_identity')}
                              onChangeText={handleChange('legal_identity')}
                              onBlur={handleBlur('legal_identity')}
                              value={
                                values.legal_identity
                                //  || documentList?.legal_identity
                              }
                            />
                            <PrimaryInput
                              keyboardType={'email-address'}
                              error={
                                touched?.company_reg
                                  ? t(errors.company_reg)
                                  : ''
                              }
                              placeholder={t('compnay_registration')}
                              onChangeText={handleChange('company_reg')}
                              onBlur={handleBlur('company_reg')}
                              value={
                                values.company_reg
                                // || documentList?.company_reg
                              }
                            />
                            <PrimaryInput
                              keyboardType={'email-address'}
                              error={touched?.vat_reg ? t(errors.vat_reg) : ''}
                              placeholder={t('vat_registration')}
                              onChangeText={handleChange('vat_reg')}
                              onBlur={handleBlur('vat_reg')}
                              value={
                                values.vat_reg
                                //  || documentList?.vat_reg
                              }
                            />
                          </View>
                        </View>
                      </KeyboardAvoidScrollview>
                    </View>
                    <View style={{paddingHorizontal: mvs(20)}}>
                      <PrimaryButton
                        containerStyle={styles.registernowbutton}
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
        )}
      </ScrollView>
    </View>
  );
};
export default CompanyDetailsScreen;
