import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { TaskList } from '@client/models';

type Props = {
    visible: boolean;
    taskList?: TaskList;
    onClose: (result: TaskList | null) => void;
};

type State = {
    title: string;
    description: string;
    touched: boolean;
};

export class TaskListModal extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            title: props.taskList?.title ?? '',
            description: props.taskList?.description ?? '',
            touched: false,
        };
    }

    handleSave = () => {
        const { title, description } = this.state;

        if (title.trim().length < 3) {
            this.setState({ touched: true });
            return;
        }

        const result: TaskList = {
            id: this.props.taskList?.id ?? null,
            title: title.trim(),
            description: description.trim(),
        };

        this.props.onClose(result);
    };

    handleCancel = () => {
        this.props.onClose(null);
    };

    render() {
        const { visible } = this.props;
        const { title, description, touched } = this.state;

        const titleInvalid = touched && title.trim().length < 3;

        return (
            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={(text) => this.setState({ title: text })}
                            onBlur={() => this.setState({ touched: true })}
                        />
                        {titleInvalid && (
                            <Text style={styles.error}>Minimum 3 characters required.</Text>
                        )}

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            value={description}
                            multiline
                            onChangeText={(text) => this.setState({ description: text })}
                        />

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={this.handleCancel}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <Button title="Save" onPress={this.handleSave} disabled={title.trim().length < 3} />
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
        justifyContent: 'center',
        backgroundColor: '#00000099',
    },
    modal: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cancel: {
        color: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
});