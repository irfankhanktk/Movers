import { StyleSheet } from "react-native";
import { mvs } from "config/metrices";
import { colors } from 'config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    slide: { paddingHorizontal: mvs(0), },
    contentContainerStyle: {
        paddingVertical: mvs(30),
        paddingHorizontal: mvs(20)
    },
    button: {
        marginTop: mvs(20),
    },
    accountText: {
        color: colors.primary,
        alignSelf: 'center',
        marginTop: mvs(20)
    },
    bottom: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: mvs(30),
        right: mvs(10),
        paddingHorizontal: mvs(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',

        // width: '100%',
    },
    imageText: {
        color: colors.primary,
        fontSize: mvs(14),
        marginBottom: mvs(10)
    },
    imageContainer: {
        width: mvs(150),
        height: mvs(150),
        backgroundColor: colors.gray,
        marginBottom: mvs(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:mvs(10)
    },
    image:{ width: mvs(150), height: mvs(150), resizeMode: 'cover',borderRadius:mvs(10) },
    uploadContainer:{ position: 'absolute', zIndex: 1, alignItems: 'center' },
    datePickerContainer:{height:40,borderWidth:1,alignItems:'center',justifyContent:'center'}
});
export default styles;