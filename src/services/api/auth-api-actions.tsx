import {AppDispatch, RootState} from 'store';
import {getData, postData} from './';
import {URLS} from './api-urls';
import {UTILS} from 'utils';
import {STORAGEKEYS} from 'config/constants';
import {Alert} from 'react-native';
import {
  resetUser,
  setCountries,
  setUserInfo,
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
      `${URLS.auth.forgot_password}?email=${values?.email}`,
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
  getData(`${URLS.auth.verify_otp}?email=${values?.email}&otp=${values?.otp}`);
export const onSignup = (values: any) => postData(URLS.auth.signup, values);

export const getCountryCode = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.auth.create_user);
      const codeObj = res?.country_codes;
      const newList = Object.keys(codeObj)?.map(x => ({
        code: x,
        ...codeObj[x],
      }));
      dispatch(setCountries(newList));
      console.log('newList:::', newList);
    } catch (error) {
      console.log('error', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
};
