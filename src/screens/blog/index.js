import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {BLOGS_LIST, SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Image, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
import CustomFlatList from 'components/atoms/custom-flatlist';
import BlogCard from 'components/molecules/blog-card';
const BlogScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderServiceList = ({item}) => (
    <BlogCard
      item={item}
      // onPress={() =>
      //   props?.navigation?.navigate(item?.screen, {title: t(item?.title)})
      // }
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('blogs')} />

      <View style={styles.body}>
        <CustomFlatList
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={BLOGS_LIST}
          renderItem={renderServiceList}
          ItemSeparatorComponent={itemSeparatorComponent()}
        />
      </View>
    </View>
  );
};
export default BlogScreen;
