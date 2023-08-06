import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100
    },
    showImage: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageRoom: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    textShowImage: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: 'gray',
        fontFamily: 'SairaCondensed-Medium',
    },
    roomNameInput: {
        borderWidth: 1,
        borderColor: '#dadada',
        marginVertical: 20,
        paddingHorizontal: 10,
        height: 40,
        width: 250,
        fontSize: 18,
        fontFamily: 'SairaCondensed-Medium',
    },
    btnCreateRoom: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textBtn: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#fff',
        fontFamily: 'SairaCondensed-Medium',
    }
})
export default styles