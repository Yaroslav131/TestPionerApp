import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { RootState } from '../../redux/rootReducer';
import { getDriverDetails } from '../../redux/drivers/driversActions';
import { getDriverRaceResults } from '../../redux/raceResults/raceResultsActions';
import { Race, Result } from '../../types/ergast';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';

type DriverDetailsScreenProps = StackScreenProps<RootStackParamList, 'DriverDetails'>;

const DriverDetailsScreen: React.FC<DriverDetailsScreenProps> = ({ route }) => {
    const { driverId } = route.params;
    const dispatch: any = useDispatch();

    const { currentDriver, loading: driverLoading, error: driverError } = useSelector(
        (state: RootState) => state.drivers
    );

    const { results: raceResults, loading: resultsLoading, error: resultsError } = useSelector(
        (state: RootState) => state.raceResults
    );

    useEffect(() => {
        dispatch(getDriverDetails(driverId));
        dispatch(getDriverRaceResults(driverId));
    }, [dispatch, driverId]);

    const renderRaceResultItem = ({ item }: { item: Race }) => {
        const driverResult: Result | undefined = item.Results?.[0];

        return (
            <View style={styles.resultCard}>
                <Text style={styles.resultRaceName}>{item.raceName} ({item.season})</Text>
                <Text>Circuit: {item.Circuit.circuitName}</Text>
                {driverResult ? (
                    <>
                        <Text>Position: {driverResult.position}</Text>
                        <Text>Points: {driverResult.points}</Text>
                        <Text>Grid: {driverResult.grid}</Text>
                        <Text>Status: {driverResult.status}</Text>
                    </>
                ) : (
                    <Text>No result details available for this race.</Text>
                )}
            </View>
        );
    };

    if (driverLoading && !currentDriver) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading Driver Details...</Text>
            </View>
        );
    }

    if (driverError) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error: {driverError}</Text>
            </View>
        );
    }

    if (!currentDriver) {
        return (
            <View style={styles.centered}>
                <Text style={styles.noDataText}>Driver not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.driverDetailsContainer}>
                <Text style={styles.detailHeader}>Driver Information:</Text>
                <Text style={styles.detailText}>Name: {currentDriver.givenName} {currentDriver.familyName}</Text>
                <Text style={styles.detailText}>Nationality: {currentDriver.nationality}</Text>
                <Text style={styles.detailText}>Date of Birth: {currentDriver.dateOfBirth}</Text>
                {currentDriver.permanentNumber && (
                    <Text style={styles.detailText}>Permanent Number: {currentDriver.permanentNumber}</Text>
                )}
                <Text style={styles.detailText}>
                    Wikipedia: <Text style={styles.wikiLink} onPress={() => Linking.openURL(currentDriver.url)}>{currentDriver.url}</Text>
                </Text>
            </View>

            <Text style={styles.sectionHeader}>Race Results:</Text>
            {resultsLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text>Loading Race Results...</Text>
                </View>
            ) : resultsError ? (
                <View style={styles.centered}>
                    <Text style={styles.errorText}>Error loading race results: {resultsError}</Text>
                </View>
            ) : raceResults.length > 0 ? (
                <FlatList
                    data={raceResults}
                    keyExtractor={(item) => `${item.season}-${item.round}`}
                    renderItem={renderRaceResultItem}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <Text style={styles.noDataText}>No race results found for this driver.</Text>
            )}
        </View>
    );
};

export default DriverDetailsScreen;
