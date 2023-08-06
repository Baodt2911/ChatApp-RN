import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexBasis: 80,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderBottomColor: '#dadada',
        borderBottomWidth: 1
    },
    messageInput: {
        flexDirection: 'row',
        gap: 5,
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 10,
    },
    textInputMessage: {
        width: '90%',
        minHeight: 40,
        maxHeight: 200,
        borderRadius: 20,
        backgroundColor: '#dadadacc',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    iconSend: {
        width: 25,
        height: 25,
    },
    chat: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    mainChat: {
        paddingHorizontal: 10,
    },
})
export default styles