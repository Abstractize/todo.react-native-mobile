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

import { registerThunk } from '../store/authThunks';
import { RootState } from '../../core/store';

const mapStateToProps = (state: RootState) => ({
    isSubmitting: state.auth.isLoading,
});

const mapDispatchToProps = {
    register: registerThunk,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    navigation: NavigationProp<any>;
}

interface State {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

class Register extends React.Component<Props, State> {
    state: State = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    handleSubmit = async () => {
        const { firstname, lastname, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const resultAction = await this.props.register({
                fullname: `${firstname} ${lastname}`,
                email,
                password,
            });

            if (registerThunk.rejected.match(resultAction)) {
                throw new Error('Registration failed');
            }

            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Analytics' }],
            });
        } catch (err) {
            Alert.alert('Registration failed', 'Please check your details and try again.');
        }
    };

    render() {
        const { isSubmitting } = this.props;
        const { firstname, lastname, email, password, confirmPassword } = this.state;

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
                        Create an Account
                    </Text>

                    <Text style={{ marginBottom: 4, fontWeight: '500' }}>First Name</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                        }}
                        placeholder="Enter first name"
                        onChangeText={(firstname) => this.setState({ firstname })}
                        value={firstname}
                    />

                    <Text style={{ marginBottom: 4, fontWeight: '500' }}>Last Name</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                        }}
                        placeholder="Enter last name"
                        onChangeText={(lastname) => this.setState({ lastname })}
                        value={lastname}
                    />

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
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({ email })}
                        value={email}
                    />

                    <Text style={{ marginBottom: 4, fontWeight: '500' }}>Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                        }}
                        placeholder="Enter password"
                        secureTextEntry
                        onChangeText={(password) => this.setState({ password })}
                        value={password}
                    />

                    <Text style={{ marginBottom: 4, fontWeight: '500' }}>Confirm Password</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 24,
                        }}
                        placeholder="Confirm password"
                        secureTextEntry
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        value={confirmPassword}
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
                            {isSubmitting ? 'Submitting...' : 'Register'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connector(Register);