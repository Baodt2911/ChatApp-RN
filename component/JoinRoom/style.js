import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5cc',
    },
    main: {
        width: '70%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        gap: 15,
    },
    close: {
        position: 'absolute',
        right: 5,
        top: 5,
        width: 30,
        height: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'SairaCondensed-SemiBold',
        marginTop: 10
    },
    inputCode: {
        height: 40,
        backgroundColor: '#f5f5f5cc',
        marginHorizontal: 30,
        paddingLeft: 10,
        fontFamily: 'SairaCondensed-Medium',
        letterSpacing: 2
    },
    btnJoinRoom: {
        marginHorizontal: 30,
        height: 40,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textBtn: {
        fontSize: 20,
        fontFamily: 'SairaCondensed-Medium',
        color: '#fff',
        textTransform: 'uppercase'
    }
})
export default styles