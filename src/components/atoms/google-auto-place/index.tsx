import { colors } from 'config/colors';
import { mvs, width } from 'config/metrices';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const GoogleSearchBar = ({
  textInputContainer,
  placeholderStyle,
  containerStyle,
  cross = false,
  inputStyle,
  leftArrow = true,
  style,
  onPress,
  onClick,
  placeholder = 'Enter an address',
  back,
  filter = false,
  countrySlug = null,
  ...props
}: any) => {
  const autoCompleteRef = React.useRef<any>(null);


  return (
    <View style={{ ...styles.mainContainer, ...style }}>
      <GooglePlacesAutocomplete
        ref={autoCompleteRef}
        placeholder={placeholder}
        fetchDetails={true}
        onPress={onPress}
        keyboardShouldPersistTaps="always"
        query={
          countrySlug
            ? {
              key: 'AIzaSyCHIlIvmsXf-sllfpXK0Q-1dV7uzgyFvfw',
              language: 'en',
              components: `country:${countrySlug}`,
            }
            : {
              key: 'AIzaSyCHIlIvmsXf-sllfpXK0Q-1dV7uzgyFvfw',
              language: 'en',
            }
        }
        styles={{
          container: { marginHorizontal: mvs(0), ...containerStyle },
          textInputContainer: {
            backgroundColor: null,
            height: mvs(51),
            ...textInputContainer,
          },
          textInput: {
            backgroundColor: null,
            height: '100%',
            paddingLeft: 0,
            paddingRight: mvs(30),
            color: colors.black,
            ...inputStyle,
          },
          listView: {},
          row: { zIndex: 1001 },
          poweredContainer: { backgroundColor: null },
        }}
        textInputProps={{
          clearButtonMode: false,
          placeholderTextColor: colors.placeholder,
          ...placeholderStyle,
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        // predefinedPlaces={['work']}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'taxi_stand',
        }}
        // filterReverseGeocodingByTypes={[
        //   'locality',
        //   'administrative_area_level_3',
        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        renderRightButton={() => {
          return (
            <>
              <View style={styles.verticalLine} />

              <TouchableOpacity onPress={() => {
                autoCompleteRef?.current?.setAddressText('');
              }} style={{ ...styles.search }}>
                <Entypo size={mvs(20)} name={'cross'} />
              </TouchableOpacity>
            </>
          );
        }}
        renderLeftButton={() => {
          return (
            <>
              <View
                style={{ ...styles.search, marginEnd: mvs(10) }}>
                <EvilIcons size={mvs(20)} name={'search'} />
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default GoogleSearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    width: width - mvs(40),
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: mvs(10),
    paddingHorizontal: mvs(20),
    flexDirection: 'row',
    minHeight: mvs(38),
  },
  left: {
    // position: 'absolute',
    // top:mvs(13.2),
    marginTop: mvs(13.2),
    marginRight: mvs(10),
  },
  search: {
    alignSelf: 'center',
    // position: 'absolute',
    // right: mvs(20),
    // marginTop: mvs(15)
  },
  verticalLine: {
    height: mvs(30),
    width: mvs(2),
    backgroundColor: '#d3d8e3',
    alignSelf: 'center',
    marginEnd: mvs(10),
  },
});
