import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Medium from 'typography/medium-text';
import CustomSwiper from 'components/atoms/swiper';
import {PrimaryButton} from 'components/atoms/buttons';
const HomeSwiper = () => {
  return (
    <View style={styles.container}>
      <CustomSwiper>
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/s1.f9907177.jpg',
            }}
            style={styles.sliderImage}
          />
          <View
            style={{
              position: 'absolute',
              bottom: mvs(30),
              width: '100%',
              paddingHorizontal: mvs(20),
            }}>
            <Medium
              label={
                'Move Anything to Anywhere… at the cheapest rates!! Start your moving journey now with the United Kingdoms most convenient transport and removal agency.'
              }
              color={colors.white}
              fontSize={mvs(10)}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
            <PrimaryButton
              title={t('book_now')}
              containerStyle={{
                alignSelf: 'center',
                marginTop: mvs(10),
                width: mvs(100),
                height: mvs(30),
                borderRadius: mvs(30),
              }}
              textStyle={{fontSize: mvs(12)}}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/5.29deee86.png',
            }}
            style={styles.sliderImage}
          />
          <View
            style={{
              position: 'absolute',
              bottom: mvs(30),
              width: '100%',
              paddingHorizontal: mvs(20),
            }}>
            <Medium
              label={
                'Move Anything to Anywhere… at the cheapest rates!! Start your moving journey now with the United Kingdoms most convenient transport and removal agency.'
              }
              color={colors.white}
              fontSize={mvs(10)}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
            <PrimaryButton
              title={t('book_now')}
              containerStyle={{
                alignSelf: 'center',
                marginTop: mvs(10),
                width: mvs(100),
                height: mvs(30),
                borderRadius: mvs(30),
              }}
              textStyle={{fontSize: mvs(12)}}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/6.58041a1b.png',
            }}
            style={styles.sliderImage}
          />
          <View
            style={{
              position: 'absolute',
              bottom: mvs(30),
              width: '100%',
              paddingHorizontal: mvs(20),
            }}>
            <Medium
              label={
                'Move Anything to Anywhere… at the cheapest rates!! Start your moving journey now with the United Kingdoms most convenient transport and removal agency.'
              }
              color={colors.white}
              fontSize={mvs(10)}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
            <PrimaryButton
              title={t('book_now')}
              containerStyle={{
                alignSelf: 'center',
                marginTop: mvs(10),
                width: mvs(100),
                height: mvs(30),
                borderRadius: mvs(30),
              }}
              textStyle={{fontSize: mvs(12)}}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/7.fe4e3dab.png',
            }}
            style={styles.sliderImage}
          />
          <View
            style={{
              position: 'absolute',
              bottom: mvs(30),
              width: '100%',
              paddingHorizontal: mvs(20),
            }}>
            <Medium
              label={
                'Move Anything to Anywhere… at the cheapest rates!! Start your moving journey now with the United Kingdoms most convenient transport and removal agency.'
              }
              color={colors.white}
              fontSize={mvs(10)}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
            <PrimaryButton
              title={t('book_now')}
              containerStyle={{
                alignSelf: 'center',
                marginTop: mvs(10),
                width: mvs(100),
                height: mvs(30),
                borderRadius: mvs(30),
              }}
              textStyle={{fontSize: mvs(12)}}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/8.a16c3c07.png',
            }}
            style={styles.sliderImage}
          />
          <View
            style={{
              position: 'absolute',
              bottom: mvs(30),
              width: '100%',
              paddingHorizontal: mvs(20),
            }}>
            <Medium
              label={
                'Move Anything to Anywhere… at the cheapest rates!! Start your moving journey now with the United Kingdoms most convenient transport and removal agency.'
              }
              color={colors.white}
              fontSize={mvs(10)}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
            <PrimaryButton
              title={t('book_now')}
              containerStyle={{
                alignSelf: 'center',
                marginTop: mvs(10),
                width: mvs(100),
                height: mvs(30),
                borderRadius: mvs(30),
              }}
              textStyle={{fontSize: mvs(12)}}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/9.0ec25ad3.png',
            }}
            style={styles.sliderImage}
          />
          <View
            style={{
              position: 'absolute',
              bottom: mvs(30),
              width: '100%',
              paddingHorizontal: mvs(20),
            }}>
            <Medium
              label={
                'Move Anything to Anywhere… at the cheapest rates!! Start your moving journey now with the United Kingdoms most convenient transport and removal agency.'
              }
              color={colors.white}
              fontSize={mvs(10)}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
            <PrimaryButton
              title={t('book_now')}
              containerStyle={{
                alignSelf: 'center',
                marginTop: mvs(10),
                width: mvs(100),
                height: mvs(30),
                borderRadius: mvs(30),
              }}
              textStyle={{fontSize: mvs(12)}}
            />
          </View>
        </View>
      </CustomSwiper>
    </View>
  );
};
export default HomeSwiper;
const styles = StyleSheet.create({
  container: {
    height: mvs(220),
    // marginHorizontal: mvs(20),
    marginTop: mvs(10),
  },
  sliderImage: {
    width: width - mvs(40),
    height: mvs(180),
    borderRadius: mvs(18),
    resizeMode: 'cover',
  },
  dotStyle: {marginBottom: -mvs(40)},
  activeDotStyle: {marginBottom: -mvs(40), backgroundColor: colors.primary},
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
