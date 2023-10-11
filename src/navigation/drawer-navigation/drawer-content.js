import {Home} from 'assets/icons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import DrawerHomeCard from 'components/molecules/drawer-home-card';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import React from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import Bold from 'typography/bold-text';
import * as IMG from 'assets/images';
import {t} from 'i18next';
import Medium from 'typography/medium-text';
import {navigate} from 'navigation/navigation-ref';
import CustomMap from 'components/atoms/custom-map';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {onLogoutPress} from 'services/api/auth-api-actions';
const CustomDrawerContent = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const dispatch = useAppDispatch();

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
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        {/* <Image source={IMG.DrawerLogo} style={styles.drawerlogo} /> */}
        <View style={styles.drawerheader}>
          <Image source={IMG.Drawerman} style={styles.drawerman} />
        </View>

        <Medium
          label={userInfo?.name || t('guest_mode')}
          fontSize={mvs(18)}
          color={colors.black}
          style={{marginTop: mvs(6)}}
        />
        <Medium
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          fontSize={mvs(14)}
          color={colors.black}
          style={{marginTop: mvs(6)}}
        />
      </View>
      <ScrollView style={styles.scrololstyle}>
        <DrawerHomeCard
          onPress={() => navigate('Me')}
          icon1={IMG.userDarwer}
          label1={t('my_profile')}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => navigate('ManageVehicleScreen')}
          icon1={IMG.manageVehicleDrawer}
          label1={t('manage_vehicle')}
          br={8}
          containerStyle={styles.helpStyle}
        />

        <DrawerHomeCard
          onPress={() => navigate('UploadDocumentsScreen')}
          icon1={IMG.documentDrawer}
          label1={t('documents')}
          // br={8}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => navigate('HistoryScreen')}
          icon1={IMG.historyDarwer}
          label1={t('history')}
          containerStyle={styles.helpStyle}
        />
        {/* <DrawerHomeCard
          onPress={() => navigate('HistoryScreen')}
          icon1={IMG.settings}
          label1={t('setting')}
          containerStyle={styles.helpStyle}
        /> */}
        <DrawerHomeCard
          onPress={() => navigate('MessageHomeScreen')}
          icon1={IMG.message}
          label1={t('chat_screen')}
          containerStyle={styles.helpStyle}
        />
      </ScrollView>

      <DrawerHomeCard
        onPress={() =>
          // userInfo
          //   ? dispatch(onLogoutPress())
          //   : props?.navigation?.navigate('Login')
          LogoutAccount()
        }
        icon1={IMG.drawerLogoutIcon}
        label1={t('logout')}
        br={8}
        containerStyle={styles.helpStyle}
      />
    </View>
  );
};
export default CustomDrawerContent;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: mvs(260),
    width: width - 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: mvs(1),
    borderColor: colors.border,
    // backgroundColor: colors.primary,
  },
  needHelpContainer: {
    backgroundColor: colors.white,
    width: width - 100,
    marginHorizontal: mvs(17),
    borderRadius: mvs(8),
    // paddingHorizontal: mvs(17.5),
    marginVertical: mvs(8),
    alignItems: 'center',
    ...colors.shadow,
  },
  helpStyle: {margin: mvs(10), width: width - 120, height: mvs(27)},
  drawerlogo: {
    width: mvs(200),
    // height: mvs(100),
    resizeMode: 'contain',
  },
  drawerheader: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(50),
    borderWidth: mvs(3),
    borderColor: colors.primary,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  drawerman: {
    height: '100%',
    width: '100%',
    borderRadius: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrololstyle: {
    flexGrow: 1,
    paddingVertical: mvs(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
