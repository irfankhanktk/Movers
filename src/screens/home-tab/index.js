import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import React from 'react';
import { View } from 'react-native';
import i18n from 'translation';
import styles from './styles';
const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const { t } = i18n;

  return (
    <View style={styles.container}>
      <Header1x2x title={t('home')} back={false} />
      <View style={styles.body}>
      </View>
    </View>
  );
};
export default HomeTab;
