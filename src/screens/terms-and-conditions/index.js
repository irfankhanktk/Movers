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
// import HtmlView from '../../components/atoms/render-html/index';
import HtmlView from '../../components/atoms/render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Regular from 'typography/regular-text';
import {getDriverTerm} from 'services/api/auth-api-actions';
import {Loader} from 'components/atoms/loader';
const TermsandConditionsScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [term, setTerm] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getDriverTerm();
      setTerm(res);

      console.log(res);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.container}> */}
      <Image
        source={IMG.LogoBackground}
        style={{
          height: mvs(400),
          width: width,
          position: 'absolute',
        }}
      />
      <Header1x2x />
      <View style={{alignSelf: 'center'}}>
        <Image
          source={IMG.LoginLogo}
          resizeMode={'contain'}
          style={{width: mvs(300), height: mvs(100)}}
        />
      </View>

      <View style={styles.contentContainerStyle}>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.contentContainerStyleNew}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollcontentcontainer}>
            {/* <KeyboardAvoidScrollview
              contentContainerStyle={{
                paddingHorizontal: mvs(0),
                flexGrow: 0,
                paddingBottom: mvs(50),
              }}> */}

              <Bold
                label={t('terms_&_conditions')}
                color={colors.red}
                fontSize={mvs(16)}
                style={{alignSelf: 'center', marginBottom: mvs(10)}}
              />

              {/* <Regular
              label={
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
              }
              fontSize={mvs(14)}P
              color={colors.black}
              style={{textAlign: 'justify'}}
              numberOfLines={60}
            /> */}
              <HtmlView html={term} />
              </ScrollView>
            {/* </KeyboardAvoidScrollview> */}
            {/* <PrimaryButton
            containerStyle={{
              borderRadius: mvs(10),
              marginTop: mvs(10),
            }}
            loading={loading}
            // onPress={() => navigate('ResetPasswordScreen')}
            title={t('back')}
          /> */}
          </View>
        )}
      </View>
    </View>
  );
};
export default TermsandConditionsScreen;
