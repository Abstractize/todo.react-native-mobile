import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { AppContext } from '@core/components/providers';
import { TaskItem, TaskList } from '@client/models';
import { ConfirmationModal } from '@shared/modal/components/ConfirmationModal';
import { RootState } from '@core/store';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { EditTaskModal } from '@client/components/modals';

import { StyleSheet } from 'react-native';
import { fetchTaskListByIdThunk } from '@client/store/taskListDetailThunk';
import { addTaskThunk, deleteTaskThunk, fetchTasksByListIdThunk, updateTaskThunk } from '@client/store/taskItemThunk';

type Props = {
    route: { params: { id: string } };
    navigation: any;
    taskList?: TaskList;
    tasks: TaskItem[];
    isLoading: boolean;
    fetchTasksByListIdThunk: (taskListId: string) => any;
    addTaskThunk: (task: Partial<TaskItem>) => any;
    updateTaskThunk: (task: TaskItem) => any;
    deleteTaskThunk: (id: string) => any;
    fetchTaskListByIdThunk: (id: string) => any;
};

type State = {
    title: string;
};

class TaskListDetail extends Component<Props, State> {
    static contextType = AppContext;
    // @ts-ignore - TypeScript incorrectly flags context override in class components with contextType
    context!: React.ContextType<typeof AppContext>;

    constructor(props: Props) {
        super(props);
        this.state = { title: '' };
    }

    componentDidMount(): void {
        const { id } = this.props.route.params;
        this.props.fetchTaskListByIdThunk(id);
        this.props.fetchTasksByListIdThunk(id);
    }

    handleAddTask = async () => {
        const { title } = this.state;
        const { id } = this.props.route.params;

        if (title.trim() === '') return;

        await this.props.addTaskThunk({
            title: title.trim(),
            taskListId: id,
            isCompleted: false,
        });
        await this.props.fetchTasksByListIdThunk(id);

        this.setState({ title: '' });
    };

    handleToggleTask = async (task: TaskItem) => {
        const { id } = this.props.route.params;

        await this.props.updateTaskThunk({
            ...task,
            isCompleted: !task.isCompleted,
        });
        await this.props.fetchTasksByListIdThunk(id);
    };

    handleEditTask = async (task: TaskItem) => {
        const context = this.context as any;
        const { id } = this.props.route.params;

        const result = await context.modalService.open(EditTaskModal, {
            title: `Edit Task: ${task.title}`,
            data: {
                title: task.title,
            },
        });

        if (result) {
            await this.props.updateTaskThunk({
                ...task,
                title: result.trim(),
            });
            await this.props.fetchTasksByListIdThunk(id);
        }
    };

    handleDeleteTask = async (task: TaskItem) => {
        const context = this.context as any;
        const { id } = this.props.route.params;

        const confirmed = await context.modalService.open(ConfirmationModal, {
            title: `Delete "${task.title}"`,
            message: `This action will permanently delete "${task.title}" from your task list.`,
        });

        if (confirmed) {
            await this.props.deleteTaskThunk(task.id!);
            await this.props.fetchTasksByListIdThunk(id);
        }
    };

    handleOpenSettings = async () => {
        this.props.navigation.navigate('TaskListSettings', {
            taskList: this.props.taskList,
        });
    };

    render() {
        const { taskList, tasks, isLoading } = this.props;
        const { title } = this.state;

        if (isLoading || !taskList) {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{taskList.title}</Text>
                    <Button title="Settings" onPress={this.handleOpenSettings} />
                </View>

                <Text style={{ color: '#6B7280', marginBottom: 8 }}>{taskList.description}</Text>

                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    <TextInput
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            borderRadius: 4,
                        }}
                        placeholder="Add a new task"
                        value={title}
                        onChangeText={(text) => this.setState({ title: text })}
                    />
                    <Button title="Add" onPress={this.handleAddTask} disabled={title.trim() === ''} />
                </View>

                {tasks.length === 0 ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 240 }}>
                        <Text style={{ color: '#9CA3AF' }}>No tasks found.</Text>
                    </View>
                ) : (
                    tasks.map((task) => (
                        <View
                            key={task.id}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#F3F4F6',
                                padding: 12,
                                marginBottom: 8,
                                borderRadius: 8,
                            }}
                        >
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.handleToggleTask(task)}
                            >
                                <Text
                                    style={{
                                        marginRight: 8,
                                        textDecorationLine: task.isCompleted ? 'line-through' : 'none',
                                        color: task.isCompleted ? '#f1f5f9' : '#111827',
                                    }}
                                >
                                    {task.title}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleEditTask(task)}>
                                <Text style={{ color: '#2563EB', marginRight: 8 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleDeleteTask(task)}>
                                <Text style={{ color: '#DC2626' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
    const id = ownProps.route.params.id;
    return {
        taskList: state.taskLists.taskLists.find((tl) => tl.id === id),
        tasks: state.taskItems.taskItems.filter((t) => t.taskListId === id),
        isLoading: state.taskLists.loading || state.taskItems.loading,
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, any, UnknownAction>
) => ({
    fetchTaskListByIdThunk: (id: string) => dispatch(fetchTaskListByIdThunk(id)),
    fetchTasksByListIdThunk: (id: string) => dispatch(fetchTasksByListIdThunk(id)),
    addTaskThunk: (task: Partial<TaskItem>) => dispatch(addTaskThunk(task)),
    updateTaskThunk: (task: TaskItem) => dispatch(updateTaskThunk(task)),
    deleteTaskThunk: (id: string) => dispatch(deleteTaskThunk(id)),
});


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListDetail);