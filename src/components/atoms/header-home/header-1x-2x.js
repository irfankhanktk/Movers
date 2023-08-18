import {useNavigation} from '@react-navigation/native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Medium from 'typography/medium-text';
import {Row} from '../row';
import {SearchInput} from '../inputs';
import {HoemSVG} from 'assets/icons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {t} from 'i18next';
const HeaderX = ({
  style = {},
  mtop = 0,
  title,
  back = true,
  onChangeText = t => {},
  isSearch = false,
  isMenu = false,
  placeholder = 'Search here',
  ...props
}) => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = React.useState(true);
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation?.toggleDrawer()}>
          <MaterialCommunityIcons
            name={'menu'}
            size={mvs(30)}
            color={colors.white}
          />
        </TouchableOpacity>
        <View
          style={{
            padding: mvs(2),
            // borderRadius: mvs(16),
            // borderWidth: 2,
            borderRadius: mvs(16),
            backgroundColor: colors.white,
          }}>
          {!isOnline ? (
            <TouchableOpacity
              onPress={() => setIsOnline(true)}
              style={{
                backgroundColor: colors.white,
                height: mvs(35),
                width: mvs(115),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: mvs(16),
              }}>
              <Row style={{alignItems: 'center'}}>
                <FontAwesome6
                  name="circle-arrow-right"
                  size={mvs(25)}
                  color={colors.homegreen}
                />
                <Medium
                  label={t('go_online')}
                  fontSize={mvs(14)}
                  style={{marginLeft: mvs(10)}}
                  color={colors.homegreen}
                />
              </Row>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsOnline(false)}
              style={{
                backgroundColor: colors.primary,
                height: mvs(35),
                width: mvs(115),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: mvs(16),
              }}>
              <Row style={{alignItems: 'center'}}>
                <Medium
                  label={t('back_offline')}
                  fontSize={mvs(12)}
                  style={{marginLeft: mvs(10)}}
                  color={colors.white}
                />
                <AntDesign
                  name="arrowright"
                  size={mvs(18)}
                  color={colors.white}
                  style={{marginLeft: mvs(5)}}
                />
              </Row>
            </TouchableOpacity>
          )}
        </View>
      </Row>
      {isSearch && (
        <SearchInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          mtop={mtop}
        />
      )}
    </View>
  );
};
export default React.memo(HeaderX);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    paddingVertical: mvs(15),
  },
  empty: {
    width: mvs(10),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
  },
  back: {},
});
