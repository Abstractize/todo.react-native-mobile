import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { TaskList } from '../models';
import { TaskListCard, RecommendationCard } from '../components';
import { RootState } from '@core/store';
import { addTaskListThunk, deleteTaskListThunk, fetchTaskLists, updateTaskListThunk } from '@client/store/taskListThunk';
import { addRecommendedListThunk, fetchRecommendations, removeRecommendationThunk } from '@client/store/recommendationThunk';
import { TaskListModal } from '@client/components/modals';
import { AppContext } from '@core/components/providers';
import { ConfirmationModal } from '@shared/modal/components/ConfirmationModal';

const mapState = (state: RootState) => ({
    taskLists: state.taskLists.taskLists,
    recommendations: state.recommendations.recommendations,
});

const mapDispatch = {
    fetchTaskLists,
    fetchRecommendations,
    addTaskListThunk,
    deleteTaskListThunk,
    updateTaskListThunk,
    addRecommendedListThunk,
    removeRecommendationThunk,
};

const connector = connect(mapState, mapDispatch);

import type { NavigationProp } from '@react-navigation/native';

type PropsFromRedux = ConnectedProps<typeof connector>;

type TasksProps = PropsFromRedux & {
    navigation: NavigationProp<any>;
};

class Tasks extends React.Component<TasksProps> {
    static contextType = AppContext;
    // @ts-ignore - TypeScript incorrectly flags context override in class components with contextType
    context!: React.ContextType<typeof AppContext>;

    state = {
        showRecommendations: false,
    };

    async componentDidMount() {
        Promise.all([
            this.props.fetchTaskLists(),
            this.props.fetchRecommendations(),
        ]);
    }

    render() {
        const { taskLists, recommendations } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Lists</Text>
                    <TouchableOpacity style={styles.addButton} onPress={this.handleAddList}>
                        <Text style={styles.addButtonText}>+ Add Task List</Text>
                    </TouchableOpacity>
                </View>

                {taskLists.length === 0 ? (
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No task lists found.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={taskLists}
                        keyExtractor={(item) => item.id ?? ''}
                        renderItem={({ item }) => (
                            <TaskListCard
                                taskList={item}
                                onPress={() => this.goToList(item)}
                                onEdit={() => this.editTaskList(item)}
                                onDelete={() => this.deleteTaskList(item)}
                            />
                        )}
                    />
                )}

                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        style={styles.dropdownHeader}
                        onPress={() => this.setState({ showRecommendations: !this.state?.showRecommendations })}
                    >
                        <Text style={styles.recommendationTitle}>Recommended Lists</Text>
                        <Text style={styles.arrow}>
                            {this.state?.showRecommendations ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>
                    {this.state?.showRecommendations && recommendations.length > 0 && (
                        <View style={styles.recommendations}>
                            {recommendations.map((rec) => (
                                <RecommendationCard
                                    key={rec.id}
                                    recommendation={rec}
                                    onAdd={() => this.addRecommendedList(rec)}
                                    onRemove={() => this.removeRecommendation(rec)}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </View>
        );
    }

    handleAddList = async () => {

        const context = this.context as any;
        const newTaskList = await context.modalService.open(
            TaskListModal,
            {
                title: 'Create New Task List',
                data: { taskList: { id: null, title: '', description: '' } },
            },
        );

        if (newTaskList) {
            await this.props.addTaskListThunk(newTaskList);
            await this.props.fetchTaskLists();
        }

    };

    goToList(taskList: TaskList) {
        this.props.navigation.navigate('TaskListDetail', { id: taskList.id! });
    }

    editTaskList = async (taskList: TaskList) => {
        const context = this.context as any;
        const newTaskList = await context.modalService.open(
            TaskListModal,
            {
                title: 'Edit Task List',
                data: { taskList: taskList },
            },
        );

        if (newTaskList) {
            await this.props.updateTaskListThunk(newTaskList);
            await this.props.fetchTaskLists();
        }
    };

    deleteTaskList = async (taskList: TaskList) => {
        const context = this.context as any;
        const removeConfirmation = await context.modalService.open(
            ConfirmationModal,
            {
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this task list?',
            },
        );

        if (removeConfirmation) {
            await this.props.deleteTaskListThunk(taskList.id!);
            await this.props.fetchTaskLists();
        }

    };

    addRecommendedList = async (rec: TaskList) => {
        await this.props.addRecommendedListThunk(rec);
        await this.props.fetchTaskLists();
        await this.props.fetchRecommendations();
    };

    removeRecommendation = async (rec: TaskList) => {
        await this.props.removeRecommendationThunk(rec.id!);
        await this.props.fetchRecommendations();
    };
}

export default connector(Tasks);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    addButton: { backgroundColor: '#2563eb', padding: 10, borderRadius: 5 },
    addButtonText: { color: 'white', fontWeight: '600' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: '#999' },
    recommendations: { marginTop: 20, padding: 10, backgroundColor: '#f1f5f9', borderRadius: 8 },
    recommendationTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
    dropdownContainer: { marginTop: 20 },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
    },
    arrow: { fontSize: 18 },
});