import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {View} from 'react-native';

import CustomFlatList from 'components/atoms/custom-flatlist';

import i18n from 'translation';
import styles from './styles';
import ChatCard from 'components/molecules/chat-card';
import Header1x2x from 'components/atoms/headers-message/header-1x-2x';
import {colors} from 'config/colors';

const MessageHomeScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const featuredCategories = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
  ];
  const featuredProduct = ({item}) => (
    <ChatCard item={item} onPress={() => navigate('InboxScreen')} />
  );
  return (
    <View style={styles.container}>
      {/* <AppHeader back title={t('message')} /> */}
      <Header1x2x
        back={true}
        style={{backgroundColor: colors.transparent}}
        title={t('home_chat')}
      />
      <CustomFlatList
        showsVerticalScrollIndicator={false}
        data={featuredCategories}
        renderItem={featuredProduct}
        contentContainerStyle={{
          paddingBottom: mvs(20),
          paddingHorizontal: mvs(20),
        }}
      />
    </View>
  );
};
export default MessageHomeScreen;
