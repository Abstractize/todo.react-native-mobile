import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';

interface EditTaskModalProps {
    title: string;
    onClose: (result: string | null) => void;
}

interface EditTaskModalState {
    title: string;
    touched: boolean;
}

export class EditTaskModal extends React.Component<EditTaskModalProps, EditTaskModalState> {
    constructor(props: EditTaskModalProps) {
        super(props);
        this.state = {
            title: props.title ?? '',
            touched: false,
        };
    }

    isValid = () => this.state.title.trim().length > 0;

    onSubmit = () => {
        if (this.isValid()) {
            this.props.onClose(this.state.title.trim());
        }
    };

    onCancel = () => {
        this.props.onClose(null);
    };

    render() {
        const { title, touched } = this.state;
        const showError = touched && !this.isValid();

        return (
            <Modal animationType='slide' transparent={true} visible={true}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.container}
                >
                    <View style={styles.inner}>
                        <Text style={styles.label}>Task title</Text>
                        <TextInput
                            value={title}
                            style={[styles.input, showError && styles.inputError]}
                            placeholder="Task title"
                            onChangeText={(text) => this.setState({ title: text })}
                            onBlur={() => this.setState({ touched: true })}
                        />
                        {showError && <Text style={styles.errorText}>Title is required</Text>}

                        <View style={styles.buttons}>
                            <Button title="Cancel" onPress={this.onCancel} />
                            <Button title="Save" onPress={this.onSubmit} disabled={!this.isValid()} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    inner: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 4,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        gap: 10,
    },
});