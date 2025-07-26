import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskList } from '../../models';

type Props = {
    taskList: TaskList;
    onPress?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
};

export const TaskListCard: React.FC<Props> = ({ taskList, onPress, onEdit, onDelete }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card} >
            <View style={{ flex: 1 }}>
                <Text style={styles.title}> {taskList.title} </Text>
                < Text style={styles.description} > {taskList.description} </Text>
            </View>
            < View style={styles.actions} >
                <TouchableOpacity onPress={onEdit} style={styles.button} >
                    <Text style={styles.actionText}> Edit </Text>
                </TouchableOpacity>
                < TouchableOpacity onPress={onDelete} style={[styles.button, { marginLeft: 10 }]} >
                    <Text style={[styles.actionText, { color: 'red' }]}> Delete </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    description: {
        color: '#555',
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    button: {
        padding: 6,
    },
    actionText: {
        color: '#2563eb',
        fontWeight: '600',
    },
});