// modal/ModalHost.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { ModalService } from '../service/ModalService';

interface ModalHostProps {
    modalService: ModalService;
}

interface ModalHostState {
    visible: boolean;
    component: React.ComponentType<any> | null;
    data?: any;
    title?: string;
    resolve?: (value: any) => void;
}

export class ModalHost extends React.Component<ModalHostProps, ModalHostState> {
    constructor(props: ModalHostProps) {
        super(props);

        this.state = {
            visible: false,
            component: null,
            title: '',
        };

        this.props.modalService.registerRenderer(this.showModal);
    }

    showModal = ({ component, options, resolve }: any) => {
        this.setState({
            visible: true,
            component,
            data: options?.data,
            title: options?.title || '',
            resolve,
        });
    };

    closeModal = (result: any) => {
        this.setState({ visible: false, component: null });
        this.state.resolve?.(result);
    };

    render() {
        const { visible, component: Body, title, data, resolve } = this.state;
        const onClose = (result: any) => {
            this.setState({ visible: false, component: null, data: undefined, title: '' });
            resolve?.(result);
        };

        if (!Body) return null;

        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => onClose(null)}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modal}>
                        {title ? <Text style={styles.title}>{title}</Text> : null}
                        <Body
                            visible={visible}
                            {...(data || {})}
                            onClose={onClose}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        margin: 20,
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'white',
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
});