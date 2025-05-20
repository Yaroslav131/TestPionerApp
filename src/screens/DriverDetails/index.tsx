
import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { RootState } from '@store/rootReducer';
import { getDriverDetails } from '@store/drivers/driversActions';
import { getDriverRaceResults } from '@store/raceResults/raceResultsActions';
import { RootStackParamList } from '@navigation/AppNavigator';
import { styles } from './styles';
import DriverInfoCard from './components/DriverInfoCard';
import RaceResultCard from './components/RaceResultCard';
import LoadingAndErrorState from './components/LoadingAndErrorState';

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

    const driverState = LoadingAndErrorState({
        loading: driverLoading && !currentDriver,
        error: driverError,
        loadingMessage: 'Loading Driver Details...',
        errorMessage: 'Error loading driver details',
        noDataMessage: 'Driver not found.',
        hasData: !!currentDriver,
    });

    if (driverState) {
        return driverState;
    }

    return (
        <View style={styles.container}>
            {currentDriver && <DriverInfoCard driver={currentDriver} />}
            <Text style={styles.sectionHeader}>Race Results:</Text>
            <LoadingAndErrorState
                loading={resultsLoading}
                error={resultsError}
                loadingMessage="Loading Race Results..."
                errorMessage="Error loading race results"
            />

            {!resultsLoading && !resultsError && (
                raceResults.length > 0 ? (
                    <FlatList
                        data={raceResults}
                        keyExtractor={(item) => `${item.season}-${item.round}`}
                        renderItem={({ item }) => <RaceResultCard item={item} />}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <Text style={styles.noDataText}>No race results found for this driver.</Text>
                )
            )}
        </View>
    );
};

export default DriverDetailsScreen;
