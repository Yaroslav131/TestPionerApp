import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    loading: boolean;
    onPrev: () => void;
    onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, loading, onPrev, onNext }) => (
    <View style={styles.paginationControls}>
        <TouchableOpacity
            style={[styles.paginationButton, currentPage === 0 || loading ? styles.paginationButtonDisabled : null]}
            onPress={onPrev}
            disabled={currentPage === 0 || loading}
        >
            <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>Page {currentPage + 1} of {totalPages}</Text>
        <TouchableOpacity
            style={[styles.paginationButton, currentPage >= totalPages - 1 || loading ? styles.paginationButtonDisabled : null]}
            onPress={onNext}
            disabled={currentPage >= totalPages - 1 || loading}
        >
            <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
    </View>
);

export default PaginationControls;
