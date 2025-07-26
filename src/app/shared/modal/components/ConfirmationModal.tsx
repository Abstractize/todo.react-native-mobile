import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface ConfirmModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    onClose: (result: boolean) => void;
}

export class ConfirmationModal extends React.Component<ConfirmModalProps> {
    static defaultProps = {
        title: 'Confirmation',
        message: 'Are you sure about this action?',
    };

    render() {
        const { visible, title, message, onClose } = this.props;

        return (
            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>⚠️</Text>
                        </View>

                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.message}>{message}</Text>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                activeOpacity={0.8}
                                onPress={() => onClose(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                activeOpacity={0.8}
                                onPress={() => onClose(true)}
                            >
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 10,
    },
    icon: {
        fontSize: 48,
        color: '#d97706',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 6,
    },
    message: {
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 6,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#6b7280',
    },
    cancelText: {
        color: 'white',
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#dc2626',
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
    },
});