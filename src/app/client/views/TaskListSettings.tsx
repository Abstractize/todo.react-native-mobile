import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { TaskList } from '../models';
import { ModalService } from '@shared/modal';
import { ConfirmationModal } from '@shared/modal/components/ConfirmationModal';
import { updateTaskListThunk, deleteTaskListThunk } from '../store/taskListThunk';

interface OwnProps {
    route: { params: { taskList: TaskList } };
    navigation: any;
    modalService: ModalService;
}

interface DispatchProps {
    updateTaskListThunk: (taskList: TaskList) => Promise<any>;
    deleteTaskListThunk: (id: string) => Promise<any>;
}

type Props = OwnProps & DispatchProps;

interface State {
    taskList: TaskList;
    title: string;
    description: string;
    touched: boolean;
}

class TaskListSettings extends React.Component<Props, State> {
    constructor(props: Props) {
        const { taskList } = props.route.params;

        super(props);

        this.state = {
            taskList,
            title: taskList.title ?? '',
            description: taskList.description ?? '',
            touched: false,
        };
    }

    isValid = () => this.state.title.trim().length > 0;

    handleSave = async () => {
        if (!this.isValid()) return;

        const updated: TaskList = {
            ...this.state.taskList,
            title: this.state.title.trim(),
            description: this.state.description.trim(),
        };

        await this.props.updateTaskListThunk(updated);
        this.props.navigation.goBack();
    };

    handleDelete = async () => {
        const confirmed = await this.props.modalService.open(ConfirmationModal, {
            title: `Delete "${this.state.taskList.title}"`,
            data: {
                title: 'Are you sure?',
                message: `This action will permanently delete "${this.state.taskList.title}".`,
            },
        });

        if (confirmed) {
            await this.props.deleteTaskListThunk(this.state.taskList.id!);
            this.props.navigation.navigate('Analytics');
            this.props.navigation.goBack();
        }
    };

    handleCancel = () => {
        this.props.navigation.goBack();
    };

    render() {
        const { title, description, touched } = this.state;
        const showError = touched && !this.isValid();

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <View style={styles.card}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        value={title}
                        style={[styles.input, showError && styles.inputError]}
                        placeholder="Enter task list title"
                        onChangeText={(text) => this.setState({ title: text })}
                        onBlur={() => this.setState({ touched: true })}
                    />
                    {showError && <Text style={styles.errorText}>Title is required</Text>}

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        value={description}
                        style={styles.input}
                        placeholder="Enter description"
                        multiline
                        numberOfLines={3}
                        onChangeText={(text) => this.setState({ description: text })}
                    />

                    <View style={styles.buttonRow}>
                        <Button title="Delete List" color="red" onPress={this.handleDelete} />
                        <View style={styles.rightButtons}>
                            <Button title="Cancel" onPress={this.handleCancel} />
                            <Button title="Save" onPress={this.handleSave} disabled={!this.isValid()} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    card: { backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 4 },
    label: { marginTop: 12, marginBottom: 4, fontSize: 16, fontWeight: '500' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: { borderColor: 'red' },
    errorText: { color: 'red', marginTop: 4 },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    rightButtons: { flexDirection: 'row', gap: 10 },
});

export default connect(null, {
    updateTaskListThunk,
    deleteTaskListThunk,
})(TaskListSettings);