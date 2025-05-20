
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';

interface LoadingAndErrorStateProps {
    loading: boolean;
    error: string | null;
    loadingMessage: string;
    errorMessage: string;
    noDataMessage?: string;
    hasData?: boolean;
}

const LoadingAndErrorState: React.FC<LoadingAndErrorStateProps> = ({
    loading,
    error,
    loadingMessage,
    errorMessage,
    noDataMessage,
    hasData = true,
}) => {
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>{loadingMessage}</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{errorMessage}: {error}</Text>
            </View>
        );
    }

    if (!hasData && noDataMessage) {
        return (
            <View style={styles.centered}>
                <Text style={styles.noDataText}>{noDataMessage}</Text>
            </View>
        );
    }

    return null;
};

export default LoadingAndErrorState;
