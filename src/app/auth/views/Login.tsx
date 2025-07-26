import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';

import { loginThunk } from '../store/authThunks';
import { RootState } from '../../core/store';

const mapStateToProps = (state: RootState) => ({
    isSubmitting: state.auth.isLoading,
});

const mapDispatchToProps = {
    login: loginThunk,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    navigation: NavigationProp<any>;
}

interface State {
    email: string;
    password: string;
}

class Login extends React.Component<Props, State> {
    state: State = {
        email: '',
        password: '',
    };

    handleSubmit = async () => {
        const { email, password } = this.state;

        const resultAction = await this.props.login({ email, password });

        if (loginThunk.rejected.match(resultAction)) {
            Alert.alert('Login failed', 'Please check your credentials and try again.');
            return;
        }

        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Analytics' }],
        });
    };

    render() {
        const { isSubmitting } = this.props;

        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding', android: undefined })}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    paddingHorizontal: 24,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        maxWidth: 400,
                        padding: 24,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 4,
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>
                        Login
                    </Text>

                    <Text style={{ marginBottom: 4, fontWeight: '500' }}>Email</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                        }}
                        placeholder="Enter email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />

                    <Text style={{ marginBottom: 4, fontWeight: '500' }}>Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 24,
                        }}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />

                    <TouchableOpacity
                        style={{
                            backgroundColor: isSubmitting ? '#aaa' : '#2563eb',
                            paddingVertical: 14,
                            borderRadius: 8,
                        }}
                        onPress={this.handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 16,
                            paddingVertical: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#2563eb',
                            backgroundColor: 'white',
                        }}
                        onPress={() => this.props.navigation.navigate('Register')}
                        disabled={isSubmitting}
                    >
                        <Text
                            style={{
                                color: '#2563eb',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connector(Login);