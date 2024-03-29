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
import DocumentPicker from 'react-native-document-picker';
import Regular from 'typography/regular-text';
import {Loader} from 'components/atoms/loader';
import {goBack} from 'navigation/navigation-ref';
import ImageView from 'react-native-image-viewing';
const LicenseDetailsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [saveFile, setSaveFile] = React.useState({});
  console.log(saveFile);
  const [documentList, setDocumentList] = React.useState('');
  const [value, setValue] = React.useState('');
  // const [selectedFile, setSelectedFile] = useState(null);
  const [showImage, setShowImage] = React.useState(false);
  const [visible, setIsVisible] = React.useState(false);
  const [imageUri, setImageUri] = React.useState('');
  const initialValues = {
    driver_license_no: documentList?.driver_license_no || '',
    license_issue_date: documentList?.license_issue_date || '',
    license_expiry_date: documentList?.license_expiry_date || '',
    license_photo: documentList?.license_photo || {},
  };
  const [loading, setLoading] = React.useState(false);

  const handleImagePress = uri => {
    setImageUri(uri);
    setIsVisible(true);
  };

  const images = [
    {
      uri: imageUri, // The URI of the image you want to display
    },
  ];
  const handleFormSubmit = async values => {
    try {
      console.log('values', values);
      // if (!saveFile || !saveFile.uri) {
      //   // Check if license_photo is empty
      //   Alert.alert('Photo is required');
      //   return; // Return early if validation fails
      // }
      if (!values.driver_license_no) {
        Alert.alert('Driver license number is required');
        return; // Return early if validation fails
      }
      function isValidDateFormat(dateString) {
        // Define two regular expressions for the date format parts
        const dateRegex1 = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        const dateRegex2 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // YYYY-MM-DD HH:mm:ss format

        return dateRegex1.test(dateString) || dateRegex2.test(dateString);
      }

      if (!values.license_issue_date) {
        Alert.alert('License issue date is required');
        return; // Return early if validation fails
      } else if (!isValidDateFormat(values.license_issue_date)) {
        Alert.alert('Invalid date format for License issue date');
        return; // Return early if validation fails
      }

      if (!values.license_expiry_date) {
        Alert.alert('License expiry date is required');
        return; // Return early if validation fails
      } else if (!isValidDateFormat(values.license_expiry_date)) {
        Alert.alert('Invalid date format for License expiry date');
        return; // Return early if validation fails
      }

      if (!saveFile || !saveFile.uri) {
        // Check if license_photo is empty
        Alert.alert('Photo is required');
        return; // Return early if validation fails
      }
      setLoading(true);
      values.license_photo = saveFile ? saveFile.uri : '';
      const res = await onPostDriverDocument({
        ...values,
        license_photo: saveFile,
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
  // const handleFormSubmit = async values => {
  //   try {
  //     console.log('values', values);
  //     // if (!saveFile || !saveFile.uri) {
  //     //   // Check if license_photo is empty
  //     //   Alert.alert('Photo is required');
  //     //   return; // Return early if validation fails
  //     // }
  // if (!saveFile || !saveFile.uri) {
  //   // Check if license_photo is empty
  //   Alert.alert('Photo is required');
  //   return; // Return early if validation fails
  // }
  //     setLoading(true);
  //     values.license_photo = saveFile ? saveFile.uri : '';
  //     const res = await onPostDriverDocument({
  //       ...values,
  //       license_photo: saveFile,
  //     });

  //     Alert.alert(res?.data?.message);
  //     goBack();

  //     console.log(res?.data);
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
  // const onPressAttachment = async () => {
  //   try {
  //     setFileLoading(true);
  //     const res = await pickDocument();

  //     const file = {
  //       ...res[0],
  //       uri: Platform.OS === 'ios' ? res[0]?.uri : res[0]?.fileCopyUri,
  //     };
  //     setSaveFile(file);
  //     // const response = await postFormData({
  //     //   file: {
  //     //     ...res[0],
  //     //     uri: Platform.OS === 'ios' ? res[0]?.uri : res[0]?.fileCopyUri,
  //     //   },
  //     // });
  //     //value array is maintained to be upload to server
  //     // setFiles([...files, response?.data?.data || {}]);
  //   } catch (error) {
  //     console.log('error=>>', error);
  //   } finally {
  //     setFileLoading(false);
  //   }
  // };

  // const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     setSelectedFile(result);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User canceled the picker
  //     } else {
  //       throw err;
  //     }
  //   }
  // };
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
                // validationSchema={LicenseDetailsValidation}
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
                            {documentList?.license_photo || saveFile?.uri ? (
                              <>
                                <Row style={{justifyContent: 'space-between'}}>
                                  <TouchableOpacity
                                    style={{width: mvs(50), height: mvs(50)}}
                                    onPress={() =>
                                      handleImagePress(
                                        documentList?.license_photo ||
                                          saveFile?.uri,
                                      )
                                    }>
                                    <Image
                                      // label={
                                      //   saveFile?.uri || documentList?.license_photo
                                      // }
                                      source={{
                                        uri:
                                          saveFile?.uri ||
                                          documentList?.license_photo ||
                                          'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
                                      }}
                                      resizeMode="cover"
                                      style={{width: mvs(50), height: mvs(50)}}
                                      // color={colors.primary}
                                      // fontSize={mvs(14)}
                                      // style={styles.filenametext}
                                    />
                                  </TouchableOpacity>

                                  <View
                                    style={{
                                      // marginLeft: mvs(60),
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderWidth: 1,
                                      borderStyle: 'dashed',
                                      padding: mvs(5),
                                      borderRadius: mvs(5),
                                      borderColor: colors.bluecolor,
                                      paddingVertical: mvs(8),
                                    }}>
                                    <Medium
                                      label={'Change Photo'}
                                      color={colors.bluecolor}
                                    />
                                  </View>
                                </Row>
                              </>
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
                          {errors.license_photo && (
                            <Regular style={{color: 'red'}} fontSize={mvs(12)}>
                              {errors.license_photo}
                            </Regular>
                          )}
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
                                values.driver_license_no
                                // ||
                                // documentList?.driver_license_no
                              }
                            />
                            <View>
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
                                  onChangeText={handleChange(
                                    'license_issue_date',
                                  )}
                                  onBlur={handleBlur(
                                    'license_issue_date',
                                    true,
                                  )}
                                  value={
                                    values.license_issue_date
                                    // ||
                                    // documentList?.license_issue_date
                                  }
                                />
                              </DatePicker>
                            </View>

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
                                onChangeText={handleChange(
                                  'license_expiry_date',
                                )}
                                onBlur={handleBlur('license_expiry_date', true)}
                                value={
                                  values.license_expiry_date
                                  //  ||
                                  // documentList?.license_expiry_date
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
        )}
      </ScrollView>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};
export default LicenseDetailsScreen;
