import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
import {height, mvs, width} from 'config/metrices';
import {useFormik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate, resetStack} from 'navigation/navigation-ref';
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
import {getDriverDocument} from 'services/api/auth-api-actions';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';

const UploadDocumentsScreen = props => {
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [saveFile, setSaveFile] = React.useState(null);
  const [value, setValue] = React.useState('');

  const [documentList, setDocumentList] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isFocus) {
      getList();
    }
  }, [isFocus]);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getDriverDocument();
      setDocumentList(res?.driverDetails);
      console.log('res?.driverDetails', res?.driverDetails);

      console.log(res?.driverDetails);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
          <View style={styles.contentContainerStyleNew}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollcontentcontainer}>
              <View style={{marginHorizontal: mvs(20)}}>
                <Bold
                  label={t('upload_documents')}
                  color={colors.bluecolor}
                  fontSize={mvs(16)}
                  style={{marginTop: mvs(10), marginBottom: mvs(5)}}
                />
                {/* <Regular
                  label={t(
                    'we_need_to_see_your_clearly_printed_on_an_official_document',
                  )}
                  numberOfLines={2}
                  fontSize={mvs(12)}
                  style={{marginBottom: mvs(5)}}
                />
                <TouchableOpacity
                  style={styles.uploadfileview}
                  onPress={() => onPressAttachment()}>
                  {saveFile?.uri ? (
                    <Medium
                      label={saveFile?.name}
                      color={colors.primary}
                      fontSize={mvs(14)}
                      style={styles.filenametext}
                    />
                  ) : (
                    <Row style={{justifyContent: 'center'}}>
                      <FileSVG width={mvs(25)} height={mvs(25)} />
                      <Medium
                        label={t('add_file')}
                        color={colors.primary}
                        fontSize={mvs(14)}
                        style={{marginLeft: mvs(10)}}
                      />
                    </Row>
                  )}
                </TouchableOpacity> */}
              </View>
              <View style={{paddingVertical: mvs(10)}}>
                <UploadDocumentTile
                  label={t('company_details')}
                  onPress={() =>
                    navigate(
                      'CompanyDetailsScreen',
                      // ,
                      // {
                      //   documentList: documentList,
                      // }
                    )
                  }
                />
                <UploadDocumentTile
                  label={t('license_details')}
                  onPress={() =>
                    navigate(
                      'LicenseDetailsScreen',
                      //  {
                      //   documentList: documentList,
                      // }
                    )
                  }
                />
                <UploadDocumentTile
                  label={t('MOT')}
                  onPress={() =>
                    navigate(
                      'MOTDetailsScreen',
                      // {
                      //   documentList: documentList,
                      // }
                    )
                  }
                />
                <UploadDocumentTile
                  label={t('vehicle_insurance')}
                  onPress={() =>
                    navigate(
                      'VehicleInsuranceScreen',
                      //  {
                      //   documentList: documentList,
                      // }
                    )
                  }
                />
                <UploadDocumentTile
                  label={t('goods_in_transit')}
                  onPress={() =>
                    navigate(
                      'GoodsInTransitScreen',
                      // , {
                      //   documentList: documentList,
                      // }
                    )
                  }
                />
                <UploadDocumentTile
                  label={t('bank_details')}
                  onPress={() =>
                    navigate(
                      'BankDetailsScreen',
                      // , {
                      //   documentList: documentList,
                      // }
                    )
                  }
                />
                {/* <UploadDocumentTile
                label={t('manage_vehicle')}
                onPress={() => navigate('ManageVehicleDocumentScreen')}
              /> */}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
export default UploadDocumentsScreen;
