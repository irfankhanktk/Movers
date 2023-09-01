import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {auth_bg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
import {height, mvs, width} from 'config/metrices';
import {Formik, useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
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
import PrimaryInput, {InputWithIcon} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {
  addVheicleValidation,
  forgotPasswordValidation,
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
} from 'assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {
  onCreateVehicle,
  onSignup,
  onStoreVehicle,
} from 'services/api/auth-api-actions';
const AddVehicleScreen = props => {
  const {user} = useAppSelector(s => s);
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const {vehicle_types} = user;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    vehicle_type: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    vehicle_load_capacity: '',
    ...props?.route?.params?.vehicle,
  };
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    getVehcileTypeDetails();
  }, []);
  const getVehcileTypeDetails = async () => {
    try {
      dispatch(onCreateVehicle());
    } catch (error) {}
  };
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
      <ImageBackground
        source={IMG.addvehcilebackground}
        style={styles.backgroundimg}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={t(initialValues?.id ? 'update_vehicle' : 'add_vehicle')}
        />

        <View style={styles.truckimageview}>
          <Image
            source={IMG.truckvehicle}
            resizeMode={'contain'}
            style={{width: mvs(248), height: mvs(169)}}
          />
        </View>
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={addVheicleValidation}
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
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  <View style={styles.contentContainerStyle}>
                    <View style={styles.contentContainerStyleNew}>
                      <KeyboardAvoidScrollview
                        contentContainerStyle={styles.keyboardcontentcontainer}>
                        <Bold
                          label={t('add_vehicle')}
                          color={colors.bluecolor}
                          fontSize={mvs(16)}
                          style={styles.boldtext}
                        />
                        <InputWithIcon
                          placeholder={t('select_vehicle_type')}
                          isRequired
                          error={
                            touched?.vehicle_type ? t(errors.vehicle_type) : ''
                          }
                          onChangeText={id => setFieldValue('vehicle_type', id)}
                          // onBlur={handleChange('vehicle_make')}
                          value={values.vehicle_type}
                          id={values.vehicle_type}
                          items={vehicle_types}
                        />

                        <PrimaryInput
                          error={
                            touched?.vehicle_make ? t(errors.vehicle_make) : ''
                          }
                          placeholder={t('vehicle_make')}
                          onChangeText={handleChange('vehicle_make')}
                          onBlur={handleBlur('vehicle_make')}
                          value={values.vehicle_make}
                        />
                        <PrimaryInput
                          error={
                            touched?.vehicle_model
                              ? t(errors.vehicle_model)
                              : ''
                          }
                          placeholder={t('vehicle_model')}
                          onChangeText={handleChange('vehicle_model')}
                          onBlur={handleBlur('vehicle_model')}
                          value={values.vehicle_model}
                        />
                        <PrimaryInput
                          error={
                            touched?.vehicle_year ? t(errors.vehicle_year) : ''
                          }
                          placeholder={t('vehicle_year')}
                          onChangeText={handleChange('vehicle_year')}
                          onBlur={handleBlur('vehicle_year', true)}
                          value={values.vehicle_year}
                        />
                        <PrimaryInput
                          keyboardType={'number-pad'}
                          error={
                            touched?.vehicle_load_capacity
                              ? t(errors.vehicle_load_capacity)
                              : ''
                          }
                          placeholder={t('vehicle_load_capacity')}
                          onChangeText={handleChange('vehicle_load_capacity')}
                          onBlur={handleBlur('vehicle_load_capacity')}
                          value={values.vehicle_load_capacity}
                        />
                      </KeyboardAvoidScrollview>
                    </View>
                  </View>
                </ScrollView>
                <View style={{paddingHorizontal: mvs(20)}}>
                  <PrimaryButton
                    containerStyle={styles.savebutton}
                    loading={loading}
                    onPress={handleSubmit}
                    title={t(initialValues?.id ? 'update_vehicle' : 'save')}
                  />
                </View>
              </>
            )}
          </Formik>
        </>
      </ImageBackground>
    </View>
  );
};
export default AddVehicleScreen;
