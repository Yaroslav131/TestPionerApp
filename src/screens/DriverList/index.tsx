import React, { useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getDrivers } from '../../redux/drivers/driversActions';
import { StackScreenProps } from '@react-navigation/stack';
import { Driver } from '../../types/ergast';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';

type DriverListScreenProps = StackScreenProps<RootStackParamList, 'DriverList'>;

const DriverListScreen: React.FC<DriverListScreenProps> = ({ navigation }) => {
    const dispatch: any = useDispatch();
    const { drivers, loading, error, currentPage, totalDrivers, driversPerPage } = useSelector(
        (state: RootState) => state.drivers
    );

    const totalPages = Math.ceil(totalDrivers / driversPerPage);

    useEffect(() => {
        console.log('Fetching drivers...');
        dispatch(getDrivers(currentPage, driversPerPage));
    }, [dispatch, currentPage, driversPerPage]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
            dispatch(getDrivers(currentPage + 1, driversPerPage));
        }
    }, [dispatch, currentPage, totalPages, driversPerPage]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 0) {
            dispatch(getDrivers(currentPage - 1, driversPerPage));
        }
    }, [dispatch, currentPage, driversPerPage]);

    const renderDriverItem = ({ item }: { item: Driver }) => (
        <TouchableOpacity
            style={styles.driverCard}
            onPress={() =>
                navigation.navigate('DriverDetails', {
                    driverId: item.driverId,
                    driverName: `${item.givenName} ${item.familyName}`,
                })
            }
        >
            <Text style={styles.driverName}>{`${item.givenName} ${item.familyName}`}</Text>
            <Text>Nationality: {item.nationality}</Text>
            <Text>DOB: {item.dateOfBirth}</Text>
            {item.permanentNumber && (
                <Text>Permanent Number: {item.permanentNumber}</Text>
            )}
        </TouchableOpacity>
    );

    if (loading && drivers.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading Drivers...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => dispatch(getDrivers(currentPage, driversPerPage))}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={drivers}
                keyExtractor={(item) => item.driverId}
                renderItem={renderDriverItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.noDataText}>No drivers found.</Text>}
            />
            <View style={styles.paginationControls}>
                <TouchableOpacity
                    style={[styles.paginationButton, currentPage === 0 || loading ? styles.paginationButtonDisabled : null]}
                    onPress={handlePrevPage}
                    disabled={currentPage === 0 || loading}
                >
                    <Text style={styles.paginationButtonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageInfo}>
                    Page {currentPage + 1} of {totalPages}
                </Text>
                <TouchableOpacity
                    style={[styles.paginationButton, currentPage >= totalPages - 1 || loading ? styles.paginationButtonDisabled : null]}
                    onPress={handleNextPage}
                    disabled={currentPage >= totalPages - 1 || loading}
                >
                    <Text style={styles.paginationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DriverListScreen;