import {Home} from 'assets/icons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import DrawerHomeCard from 'components/molecules/drawer-home-card';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Bold from 'typography/bold-text';
import * as IMG from 'assets/images';
import {t} from 'i18next';
import Medium from 'typography/medium-text';
import {navigate} from 'navigation/navigation-ref';
const CustomDrawerContent = props => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <Image
          source={IMG.drawerUserIcon}
          style={{
            width: mvs(100),
            height: mvs(100),
            resizeMode: 'cover',
            borderRadius: mvs(50),
          }}
        />
        <Medium
          label={'Ali Abdullah'}
          fontSize={mvs(18)}
          color={colors.white}
          style={{marginTop: mvs(6)}}
        />
        <Medium
          label={'ali1234@gmail.com'}
          fontSize={mvs(14)}
          color={colors.white}
          style={{marginTop: mvs(6)}}
        />
      </View>
      <ScrollView
        style={{
          flexGrow: 1,
          paddingVertical: mvs(10),
        }}>
        <View style={styles.needHelpContainer}>
          <DrawerHomeCard
            onPress={() => navigate('Home')}
            icon1={IMG.drawerHomeIcon}
            label1={t('home')}
            // br={8}
            containerStyle={styles.helpStyle}
          />
          <DrawerHomeCard
            onPress={() => navigate('OurServicesScreen')}
            icon1={IMG.drawerOurServicesIcon}
            label1={t('our_services')}
            br={8}
            containerStyle={styles.helpStyle}
          />
        </View>

        <View style={styles.needHelpContainer}>
          <DrawerHomeCard
            onPress={() => navigate('AboutUsScreen')}
            icon1={IMG.drawerAboutIcon}
            label1={t('about_us')}
            // br={8}
            containerStyle={styles.helpStyle}
          />
          <DrawerHomeCard
            onPress={() => navigate('BlogScreen')}
            icon1={IMG.drawerBlogIcon}
            label1={t('blog')}
            containerStyle={styles.helpStyle}
          />
          <DrawerHomeCard
            onPress={() => navigate('DriveWithUsScreen')}
            icon1={IMG.drawerDrivwWithUsIcon}
            label1={t('drive_with_us')}
            containerStyle={styles.helpStyle}
          />
          <DrawerHomeCard
            onPress={() => navigate('AdviceFromUsScreen')}
            icon1={IMG.drawerAdviceFromUsIcon}
            label1={t('advice_from_us')}
            containerStyle={styles.helpStyle}
          />
          <DrawerHomeCard
            onPress={() => navigate('ContactUsScreen')}
            icon1={IMG.drawerContactUsIcon}
            label1={t('contact_us')}
            containerStyle={styles.helpStyle}
          />
        </View>
        <View style={styles.needHelpContainer}>
          <DrawerHomeCard
            onPress={() => navigate('DriverLoginScreen')}
            icon1={IMG.drawerDriverLoginIcon}
            label1={t('driver_login')}
            br={8}
            containerStyle={styles.helpStyle}
          />
        </View>
      </ScrollView>
      <View style={styles.needHelpContainer}>
        <DrawerHomeCard
          onPress={() => props?.navigation?.toggleDrawer()}
          icon1={IMG.drawerLogoutIcon}
          label1={t('logout')}
          br={8}
          containerStyle={styles.helpStyle}
        />
      </View>
    </View>
  );
};
export default CustomDrawerContent;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  header: {
    height: mvs(180),
    width: width - 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
});
