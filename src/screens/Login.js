// Login.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import CustomHeader from '../components/CustomHeader';

import { firebase } from './../firebase/firebase';

export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CustomHeader
                    title='Login'
                />
                <View style={styles.container}>

                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <View style={styles.buttons}>
                        <Button
                            title="Login"
                            onPress={this.handleLogin}
                            // style={styles.buttons}
                        />
                    </View>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fecc00',
        marginTop: 8
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        marginTop: 100,
        alignItems: 'center',
        padding: 8
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})