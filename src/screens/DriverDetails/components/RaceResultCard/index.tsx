
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Race, Result } from '../../../../types/ergast';

interface RaceResultCardProps {
    item: Race;
}

const RaceResultCard: React.FC<RaceResultCardProps> = ({ item }) => {
    const driverResult: Result | undefined = item.Results?.[0];

    return (
        <View style={styles.resultCard}>
            <Text style={styles.resultRaceName}>
                {item.raceName} ({item.season})
            </Text>
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

export default RaceResultCard;
