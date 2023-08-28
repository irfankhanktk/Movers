import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import {SplashIcon} from 'assets/icons';
import {splash_bg} from 'assets/images';
import React from 'react';
import {ImageBackground, View, Image, TouchableOpacity} from 'react-native';
import i18n from 'translation';
import {STORAGEKEYS} from '../../config/constants';
import {
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import {UTILS} from 'utils';
import {useAppDispatch} from 'hooks/use-store';
import styles from './styles';
import {mvs, width} from 'config/metrices';
import Medium from 'typography/medium-text';
import {t} from 'i18next';
import {colors} from 'config/colors';

type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();

  React.useEffect(() => {}, []);
  React.useEffect(() => {
    (async () => {
      try {
        let screen: any = 'Onboarding';
        UTILS.get_current_location(
          position => {
            dispatch(
              setLocation({
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              }),
            );
          },
          error => {},
        );
        UTILS.getItem(STORAGEKEYS.lang).then((lang: any) => {
          i18n.changeLanguage(lang);
          dispatch(setLanguage(lang ?? 'en'));
        });

        UTILS.getItem(STORAGEKEYS.user).then((data: any) => {
          if (data) {
            const user = JSON.parse(data);
            screen = 'Onboarding';
            dispatch(setUserInfo(user));
          }
          setTimeout(() => {
            navigation?.replace(screen);
          }, 2000);
        });
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={{...styles.container}}>
      {/* <TouchableOpacity style={styles.skipbutton}>
        <Medium label={t('Skip')} color={colors.white} fontSize={mvs(24)} />
      </TouchableOpacity> */}
      <Image
        source={IMG.Logo}
        resizeMode={'contain'}
        style={{width: mvs(100), height: mvs(100)}}
      />
      <Image
        source={IMG.LogoText}
        resizeMode={'contain'}
        style={{width: mvs(250), height: mvs(100)}}
      />

      <Image
        source={IMG.SplashIcon}
        resizeMode={'contain'}
        style={{width: mvs(400), height: '60%'}}
      />
    </View>
  );
};
export default Splash;
