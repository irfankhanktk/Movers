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
import {
  getDriverDocument,
  onPostDriverDocument,
  onStoreVehicle,
} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import {Loader} from 'components/atoms/loader';
const GoodsInTransitScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  // const {documentList} = props?.route?.params;
  const [documentList, setDocumentList] = React.useState('');
  const initialValues = {
    goods_name: documentList?.goods_name || '',
    goods_valid_from: documentList?.goods_valid_from || '',
    goods_expiry_date: documentList?.goods_expiry_date || '',
    // ...(documentList || {}),
  };
  const [loading, setLoading] = React.useState(false);
  const handleFormSubmit = async values => {
    try {
      console.log('values', values);
      // return;

      if (!values.goods_name) {
        Alert.alert('Goods Name is required');
        return; // Return early if validation fails
      }
      function isValidDateFormat(dateString) {
        // Define two regular expressions for the date format parts
        const dateRegex1 = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        const dateRegex2 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // YYYY-MM-DD HH:mm:ss format

        return dateRegex1.test(dateString) || dateRegex2.test(dateString);
      }
      if (!values.goods_valid_from) {
        Alert.alert('issue date is required');
        return; // Return early if validation fails
      } else if (!isValidDateFormat(values.goods_valid_from)) {
        Alert.alert('Invalid date format for Goods issue date');
        return; // Return early if validation fails
      }
      if (!values.goods_expiry_date) {
        Alert.alert('expiry date is required');
        return; // Return early if validation fails
      } else if (!isValidDateFormat(values.goods_expiry_date)) {
        Alert.alert('Invalid date format for Goods expiry date');
        return; // Return early if validation fails
      }
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
                          error={
                            touched?.goods_name ? t(errors.goods_name) : ''
                          }
                          placeholder={t('goods_name')}
                          onChangeText={handleChange('goods_name')}
                          onBlur={handleBlur('goods_name')}
                          value={
                            values.goods_name

                            // || documentList?.goods_name
                          }
                        />
                        <DatePicker
                          onPress={() =>
                            setFieldTouched('goods_valid_from', true)
                          }
                          onChangeText={(str: string) =>
                            setFieldValue('goods_valid_from', str)
                          }>
                          <PrimaryInput
                            isCalendar
                            editable={false}
                            error={
                              touched?.goods_valid_from
                                ? t(errors.goods_valid_from)
                                : ''
                            }
                            placeholder={t('goods_valid_from')}
                            onChangeText={handleChange('goods_valid_from')}
                            onBlur={handleBlur('goods_valid_from', true)}
                            value={
                              values.goods_valid_from
                              //  ||
                              // documentList?.goods_valid_from
                            }
                          />
                        </DatePicker>
                        <DatePicker
                          onPress={() =>
                            setFieldTouched('goods_valid_from', true)
                          }
                          onChangeText={(str: string) =>
                            setFieldValue('goods_expiry_date', str)
                          }>
                          <PrimaryInput
                            isCalendar
                            editable={false}
                            error={
                              touched?.goods_expiry_date
                                ? t(errors.goods_expiry_date)
                                : ''
                            }
                            placeholder={t('goods_expiry_date')}
                            onChangeText={handleChange('goods_expiry_date')}
                            onBlur={handleBlur('goods_valid_from', true)}
                            value={
                              values.goods_expiry_date

                              // ||
                              // documentList?.goods_expiry_date
                            }
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
        )}
      </ScrollView>
    </View>
  );
};
export default GoodsInTransitScreen;
