import React, { useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { getDrivers } from '../../store/drivers/driversActions';
import { StackScreenProps } from '@react-navigation/stack';
import { Driver } from '../../types/ergast';
import { RootStackParamList } from '../../navigation/AppNavigator';
import DriverCard from './components/DriverCard';
import { styles } from './styles';
import PaginationControls from './components/PaginationControls';

type DriverListScreenProps = StackScreenProps<RootStackParamList, 'DriverList'>;

const DriverListScreen: React.FC<DriverListScreenProps> = ({ navigation }) => {
    const dispatch: any = useDispatch();
    const { drivers, loading, error, currentPage, totalDrivers, driversPerPage } = useSelector(
        (state: RootState) => state.drivers
    );

    const totalPages = Math.ceil(totalDrivers / driversPerPage);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        dispatch(getDrivers(currentPage, driversPerPage));
    }, [dispatch, currentPage, driversPerPage]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
            dispatch(getDrivers(currentPage + 1, driversPerPage));
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            }
        }
    }, [dispatch, currentPage, totalPages, driversPerPage]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 0) {
            dispatch(getDrivers(currentPage - 1, driversPerPage));
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            }
        }
    }, [dispatch, currentPage, driversPerPage]);

    const renderDriverItem = ({ item }: { item: Driver }) => (
        <DriverCard
            driver={item}
            onPress={() =>
                navigation.navigate('DriverDetails', {
                    driverId: item.driverId,
                    driverName: `${item.givenName} ${item.familyName}`,
                })
            }
        />
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
                ref={flatListRef}
                data={drivers}
                keyExtractor={(item) => item.driverId}
                renderItem={renderDriverItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.noDataText}>No drivers found.</Text>}
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                loading={loading}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
            />
        </View>
    );
};

export default DriverListScreen;
