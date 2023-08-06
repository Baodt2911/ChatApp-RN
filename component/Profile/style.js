import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageUser: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DB2BF80'
    },
    imageText: {
        fontFamily: 'SairaCondensed-SemiBold',
        fontSize: 60
    },
    content: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
        gap: 5
    },
    nameUser: {
        fontSize: 30,
        fontWeight: '600',
        fontFamily: 'SairaCondensed-SemiBold',
    },
    textEmail: {
        fontSize: 16,
        backgroundColor: '#dadadacc',
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontFamily: 'SairaCondensed-Regular',
    },
    btnLogout: {
        width: 150,
    }
})
export default styles