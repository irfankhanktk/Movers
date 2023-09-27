import React from 'react';
import {
  I18nManager,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomFlatList from 'components/atoms/custom-flatlist';

import i18n from 'translation';
import styles from './styles';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from 'config/colors';
import {ford, forklift} from 'assets/images';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {MessageInput} from 'components/atoms/inputs';
import Feather from 'react-native-vector-icons/Feather';

import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import {goBack} from 'navigation/navigation-ref';
import Medium from 'typography/medium-text';
import InboxChatCard from 'components/molecules/inbox-chat-card';
const InboxScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const featuredCategories = [
    {
      id: 1,
    },
    {
      id: 2,
      me: true,
    },
    {
      id: 3,
    },
    {
      id: 3,
      me: true,
    },
    {
      id: 3,
      me: false,
    },
    {
      id: 3,
      me: true,
    },
    {
      id: 3,
      me: false,
    },
  ];
  const featuredProduct = ({item}) => <InboxChatCard item={item} />;
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(15),
        }}>
        <Row
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <FontAwesome5
              name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
              size={mvs(20)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              borderRadius={mvs(10)}
              source={IMG.messagelogo}
              style={styles.backGroundImage}
            />
            <Medium
              label={t('get_movers')}
              fontSize={mvs(7)}
              color={colors.primary}
              style={{marginTop: mvs(5)}}
            />
          </View>
          <View style={{paddingHorizontal: mvs(10), flex: 1}}>
            <Bold label={'Mitsubishi'} />
            <Regular numberOfLines={1} label={'Mitsubishi@email.com'} />
          </View>
        </Row>
      </View>
      <CustomFlatList
        inverted
        showsVerticalScrollIndicator={false}
        data={featuredCategories}
        renderItem={featuredProduct}
        contentContainerStyle={{
          paddingBottom: mvs(20),
          paddingHorizontal: mvs(20),
        }}
      />

      <Row
        style={{
          marginHorizontal: mvs(20),
          alignItems: 'center',
          paddingBottom: mvs(20),
        }}>
        <MessageInput />
        <TouchableOpacity style={styles.sendIcon}>
          <Feather name={'send'} size={25} color={colors.white} />
        </TouchableOpacity>
      </Row>
    </View>
  );
};
export default InboxScreen;
