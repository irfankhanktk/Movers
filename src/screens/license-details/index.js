import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {LicenseDetailsValidation} from 'validations';
import styles from './styles';

import {FileSVG, UploadDocumentsAnimation} from 'assets/icons';
import {DatePicker} from 'components/atoms/date-picker';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {
  getDriverDocument,
  onPostDriverDocument,
} from 'services/api/auth-api-actions';
import {pickDocument, UTILS} from 'utils';

const LicenseDetailsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [saveFile, setSaveFile] = React.useState({});
  console.log(saveFile);
  const [documentList, setDocumentList] = React.useState('');
  const [value, setValue] = React.useState('');
  const initialValues = {
    driver_license_no: '',
    license_issue_date: '',
    license_expiry_date: '',
    license_photo: saveFile?.uri || documentList?.license_photo,
  };
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async values => {
    try {
      console.log('values', values);

      setLoading(true);
      values.license_photo = saveFile?.uri;
      const res = await onPostDriverDocument({
        ...values,
        file: img,
        type: 'image',
      });
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
  // const onPressAttachment = async () => {
  //   try {
  //     setFileLoading(true);
  //     const res = await UTILS._returnImageGallery();
  //     console.log(res);
  //     if (res) {
  //       const selectedFile = res;
  //       setSaveFile({
  //         uri: selectedFile.uri,
  //         name: selectedFile.name,
  //       });

  //       console.log('Selected Image:', selectedFile.name);
  //     } else {
  //       // Handle the case where no image was selected.
  //       console.log('No image selected.');
  //     }
  //   } catch (error) {
  //     console.log('error=>>', error);
  //   } finally {
  //     setFileLoading(false);
  //   }
  // };
  const onPressAttachment = async () => {
    try {
      setFileLoading(true);
      const res = await pickDocument();

      const file = {
        ...res[0],
        uri: Platform.OS === 'ios' ? res[0]?.uri : res[0]?.fileCopyUri,
      };
      setSaveFile(file);
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
              validationSchema={LicenseDetailsValidation}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldTouched,
                setFieldValue,
                touched,
                values,
                errors,
              }) => (
                <>
                  {console.log('errror2', errors)}
                  <View style={styles.contentContainerStyleNew}>
                    <KeyboardAvoidScrollview
                      contentContainerStyle={styles.keyboardcontentstyle}>
                      <View style={{marginHorizontal: mvs(20)}}>
                        <Bold
                          label={t('license_details')}
                          color={colors.bluecolor}
                          fontSize={mvs(16)}
                          style={styles.boldtext}
                        />

                        <TouchableOpacity
                          style={styles.uploadphotoview}
                          onPress={() => onPressAttachment()}>
                          {!documentList?.license_photo ? (
                            <Image
                              // label={
                              //   saveFile?.uri || documentList?.license_photo
                              // }
                              source={{
                                uri:
                                  saveFile?.uri || documentList?.license_photo,
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
                                label={t('add_license_photo')}
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
                              touched?.driver_license_no
                                ? t(errors.driver_license_no)
                                : ''
                            }
                            placeholder={t('driver_license_no')}
                            onChangeText={handleChange('driver_license_no')}
                            onBlur={handleBlur('driver_license_no')}
                            value={
                              values.driver_license_no ||
                              documentList?.driver_license_no
                            }
                          />
                          <DatePicker
                            onPress={() =>
                              setFieldTouched('license_issue_date', true)
                            }
                            onChangeText={(str: string) =>
                              setFieldValue('license_issue_date', str)
                            }>
                            <PrimaryInput
                              isCalendar
                              editable={false}
                              error={
                                touched?.license_issue_date
                                  ? t(errors.license_issue_date)
                                  : ''
                              }
                              placeholder={t('license_issue_date')}
                              onChangeText={handleChange('license_issue_date')}
                              onBlur={handleBlur('license_issue_date', true)}
                              value={
                                values.license_issue_date ||
                                documentList?.license_issue_date
                              }
                            />
                          </DatePicker>

                          <DatePicker
                            onPress={() =>
                              setFieldTouched('license_expiry_date', true)
                            }
                            onChangeText={(str: string) =>
                              setFieldValue('license_expiry_date', str)
                            }>
                            <PrimaryInput
                              isCalendar
                              editable={false}
                              error={
                                touched?.license_expiry_date
                                  ? t(errors.license_expiry_date)
                                  : ''
                              }
                              placeholder={t('license_expiry_date')}
                              onChangeText={handleChange('license_expiry_date')}
                              onBlur={handleBlur('license_expiry_date', true)}
                              value={
                                values.license_expiry_date ||
                                documentList?.license_expiry_date
                              }
                            />
                          </DatePicker>
                        </View>
                      </View>
                    </KeyboardAvoidScrollview>
                  </View>
                  <View style={{paddingHorizontal: mvs(20)}}>
                    <PrimaryButton
                      containerStyle={styles.resgiterbutton}
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
export default LicenseDetailsScreen;
