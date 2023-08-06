import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    header: {
        marginHorizontal: 20
    },
    textTop: {
        fontSize: 40,
        textTransform: 'uppercase',
        color: '#394867',
        fontFamily: 'SairaCondensed-SemiBold'
    },
    textBottom: {
        fontSize: 24,
        color: 'gray',
        fontFamily: 'SairaCondensed-Light',
        lineHeight: 30
    },
    imageWelcome: {
        width: '100%',
        height: '50%'
    },
    btnStart: {
        width: '65%',
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F5A401',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStart: {
        color: '#fff',
        fontSize: 26,
        textTransform: 'uppercase',
        fontFamily: 'SairaCondensed-SemiBold'
    }
})
export default styles