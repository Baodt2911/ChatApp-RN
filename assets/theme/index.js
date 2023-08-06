import { View, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import INVITE from '../../assets/icon/invite.png'
import OPTION from '../../assets/icon/option.png'
import BACK from '../../assets/icon/back.png'
import { formatDate } from "../../hooks/formatDate";
export const ScreenHeaderChatRight = ({ handleOpenInvite, handleShowMember }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '20%' }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    borderWidth: 1,
                    borderColor: 'gray',
                    paddingHorizontal: 8,
                    paddingVertical: 3
                }}
                onPress={handleOpenInvite}
            >
                <Image
                    source={INVITE}
                    resizeMode="contain"
                    style={{ width: 10, height: 10 }}
                />
                <Text style={{ fontFamily: 'SairaCondensed-Medium', fontSize: 13 }}>Mời</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleShowMember}
            >
                <Image
                    source={OPTION}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                />
            </TouchableOpacity>
        </View>
    )
}
export const ScreenHeaderChatLeft = ({ roomName, photoURL, handleBack }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <TouchableOpacity
                onPress={handleBack}
            >
                <Image
                    source={BACK}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
            <Image
                source={photoURL}
                resizeMode="cover"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100
                }}
            />
            <Text
                numberOfLines={2}
                style={{
                    fontSize: 20,
                    fontFamily: 'SairaCondensed-SemiBold',
                    width: 180,
                    lineHeight: 25
                }}
            >{roomName}</Text>
        </View>
    )
}
export const MessageMember = ({ text, displayName, photoURL, timeSend }) => {
    return (
        <View style={styles.itemMessage}>
            {
                photoURL?.length === 1 ?
                    <View style={styles.imageUser}>
                        <Text style={styles.textImage}>{photoURL}</Text>
                    </View> :
                    <Image
                        source={{ uri: `${photoURL}` }}
                        resizeMode='cover'
                        style={styles.imageUser}
                    />
            }
            <View>
                <Text style={styles.nameMember}>{displayName}</Text>
                <View style={styles.mainMessage}>
                    <View style={styles.messageText}>
                        <Text >{text}</Text>
                    </View>
                    {
                        timeSend ? <Text style={styles.timeSend}>{formatDate(timeSend)}</Text> :
                            <ActivityIndicator color="gray" />
                    }
                </View>
            </View>
        </View>
    )
}
export const MessageUser = ({ text, timeSend }) => {
    return (
        <View style={styles.itemMessageActive}>
            <View>
                <View style={styles.mainMessageActive}>
                    <View style={styles.messageTextActive}>
                        <Text style={{ color: '#f5f5f5', }}>{text}</Text>
                    </View>
                    {
                        timeSend ? <Text style={styles.timeSendActive}>{formatDate(timeSend)}</Text> :
                            <ActivityIndicator color="gray" />
                    }
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    itemMessage: {
        gap: 6,
        flexDirection: 'row',
        paddingVertical: 5,
    },
    imageUser: {
        width: 30,
        height: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dadadacc'
    },
    textImage: {
        fontSize: 20,
        fontFamily: 'SairaCondensed-SemiBold',
    },
    nameMember: {
        fontSize: 16,
        fontFamily: 'SairaCondensed-SemiBold',
    },
    mainMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    messageText: {
        maxWidth: '75%',
        backgroundColor: '#dadadacc',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,
        lineHeight: 20,
        borderTopLeftRadius: 5,
    },
    timeSend: {
        width: '20%',
        fontSize: 12,
        fontFamily: 'SairaCondensed-Medium',
    },
    itemMessageActive: {
        gap: 6,
        flexDirection: 'row-reverse',
        paddingVertical: 10,
    },
    mainMessageActive: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 5,
    },
    messageTextActive: {
        backgroundColor: '#098295',
        maxWidth: '75%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,
        lineHeight: 20,
        borderBottomRightRadius: 5
    },
    timeSendActive: {
        textAlign: 'right',
        width: '20%',
        fontSize: 12,
        fontFamily: 'SairaCondensed-Medium',
    }
})