import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@core/store';
import { fetchAnalyticsSummary, fetchWeeklyAnalytics } from '@client/store/analyticsThunk';
import { StatCard } from '@client/components';
import { BarChart } from 'react-native-chart-kit';
import { NavigationProp } from '@react-navigation/native';
import { AppContext } from '@core/components/providers';

const mapState = (state: RootState) => ({
    summary: state.analytics.summary,
    weekly: state.analytics.weekly,
    loading: state.analytics.loading,
});

const mapDispatch = {
    fetchAnalyticsSummary,
    fetchWeeklyAnalytics,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type StatsProps = PropsFromRedux & {
    navigation: NavigationProp<any>;
};

class Stats extends React.Component<StatsProps> {
    static contextType = AppContext;
    // @ts-ignore - TypeScript incorrectly flags context override in class components with contextType
    context!: React.ContextType<typeof AppContext>;

    state = {
        title: 'Statistics',
    }

    async componentDidMount() {
        await Promise.all([
            this.props.fetchAnalyticsSummary(),
            this.props.fetchWeeklyAnalytics(),
        ]);
    }

    getChartData() {
        const { weekly } = this.props;
        if (!weekly) return null;

        return {
            labels: weekly.dailyStats.map(d => d.dayOfWeek),
            datasets: [
                {
                    data: weekly.dailyStats.map(d => d.created),
                    color: () => '#0d6efd',
                    label: 'Created',
                },
                {
                    data: weekly.dailyStats.map(d => d.completed),
                    color: () => '#dc3545',
                    label: 'Completed',
                },
            ],
            legend: ['Created', 'Completed'],
        };
    }

    render() {
        const { summary, loading } = this.props;
        const screenWidth = Dimensions.get('window').width;

        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        const chartData = this.getChartData();

        return (


            <ScrollView style={styles.container}>
                {summary && (
                    <View style={styles.cardsContainer}>
                        <StatCard title="Created Tasks" value={summary.createdTasks.toString()} />
                        <StatCard title="Completed Tasks" value={summary.completedTasks.toString()} />
                        <StatCard title="Pending Tasks" value={`${summary.completionRate.toFixed(2)}%`} />
                        <StatCard
                            title="Overdue Tasks"
                            value={summary.lastActivity ? new Date(summary.lastActivity).toLocaleDateString() : 'N/A'}
                        />
                    </View>
                )}

                <Text style={styles.chartTitle}>Weekly Progress</Text>
                {chartData && (
                    <BarChart
                        data={chartData}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => '#0d6efd',
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            barPercentage: 0.5,
                        }}
                        verticalLabelRotation={0}
                        fromZero
                        showBarTops={false}
                        yAxisLabel={''}
                        yAxisSuffix={''}
                    />
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
});

export default connector(Stats);