import { StyleSheet } from "react-native";
import { mvs } from "config/metrices";
import { colors } from 'config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    slide: { paddingHorizontal: mvs(20), },
    contentContainerStyle: {
        paddingVertical: mvs(30),
        paddingHorizontal: mvs(0)
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
        bottom: mvs(60),
        right: mvs(20),
        paddingHorizontal: mvs(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',

        // width: '100%',
    },
    imageText:{
    color: colors.primary,
    fontSize:mvs(14),
    marginBottom:mvs(10)
    },
    imageContainer:{
        width:mvs(150),
        height:mvs(150),
        backgroundColor:colors.gray,
        marginBottom:mvs(10),
        alignItems:'center',
        justifyContent:'center'
        
    }
});
export default styles;