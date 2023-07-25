import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style'
import GOOGLE from '../../assets/icon/google.png'
import FACEBOOK from '../../assets/icon/facebook.png'
import EMAIL from '../../assets/icon/mail.png'
import PASSWORD from '../../assets/icon/password.png'
import SHOW_PASSWORD from '../../assets/icon/show-pass.png'
import HIDDEN_PASSWORD from '../../assets/icon/hidden-pass.png'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const Login = ({ navigation }) => {
    const [textEmail, setTextEmail] = useState('')
    const [textPassword, setTextPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [iconPass, setIconPass] = useState(HIDDEN_PASSWORD)
    const [isLoading, setIsLoading] = useState(true)
    const handleShowPassword = () => {
        if (!showPass) {
            setIconPass(SHOW_PASSWORD)
        } else {
            setIconPass(HIDDEN_PASSWORD)
        }
        setShowPass(!showPass)
    }
    const handleLogin = () => {
        if (textEmail == '' && textPassword == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin', [{ text: 'OK', onPress: () => { } }])
            setIsLoading(true)
            return
        }
        if (textEmail == '') {
            Alert.alert('Thông báo', 'Vui lòng email', [{ text: 'OK', onPress: () => { } }])
            setIsLoading(true)
            return
        }
        if (textPassword == '') {
            Alert.alert('Thông báo', 'Vui lòng mật khẩu', [{ text: 'OK', onPress: () => { } }])
            setIsLoading(true)
            return
        }
        setIsLoading(false)
        signInWithEmailAndPassword(auth, textEmail, textPassword)
            .then((userCredential) => {
                const user = userCredential.user
                setIsLoading(true)
                Alert.alert('Thông báo', `Đăng nhập thành công`, [{
                    text: 'OK', onPress: () => {
                        const checkIfNewUser = () => {
                            if (user) {
                                const creationTime = user.metadata.creationTime;
                                const lastSignInTime = user.metadata.lastSignInTime;
                                return creationTime == lastSignInTime
                            }
                        };
                        if (checkIfNewUser() || !(user.photoURL)) {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'ChooseAvatar' }]
                            })
                        }
                    }
                }])
                setTextEmail('')
                setTextPassword('')
            }).catch((error) => {
                setIsLoading(true)
                let errorText = null
                switch (error.message) {
                    case "Firebase: Error (auth/invalid-email).":
                        errorText = "Email không hợp lệ"
                        setTextEmail('')
                        setTextPassword('')
                        break;
                    case "Firebase: Error (auth/user-not-found).":
                        errorText = "Vui lòng kiếm tra lại email"
                        setTextEmail('')
                        break;
                    case "Firebase: Error (auth/wrong-password).":
                        errorText = "Vui lòng kiếm tra lại mật khẩu"
                        setTextPassword('')
                        break;
                    default:
                        break;
                }
                Alert.alert('Thông báo', `${errorText}`, [{ text: 'OK', onPress: () => { } }])
            })
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleLogin}>Đăng nhập</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ width: '100%' }}
            >
                <View style={styles.input}>
                    <Image
                        source={EMAIL}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <TextInput placeholder="Email" style={styles.textInput}
                        onChangeText={(text) => setTextEmail(text)}
                        value={textEmail}
                    />
                </View>
                <View style={styles.input}>
                    <Image
                        source={PASSWORD}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <TextInput placeholder="Mật khẩu" style={styles.textInput}
                        onChangeText={(text) => setTextPassword(text)}
                        value={textPassword}
                        secureTextEntry={!showPass}
                    />
                    <TouchableOpacity onPress={handleShowPassword}>
                        <Image
                            source={iconPass}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity>
                <Text style={{ textAlign: 'right', color: 'gray', marginTop: 15 }}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            {
                isLoading ? <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                    <Text style={styles.textBtn}>Đăng nhập</Text>
                </TouchableOpacity>
                    : <ActivityIndicator color='gray' />
            }
            <Text style={styles.textOR}>___OR___</Text>
            <View style={styles.orSignIn}>
                <TouchableOpacity>
                    <Image
                        source={GOOGLE}
                        resizeMode='contain'
                        style={styles.iconLogin}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={FACEBOOK}
                        resizeMode='contain'
                        style={styles.iconLogin}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.noAccount}>
                <Text style={styles.textNoAccount}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textBtnRegister}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login