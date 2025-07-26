import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskList } from '../../models';

type Props = {
    recommendation: TaskList;
    onAdd?: () => void;
    onRemove?: () => void;
};

export const RecommendationCard: React.FC<Props> = ({ recommendation, onAdd, onRemove }) => {
    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{recommendation.title}</Text>
                <Text style={styles.description}>{recommendation.description}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onAdd} style={styles.button}>
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRemove} style={styles.button}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e0f2fe',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    description: {
        color: '#333',
        fontSize: 13,
    },
    actions: {
        marginLeft: 12,
        flexDirection: 'column',
    },
    button: {
        paddingVertical: 4,
    },
    addText: {
        color: '#22c55e',
        fontWeight: '600',
    },
    removeText: {
        color: '#ef4444',
        fontWeight: '600',
    },
});