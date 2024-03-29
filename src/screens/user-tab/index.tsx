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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabParamList from 'types/navigation-types/bottom-tab';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import i18n from '../../translation/index';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import * as IMG from 'assets/images';
import {Loader} from 'components/atoms/loader';
import {
  deletePermanentAccount,
  getStatusChange,
  onLogoutPress,
  onUpdateProfile,
  postFileData,
  uploadImage,
} from 'services/api/auth-api-actions';
import {t} from 'i18next';
import {STORAGEKEYS} from 'config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfo} from 'store/reducers/user-reducer';
import ImageView from 'react-native-image-viewing';
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
  const [showImage, setShowImage] = React.useState(false);
  const [visible, setIsVisible] = React.useState(false);
  const [imageUri, setImageUri] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const ImageUpload = async () => {
  //   try {
  //     const img = await UTILS._returnImageGallery();
  //     const file = await postFileData({avatar: img});
  //     console.log('res', file);
  //     const data = {...userInfo};
  //     delete data.roles;
  //     delete data.role;
  //     dispatch(
  //       onUpdateProfile(
  //         {...data, avatar: file?.data?.data?.id},
  //         setLoading,
  //         props,
  //       ),
  //     );
  //   } catch (error) {
  //     Alert.alert('Error', UTILS?.returnError(error));
  //   }
  // };
  const handleImagePress = uri => {
    setImageUri(uri);
    setIsVisible(true);
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
        // postImage();
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
  // const postImage = async () => {
  //   const res = await UTILS._returnImageGallery();
  //   const result = await uploadImage({avatar: res});
  // };
  const openGallery = async () => {
    try {
      const res = await UTILS._returnImageGallery(false, true);
      // console.log('res---->>>>', res?.data);
      dispatch(
        uploadImage(
          {
            filename: 'crisp.jpg',
            avatar: res,
          },
          setLoading,
          // () => {},
        ),
      );
      // setImage(res);
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };

  const ChangeStatus = async () => {
    try {
      // Toggle the online_status between 0 and 1
      const newStatus = '0';

      // Make the API call with the new status
      const res = await getStatusChange(newStatus);

      // Update the userInfo with the new status
      const updatedUserInfo = {...userInfo, online_status: newStatus};

      // Update user info in AsyncStorage and Redux store
      await AsyncStorage.setItem(
        STORAGEKEYS.user,
        JSON.stringify(updatedUserInfo),
      );
      dispatch(setUserInfo(updatedUserInfo));

      console.log(' resp==========>', res);
    } catch (error) {
      console.log('Error:', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  const LogoutAccount = async () => {
    Alert.alert('Logout!', 'Are you sure you want to Logout your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          if (userInfo) {
            // Call ChangeStatus before logging out
            await ChangeStatus();

            // Dispatch the logout action
            dispatch(onLogoutPress());
          } else {
            props?.navigation?.navigate('Login');
          }
        },
      },
    ]);
  };
  const DeleteAcc = async () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to Delete your account?. Your account will be deleted permanently and your all data will be deleted',
      [
        {
          text: t('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('Delete'),
          onPress: () => {
            dispatch(deletePermanentAccount());
          },
        },
      ],
    );
  };

  // const onPressAttachment = async () => {
  //   try {
  //     setFileLoading(true);
  //     const res = await UTILS._returnImageGallery();

  //     setSaveFile(res);
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
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{...styles.img}}>
          {loading ? (
            <Loader color={colors.white} />
          ) : (
            <TouchableOpacity
              onPress={() => handleImagePress(userInfo?.avatar)}
              style={styles.imgUpload}>
              <Image
                source={
                  userInfo?.avatar ? {uri: userInfo?.avatar} : IMG.Drawerman
                }
                // source={{uri: saveFile?.uri}}
                // source={saveFile?.uri ? {uri: saveFile?.uri} : IMG.Drawerman}
                // source={IMG.Drawerman}
                style={styles.imgUpload}
                resizeMode="cover"
              />
            </TouchableOpacity>
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
            onPress={() => openGallery()}>
            <MaterialIcons name="edit" color={colors.black} size={mvs(20)} />
          </TouchableOpacity>
          {/* )} */}
        </View>
        <Medium label={userInfo?.first_name} style={styles.name} />
        <Regular label={`${userInfo?.email}`} style={styles.email} />

        <View style={styles.linkContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: mvs(100)}}>
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('MyOrderScreen')}>
              <View style={{width: '8%'}}>
                <FontAwesome
                  name="shopping-cart"
                  size={mvs(22)}
                  color={colors.primary}
                />
              </View>
              <Regular style={styles.itemText1} label={`${t('my_order')}`} />
            </TouchableOpacity>
            {/* )} */}
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                props?.navigation?.navigate('UpdateProfileScreen')
              }>
              <View style={{width: '8%'}}>
                <FontAwesome5
                  name="user-edit"
                  size={mvs(22)}
                  color={colors.primary}
                />
              </View>
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
              <View style={{width: '8%'}}>
                <Ionicons
                  name="documents"
                  size={mvs(22)}
                  color={colors.primary}
                />
              </View>
              <Regular style={styles.itemText1} label={`${t('documents')}`} />
            </TouchableOpacity>
            {/* )} */}
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('HistoryScreen')}>
              <View style={{width: '8%'}}>
                <Ionicons
                  name="timer-outline"
                  size={mvs(22)}
                  color={colors.primary}
                />
              </View>
              <Regular style={styles.itemText1} label={`${t('history')}`} />
            </TouchableOpacity>
            {/* )} */}
            {/* {userInfo && ( */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                props?.navigation?.navigate('TermsandConditionsScreen')
              }>
              <View style={{width: '8%'}}>
                <Entypo
                  name="text-document-inverted"
                  size={mvs(22)}
                  color={colors.primary}
                />
              </View>
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
                <View style={{width: '8%'}}>
                  <MaterialIcons
                    name="privacy-tip"
                    size={mvs(22)}
                    color={colors.primary}
                  />
                </View>
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
              <View style={{width: '8%'}}>
                <AntDesign
                  name={'logout'}
                  // name={`${userInfo ? 'logout' : 'login'}`}
                  size={mvs(22)}
                  color={colors.red}
                />
              </View>
              <Regular
                style={styles.itemText1}
                label={'Logout'}
                // label={`${t(userInfo ? 'logout' : 'login')}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => DeleteAcc()}>
              <View style={{width: '8%'}}>
                <MaterialCommunityIcons
                  name="account-cancel"
                  size={mvs(28)}
                  color={colors.red}
                />
              </View>
              <Regular style={styles.itemText1} label={'Delete Account'} />
            </TouchableOpacity>

            {/* </View> */}
          </ScrollView>
        </View>
      </View>
      <ImageView
        images={[{uri: imageUri}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};
export default UserTab;
