import {AppDispatch, RootState} from 'store';
import {getData, postData, postFormData, putData} from './';
import {URLS} from './api-urls';
import {UTILS} from 'utils';
import {STORAGEKEYS} from 'config/constants';
import {Alert} from 'react-native';
import {
  resetUser,
  setCountries,
  setUserInfo,
  setVehcileTypes,
} from './../../store/reducers/user-reducer';
import {resetStack} from 'navigation/navigation-ref';
export const getUserInfo = () => {
  return getData(URLS.auth.get_user_info);
};
export const onLogin = (
  values: any,
  setLoading: (bool: boolean) => void,
  // props: any,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postData(URLS.auth.login, values);
      console.log('res of onLogin=>', res);
      await UTILS.setItem(STORAGEKEYS.token, res?.access_token);
      await UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));

      // const uRes = await getUserInfo();
      // console.log('userinfo', uRes);
      dispatch(setUserInfo(res?.user));

      resetStack('Drawer');
    } catch (error: any) {
      console.log('error in login', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};
export const onLogoutPress = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      // await logout();
      await UTILS.clearStorage();
      dispatch(resetUser(null));

      resetStack('Splash');
    } catch (error: any) {
      console.log('error in onDeleteTask', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    }
  };
};
export const onForgot = async (values: any) => {
  try {
    const res = await getData(
      `${URLS.auth.forgot_password}?email=${values?.email}&type=Driver`,
      // values,
    );
    console.log('res of onforgot=>', res);

    return res;
  } catch (error: any) {
    console.log('error in forgot password', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};
export const onUpdatePassword = async (values: any) => {
  try {
    const res = await postData(URLS.auth.update_password, values);
    console.log('res of updateapssword=>', res);
    return res;
  } catch (error: any) {
    console.log('error in updateapssword', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};
export const onVerifyOtp = (values: any) =>
  getData(
    `${URLS.auth.verify_otp}?email=${values?.email}&otp=${values?.otp}&type=Driver`,
  );

export const onSignup = (values: any) => postData(URLS.auth.signup, values);

export const onStoreVehicle = (values: any) =>
  values?.id
    ? putData(`${URLS.vehcile.update_vehicle}${values?.id}`, values)
    : postData(URLS.vehcile.store_vehicle, values);

export const onPostDriverDocument = (values: any) =>
  postFormData(`${URLS.document.update_document}`, values);

export const getDriverDocument = async (slug: string) => {
  try {
    const res = await getData(URLS.document.get_document);
    console.log('res of getcument=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};
export const getCountryCode = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {userInfo} = getState()?.user;
      const res = await getData(URLS.auth.create_user);
      const codeObj = res?.country_codes;
      const newList = Object.keys(codeObj)?.map(x => ({
        code: x,
        ...codeObj[x],
      }));
      if (userInfo?.id) {
        let copy = [...newList];
        copy = copy?.map(x => ({
          ...x,
          selected: x?.phone_code == userInfo?.country_code,
        }));
        dispatch(setCountries(copy));
      } else {
        dispatch(setCountries(newList));
        console.log('newList:::', newList);
      }
    } catch (error) {
      console.log('error', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
};
export const onCreateVehicle = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.vehcile.create_vehilce);
      const codeObj = res?.types;
      const newList = Object.keys(codeObj)?.map((x, i) => ({
        id: codeObj[x],
      }));
      dispatch(setVehcileTypes(newList));
      console.log('newList:::', newList);
    } catch (error) {
      console.log('error', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
};

export const getVehcileList = async (slug: string) => {
  try {
    const res = await getData(URLS.vehcile.vehicle_list);
    console.log('res of vehcilellist=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};
export const getOrderListList = async (slug: string) => {
  try {
    const res = await getData(URLS.orderlist?.getorder);
    console.log('res of myorders=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};
export const getOrderDetails = async (id: any) => {
  try {
    const res = await getData(
      `${URLS.orderlist?.getorderdetails}?service_id=${id}`,
    );
    console.log('res of myordersDetails=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};

export const getDistance = async (
  lat1: any,
  lat2: any,
  lon1: any,
  lon2: any,
) => {
  console.log('lat1, lat2, lon1, lon2', lat1, lat2, lon1, lon2);

  try {
    var km = 1;
    let time = 0;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98`,
    );
    if (response?.data?.status === 'OK') {
      console.log('Distance is ');
      km = response?.data?.rows[0]?.elements[0]?.distance?.value / 1000;
      time = response?.data?.rows[0]?.elements[0]?.duration?.text;
    }
    return {km, time};
  } catch (error) {
    throw new Error(UTILS.returnError(error));
  }
};
export const getStatusChange = async (status: any) => {
  try {
    console.log(status);
    // return;
    const res = await getData(
      `${URLS.status_change.status}?online_status=${status}`,
    );
    console.log('res of status=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};

export const getDirection = (latitude: any, longitude: any) =>
  postData(
    `${URLS.auth.driver_location}?driver_lat=${latitude}&driver_long=${longitude}`,
  );
