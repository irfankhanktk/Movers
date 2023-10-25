import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
import {height, mvs, width} from 'config/metrices';
import {Formik, useFormik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {goBack, navigate, resetStack} from 'navigation/navigation-ref';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
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
  signinFormValidation,
  VehicleInsuranceValidation,
} from 'validations';
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';

import {
  Clock,
  FacBookIcon,
  FileSVG,
  ForgotPasswordAnimation,
  GoogleIcon,
  LoginAnimation,
  UploadDocumentsAnimation,
} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Regular from 'typography/regular-text';
import UploadDocumentTile from 'components/molecules/upload-document-tile';
import {pickDocument, UTILS} from 'utils';
import {postFormData} from 'services/api';
import {DatePicker} from 'components/atoms/date-picker';
import {
  getDriverDocument,
  onPostDriverDocument,
  onStoreVehicle,
} from 'services/api/auth-api-actions';
import {Loader} from 'components/atoms/loader';

const VehicleInsuranceScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [saveFile, setSaveFile] = React.useState({});
  const [value, setValue] = React.useState('');
  const initialValues = {
    insurance_company: '',
    insurance_valid_from: '',
    insurance_expiry_date: '',
    vehicle_insurance_photo: '' || documentList?.vehicle_insurance_photo,
  };
  const [documentList, setDocumentList] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async values => {
    try {
      console.log('values', values);
      if (!saveFile || !saveFile.uri) {
        // Check if license_photo is empty
        Alert.alert('Photo is required');
        return; // Return early if validation fails
      }
      setLoading(true);
      values.vehicle_insurance_photo = saveFile ? saveFile.uri : '';
      const res = await onPostDriverDocument({
        ...values,
        vehicle_insurance_photo: saveFile,
      });
      Alert.alert(res?.data?.message);
      goBack();

      console.log(res?.data);
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
  const onPressAttachment = async () => {
    try {
      setFileLoading(true);
      const res = await UTILS._returnImageGallery();
      console.log(res);
      if (res) {
        const selectedFile = res;
        setSaveFile({
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: selectedFile?.type,
        });

        console.log('Selected Image:', selectedFile.name);
      } else {
        // Handle the case where no image was selected.
        console.log('No image selected.');
      }
    } catch (error) {
      console.log('error=>>', error);
    } finally {
      setFileLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Image source={IMG.LogoBackground} style={styles.backgroiundimg} />
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
                validationSchema={VehicleInsuranceValidation}
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
                        contentContainerStyle={styles.keyboradconetnt}>
                        <View style={{marginHorizontal: mvs(20)}}>
                          <Bold
                            label={t('vehicle_insurance')}
                            color={colors.bluecolor}
                            fontSize={mvs(16)}
                            style={styles.boldtext}
                          />

                          <TouchableOpacity
                            style={styles.uploadphotoview}
                            onPress={() => onPressAttachment()}>
                            {documentList?.vehicle_insurance_photo ||
                            saveFile?.uri ? (
                              <Image
                                // label={
                                //   saveFile?.uri || documentList?.license_photo
                                // }
                                source={{
                                  uri:
                                    saveFile?.uri ||
                                    documentList?.vehicle_insurance_photo,
                                }}
                                resizeMode="cover"
                                style={{width: mvs(50), height: mvs(50)}}
                                // color={colors.primary}
                                // fontSize={mvs(14)}
                                // style={styles.filenametext}
                              />
                            ) : (
                              <Row style={{justifyContent: 'center'}}>
                                <FileSVG width={mvs(25)} height={mvs(25)} />
                                <Medium
                                  label={t('add_vehicle_insurance_photo')}
                                  color={colors.primary}
                                  fontSize={mvs(14)}
                                  style={{marginLeft: mvs(10)}}
                                />
                              </Row>
                            )}
                          </TouchableOpacity>
                          <View style={{marginVertical: mvs(14)}}>
                            <PrimaryInput
                              keyboardType={'email-address'}
                              error={
                                touched?.insurance_company
                                  ? t(errors.insurance_company)
                                  : ''
                              }
                              placeholder={t('insurance_company')}
                              onChangeText={handleChange('insurance_company')}
                              onBlur={handleBlur('insurance_company')}
                              value={
                                values.insurance_company ||
                                documentList?.insurance_company
                              }
                            />
                            <DatePicker
                              onPress={() =>
                                setFieldTouched('insurance_valid_from', true)
                              }
                              onChangeText={(str: string) =>
                                setFieldValue('insurance_valid_from', str)
                              }>
                              <PrimaryInput
                                isCalendar
                                editable={false}
                                error={
                                  touched?.insurance_valid_from
                                    ? t(errors.insurance_valid_from)
                                    : ''
                                }
                                placeholder={t('insurance_valid_from')}
                                onChangeText={handleChange(
                                  'insurance_valid_from',
                                )}
                                onBlur={handleBlur(
                                  'insurance_valid_from',
                                  true,
                                )}
                                value={
                                  values.insurance_valid_from ||
                                  documentList?.insurance_valid_from
                                }
                              />
                            </DatePicker>

                            <DatePicker
                              onPress={() =>
                                setFieldTouched('insurance_expiry_date', true)
                              }
                              onChangeText={(str: string) =>
                                setFieldValue('insurance_expiry_date', str)
                              }>
                              <PrimaryInput
                                isCalendar
                                editable={false}
                                error={
                                  touched?.insurance_expiry_date
                                    ? t(errors.insurance_expiry_date)
                                    : ''
                                }
                                placeholder={t('insurance_expiry_date')}
                                onChangeText={handleChange(
                                  'insurance_expiry_date',
                                )}
                                onBlur={handleBlur(
                                  'insurance_expiry_date',
                                  true,
                                )}
                                value={
                                  values.insurance_expiry_date ||
                                  documentList?.insurance_expiry_date
                                }
                              />
                            </DatePicker>
                          </View>
                        </View>
                      </KeyboardAvoidScrollview>
                    </View>
                    <View style={{paddingHorizontal: mvs(20)}}>
                      <PrimaryButton
                        containerStyle={styles.registerbuton}
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
export default VehicleInsuranceScreen;
