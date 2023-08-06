import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30
    },
    header: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnIcon: {
        width: 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F6F4',
        borderRadius: 10
    },
    listRooms: {
        marginTop: 40,
    },
    itemRoom: {
        width: 350,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        gap: 10,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    imgRoom: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    titleRoom: {
        width: 250,
    },
    nameRoom: {
        fontSize: 24,
        fontFamily: 'SairaCondensed-SemiBold',
    },
    message: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    currentMessage: {
        fontSize: 16,
        fontFamily: 'SairaCondensed-Medium',
    },
    textMessage: {
        fontSize: 12,
        fontWeight: '300',
        fontFamily: 'SairaCondensed-Regular',
    },
    timeSend: {
        fontSize: 12,
        fontFamily: 'SairaCondensed-Medium',
    }
})
export default styles