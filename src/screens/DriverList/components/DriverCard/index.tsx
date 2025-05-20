import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Driver } from '../../../../types/ergast';
import { styles } from './styles';

interface DriverCardProps {
    driver: Driver;
    onPress: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onPress }) => (
    <TouchableOpacity style={styles.driverCard} onPress={onPress}>
        <Text style={styles.driverName}>{`${driver.givenName} ${driver.familyName}`}</Text>
        <Text>Nationality: {driver.nationality}</Text>
        <Text>DOB: {driver.dateOfBirth}</Text>
        {driver.permanentNumber && (
            <Text>Permanent Number: {driver.permanentNumber}</Text>
        )}
    </TouchableOpacity>
);

export default DriverCard;
