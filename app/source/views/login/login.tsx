import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_BLUE } from '../../css components/colours';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';




const LogIn = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showlanDiag, setShowlanDiag] = useState(false);


    const logIn = () => {
        auth().signInWithEmailAndPassword(userName, password).then(() => {
            console.warn('loggedin');

        }).catch(error => {
            if (error.code === 'auth/invalid-email') {
                console.warn('invalid-email');

            }
            if (error.code === 'auth/user-disabled') {
                console.warn('user-disabled');

            }
            if (error.code === 'auth/user-not-found') {
                console.warn('user-not-found');

            }
            if (error.code === 'auth/wrong-password') {
                console.warn('wrong-password');

            }
        })
    }

    const register = () => {
        auth()
            .createUserWithEmailAndPassword(userName, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });


    }
    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    return (
        <View style={{
            flex: 1,
            padding: 20
        }}>

            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>English</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        color="grey"
                        size={20}
                        onPress={() => {
                            setShowlanDiag(!showlanDiag)
                        }} />
                </View>
                {showlanDiag ?
                    <View style={{ borderColor: 'black', borderWidth: 1, alignItems: 'center', width: '40%', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ padding: 5, width: '100%', alignItems: 'center' }}>
                            <Text>English</Text>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={{ padding: 5, width: '100%', alignItems: 'center' }} >
                            <Text>Bangla</Text>
                        </TouchableOpacity>
                    </View> : null}
            </View>

            <Text style={{ fontFamily: 'Pacifico-Regular', textAlign: 'center', fontSize: 36, marginTop: '50%' }}>Instagram</Text>
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 0.5, }}
                placeholder='Phone Number, username or email'
                value={userName}
                onChangeText={(text) => setUserName(text)} />
            <View style={{ height: 15 }} />
            <View style={{ borderColor: 'gray', borderWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
                <TextInput
                    style={{ flex: 2 }}
                    placeholder='Enter password'
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)} />
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FontAwesome
                        name="eye"
                        color="grey"
                        size={20} /> : <FontAwesome
                        name="eye-slash"
                        color="grey"
                        size={20} />}
                </TouchableOpacity>
            </View>
            <View style={{ height: 15 }} />
            <TouchableOpacity style={{
                alignItems: 'flex-end'
            }}>
                <Text>Forgotten password?</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <TouchableOpacity style={{
                alignItems: 'center',
                backgroundColor: PRIMARY_BLUE,
                paddingVertical: 15
            }}
                onPress={() => {
                    logIn();
                }}>

                <Text style={{ color: 'white' }}>Login</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Divider style={{ flex: 1 }} />
                <Text style={{ paddingHorizontal: 10 }}>OR</Text>
                <Divider style={{ flex: 1 }} />
            </View>
            <View style={{ height: 20 }} />
            <TouchableOpacity style={{
                alignItems: 'center',
                backgroundColor: PRIMARY_BLUE,
                paddingVertical: 15
            }}
                onPress={() => {
                    onFacebookButtonPress();
                }}>

                <Text style={{ color: 'white' }}>Login with Facebook</Text>
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row', justifyContent: "center", marginTop: 'auto'
            }}>
                <Text>
                    Don't have an account?
                </Text>
                <TouchableOpacity>
                    <Text style={{ textDecorationLine: "underline", color: PRIMARY_BLUE }}> Sign Up</Text>
                </TouchableOpacity>
            </View>



        </View>
    )

}

export default LogIn;