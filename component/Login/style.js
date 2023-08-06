import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        paddingHorizontal: 40
    },
    icon: {
        width: 20,
        height: 20,
        opacity: 0.5
    },
    input: {
        position: 'relative',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20
    },
    textInput: {
        width: '85%',
        paddingHorizontal: 10,
        fontFamily: 'SairaCondensed-Light',
        fontSize: 16
    },
    titleLogin: {
        fontSize: 32,
        textTransform: 'uppercase',
        fontFamily: 'SairaCondensed-SemiBold',
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    iconLogin: {
        width: 30,
        height: 30
    },
    btnLogin: {
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    textBtn: {
        fontSize: 24,
        fontFamily: 'SairaCondensed-Regular',
    },
    textOR: {
        fontFamily: 'SairaCondensed-Light',
        marginTop: 20,
        textAlign: 'center'
    },
    orSignIn: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        marginTop: 15
    },
    noAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    textNoAccount: {
        fontFamily: 'SairaCondensed-Light',
        fontSize: 16
    },
    textBtnRegister: {
        fontFamily: 'SairaCondensed-Medium',
        fontSize: 18,
        textDecorationLine: 'underline'
    }
})
export default styles