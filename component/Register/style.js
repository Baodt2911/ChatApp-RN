import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        opacity: 0.5
    },
    titleRegister: {
        fontSize: 32,
        textTransform: 'uppercase',
        fontFamily: 'SairaCondensed-SemiBold',
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginBottom: 20,
    },
    main: {
        width: 300,
        gap: 25,
        marginBottom: 30,
    },
    inputFullName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    input: {
        position: 'relative',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    },
    inputFirstName: {
        position: 'relative',
        height: 40,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    },
    inputLastName: {
        position: 'relative',
        height: 40,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    },
    textInput: {
        width: '85%',
        paddingHorizontal: 10,
        fontFamily: 'SairaCondensed-Light',
        fontSize: 16
    },
    textBtn: {
        fontSize: 24,
        fontFamily: 'SairaCondensed-Regular',
    },
    iconLogin: {
        width: 30,
        height: 30
    },
    textOR: {
        fontFamily: 'SairaCondensed-Light',
        marginTop: 20,
        textAlign: 'center'
    },
    orSignUp: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        marginTop: 15
    },
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    textAccount: {
        fontFamily: 'SairaCondensed-Light',
        fontSize: 16
    },
    textBtnLogin: {
        fontFamily: 'SairaCondensed-Medium',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    btnRegister: {
        width: 300,
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textError: {
        position: 'absolute',
        left: 10,
        bottom: -18,
        fontSize: 12,
        fontFamily: 'SairaCondensed-Light',
        color: 'red'
    }
})
export default styles