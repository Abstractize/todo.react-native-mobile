import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    title: string;
    value: string;
};

export class StatCard extends React.Component<Props> {
    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.value}>{this.props.value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f9fa', // Bootstrap "bg-light"
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        width: '48%',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 14,
        color: '#6c757d', // Bootstrap "text-secondary"
        marginBottom: 4,
    },
    value: {
        fontSize: 28,
        color: '#212529', // Bootstrap "text-dark"
        textAlign: 'right',
        fontWeight: '600',
    },
});