import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
    itemRoom: {
        width: width * 0.9,
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
        width: width * 0.6,
    },
    nameRoom: {
        fontSize: 24,
        fontFamily: 'SairaCondensed-SemiBold',
    },
    message: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 10
    },
    currentMessage: {
        fontSize: 16,
        fontFamily: 'SairaCondensed-Medium',
        width: width * 0.6,
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