import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabParamList from 'types/navigation-types/bottom-tab';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import i18n from '../../translation/index';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import * as IMG from 'assets/images';
import {Loader} from 'components/atoms/loader';
import {onLogoutPress} from 'services/api/auth-api-actions';
import {t} from 'i18next';

type props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'UserTab'>,
  NativeStackScreenProps<RootStackParamList>
>;
const UserTab = (props: props) => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const [saveFile, setSaveFile] = React.useState(null);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // const ImageUpload = async () => {
  //   try {
  //     const img = await UTILS._returnImageGallery();
  //     const file = await postFileData({file: img, type: 'image'});
  //     const data = {...userInfo};
  //     // delete data.roles;
  //     dispatch(
  //       onUpdateProfile(
  //         {...data, avatar_id: file?.data?.data?.id},
  //         setLoading,
  //         props,
  //       ),
  //     );
  //   } catch (error) {
  //     Alert.alert('Error', UTILS?.returnError(error));
  //   }
  // };

  const LogoutAccount = async () => {
    Alert.alert('Logout!', 'Are you sure you want to Logout your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          userInfo
            ? dispatch(onLogoutPress())
            : props?.navigation?.navigate('Login');
        },
      },
    ]);
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
      <View style={styles.body}>
        <View style={{...styles.img}}>
          {loading ? (
            <Loader color={colors.white} />
          ) : (
            <Image
              source={saveFile?.uri ? {uri: saveFile?.uri} : IMG.Drawerman}
              // source={IMG.Drawerman}
              style={styles.imgUpload}
              resizeMode="cover"
            />
          )}
          {/* {userInfo?.id && ( */}
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: mvs(10),
              position: 'absolute',
              right: mvs(-16),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => onPressAttachment()}>
            <MaterialIcons name="edit" color={colors.black} size={mvs(20)} />
          </TouchableOpacity>
          {/* )} */}
        </View>
        <Medium label={userInfo?.name || t('guest_mode')} style={styles.name} />
        <Regular
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          style={styles.email}
        />

        <View style={styles.linkContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: mvs(100)}}>
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('MyOrderScreen')}>
              <FontAwesome
                name="shopping-cart"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular style={styles.itemText1} label={`${t('my_order')}`} />
            </TouchableOpacity>
            {/* )} */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('LanguageScreen')}>
              <FontAwesome5
                name="globe"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('choose_language')}`}
              />
            </TouchableOpacity>
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                props?.navigation?.navigate('UpdateProfileScreen')
              }>
              <FontAwesome5
                name="user-edit"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('update_profile')}`}
              />
            </TouchableOpacity>
            {/* )} */}
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                props?.navigation?.navigate('UploadDocumentsScreen')
              }>
              <Ionicons
                name="documents"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular style={styles.itemText1} label={`${t('documents')}`} />
            </TouchableOpacity>
            {/* )} */}
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('HistoryScreen')}>
              <Ionicons
                name="timer-outline"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular style={styles.itemText1} label={`${t('history')}`} />
            </TouchableOpacity>
            {/* )} */}
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                props?.navigation?.navigate('TermsandConditionsScreen')
              }>
              <Entypo
                name="text-document-inverted"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('terms_and_conditions')}`}
              />
            </TouchableOpacity>
            {/* )} */}
            {userInfo && (
              <TouchableOpacity
                style={styles.itemtabs}
                onPress={() =>
                  props?.navigation?.navigate('PrivacyPolicyScreen')
                }>
                <MaterialIcons
                  name="privacy-tip"
                  size={mvs(22)}
                  color={colors.primary}
                />
                <Regular
                  style={styles.itemText1}
                  label={`${t('return_policy & private_policy')}`}
                />
              </TouchableOpacity>
            )}
            {/* )} */}
            {/* <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',

              width: '100%',
              paddingBottom: mvs(60),
            }}> */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                // userInfo
                //   ? dispatch(onLogoutPress())
                //   : props?.navigation?.navigate('Login')
                LogoutAccount()
              }>
              <AntDesign
                name={`${userInfo ? 'logout' : 'login'}`}
                size={mvs(22)}
                color={colors.red}
              />
              <Regular
                style={styles.itemText1}
                label={`${t(userInfo ? 'logout' : 'login')}`}
              />
            </TouchableOpacity>

            {/* </View> */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default UserTab;
