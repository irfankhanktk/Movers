import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {View} from 'react-native';

import CustomFlatList from 'components/atoms/custom-flatlist';

import i18n from 'translation';
import styles from './styles';
import ChatCard from 'components/molecules/chat-card';
import Header1x2x from 'components/atoms/headers-message/header-1x-2x';
import {colors} from 'config/colors';
import {useIsFocused} from '@react-navigation/native';
import {getConversationsList} from 'services/api/chat-api-actions';

import {Loader} from 'components/atoms/loader';
const MessageHomeScreen = props => {
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const {chat} = useAppSelector(s => s);
  const {conversation_list} = chat;
  console.log('conversation list check====>', conversation_list);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (isFocus) dispatch(getConversationsList(setLoading));
  }, []);

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
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={conversation_list}
          renderItem={featuredProduct}
          contentContainerStyle={{
            paddingBottom: mvs(20),
            paddingHorizontal: mvs(20),
          }}
        />
      )}
    </View>
  );
};
export default MessageHomeScreen;
