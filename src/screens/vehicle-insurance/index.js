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
import {onStoreVehicle} from 'services/api/auth-api-actions';

const VehicleInsuranceScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [saveFile, setSaveFile] = React.useState(null);
  const [value, setValue] = React.useState('');
  const initialValues = {
    insurance_company: '',
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
  const onPressAttachment = async () => {
    try {
      setFileLoading(true);
      const res = await UTILS._returnImageGallery();

      setSaveFile(res);
      // const response = await postFormData({
      //   file: {
      //     ...res[0],
      //     uri: Platform.OS === 'ios' ? res[0]?.uri : res[0]?.fileCopyUri,
      //   },
      // });
      //value array is maintained to be upload to server
      // setFiles([...files, response?.data?.data || {}]);
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
                          {saveFile?.uri ? (
                            <Medium
                              label={saveFile?.name}
                              color={colors.primary}
                              fontSize={mvs(14)}
                              style={styles.uploadedtext}
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
                            value={values.insurance_company}
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
                            onPress={() => setFieldTouched('expiry_date', true)}
                            onChangeText={(str: string) =>
                              setFieldValue('expiry_date', str)
                            }>
                            <PrimaryInput
                              isCalendar
                              editable={false}
                              error={
                                touched?.expiry_date
                                  ? t(errors.expiry_date)
                                  : ''
                              }
                              placeholder={t('expiry_date')}
                              onChangeText={handleChange('expiry_date')}
                              onBlur={handleBlur('expiry_date', true)}
                              value={values.expiry_date}
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
      </ScrollView>
    </View>
  );
};
export default VehicleInsuranceScreen;
