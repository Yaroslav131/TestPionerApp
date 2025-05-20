import React from 'react';
import { View, Text, Linking } from 'react-native';
import { styles } from './styles';
import { Driver } from '@types/ergast';

interface DriverInfoCardProps {
    driver: Driver;
}

const DriverInfoCard: React.FC<DriverInfoCardProps> = ({ driver }) => {
    return (
        <View style={styles.driverDetailsContainer}>
            <Text style={styles.detailHeader}>Driver Information:</Text>
            <Text style={styles.detailText}>Name: {driver.givenName} {driver.familyName}</Text>
            <Text style={styles.detailText}>Nationality: {driver.nationality}</Text>
            <Text style={styles.detailText}>Date of Birth: {driver.dateOfBirth}</Text>
            {driver.permanentNumber && (
                <Text style={styles.detailText}>Permanent Number: {driver.permanentNumber}</Text>
            )}
            <Text style={styles.detailText}>
                Wikipedia:{' '}
                <Text style={styles.wikiLink} onPress={() => Linking.openURL(driver.url)}>
                    {driver.url}
                </Text>
            </Text>
        </View>
    );
};

export default DriverInfoCard;
