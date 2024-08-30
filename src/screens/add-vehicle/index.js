import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput, {
  InputWithIcon,
  InputWithIconNew,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppSelector} from 'hooks/use-store';
import {goBack} from 'navigation/navigation-ref';
import React from 'react';
import {Alert, Image, ImageBackground, ScrollView, View} from 'react-native';
import {
  onCreateVehicle,
  onEditVehicle,
  onStoreVehicle,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import {UTILS} from 'utils';
import {addVheicleValidation} from 'validations';
import styles from './styles';
import {Loader} from 'components/atoms/loader';
const AddVehicleScreen = props => {
  const vehicle = props?.route?.params?.vehicle;
  // console.log('params data chek===>', vehicle);

  const {t} = i18n;
  const [vehicleType, setVehicleType] = React.useState([]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const Load = [{id: '3.5'}, {id: '7.5'}, {id: '10'}];
  const [loading, setLoading] = React.useState(false);
  const [editVehicleData, setEditVehicleData] = React.useState();

  const getVehcileTypeDetails = async () => {
    try {
      setScreenLoading(true);
      if (vehicle?.id) {
        const res = await onEditVehicle(vehicle?.id);
        setVehicleType(res?.types);
        setEditVehicleData(res?.vehicle);
      } else {
        const res = await onCreateVehicle();
        setVehicleType(res?.types);
      }
    } catch (error) {
      console.log('Error in vehicleType list===>', UTILS.returnError(error));
    } finally {
      setScreenLoading(false);
    }
  };

  React.useEffect(() => {
    getVehcileTypeDetails();
  }, []);
  const initialValues = {
    vehicle_type: editVehicleData?.vehicle_type || '',
    vehicle_make: editVehicleData?.vehicle_make || '',
    vehicle_model: editVehicleData?.vehicle_model || '',
    vehicle_year: editVehicleData?.vehicle_year || '',
    vehicle_load_capacity: editVehicleData?.vehicle_load_capacity || '',
    vehicle_number: editVehicleData?.vehicle_number || '',
    // vehicle_price: '',
    // ...props?.route?.params?.vehicle,
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
        {screenLoading ? (
          <Loader />
        ) : (
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
                          contentContainerStyle={
                            styles.keyboardcontentcontainer
                          }>
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
                              touched?.vehicle_type
                                ? t(errors.vehicle_type)
                                : ''
                            }
                            onChangeText={id =>
                              setFieldValue('vehicle_type', id)
                            }
                            // onBlur={handleChange('vehicle_make')}
                            value={values.vehicle_type}
                            id={values.vehicle_type}
                            items={vehicleType}
                          />
                          <InputWithIconNew
                            placeholder={'Select Vehcile Load Capacity(Ton)'}
                            isRequired
                            error={
                              touched?.vehicle_load_capacity
                                ? t(errors.vehicle_load_capacity)
                                : ''
                            }
                            onChangeText={id =>
                              setFieldValue('vehicle_load_capacity', id)
                            }
                            // onBlur={handleChange('vehicle_make')}
                            value={values.vehicle_load_capacity}
                            id={values.vehicle_load_capacity}
                            items={Load}
                          />

                          <PrimaryInput
                            error={
                              touched?.vehicle_make
                                ? t(errors.vehicle_make)
                                : ''
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
                              touched?.vehicle_year
                                ? t(errors.vehicle_year)
                                : ''
                            }
                            placeholder={t('vehicle_year')}
                            onChangeText={handleChange('vehicle_year')}
                            onBlur={handleBlur('vehicle_year', true)}
                            value={values.vehicle_year}
                          />
                          {/* <PrimaryInput
                          error={
                            touched?.vehicle_price
                              ? t(errors.vehicle_price)
                              : ''
                          }
                          placeholder={'Vehicle Price'}
                          onChangeText={handleChange('vehicle_price')}
                          onBlur={handleBlur('vehicle_price', true)}
                          value={values.vehicle_price}
                        /> */}
                          <PrimaryInput
                            error={
                              touched?.vehicle_number
                                ? t(errors.vehicle_number)
                                : ''
                            }
                            placeholder={t('vehicle_number')}
                            onChangeText={handleChange('vehicle_number')}
                            onBlur={handleBlur('vehicle_number', true)}
                            value={values.vehicle_number}
                          />
                          {/* <PrimaryInput
                          keyboardType={'number-pad'}
                          error={
                            touched?.vehicle_load_capacity
                              ? t(errors.vehicle_load_capacity)
                              : ''
                          }
                          placeholder={'Vehicle Load Capacity (In Ton)'}
                          onChangeText={handleChange('vehicle_load_capacity')}
                          onBlur={handleBlur('vehicle_load_capacity')}
                          value={values.vehicle_load_capacity}
                        /> */}
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
        )}
      </ImageBackground>
    </View>
  );
};
export default AddVehicleScreen;
