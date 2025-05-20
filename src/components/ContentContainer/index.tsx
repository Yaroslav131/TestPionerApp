import { Platform, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { styles } from './styles';

import type { ContentContainerProps } from './types';

export const ContentContainer = ({ children }: ContentContainerProps) => {
	return Platform.OS === 'android' ? (
		<SafeAreaProvider>
			<SafeAreaView />
			{children}
		</SafeAreaProvider>
	) : (
		<>
			<SafeAreaView style={styles.backSafeAreaStyle}></SafeAreaView>
			<SafeAreaView style={styles.mainSafeAreaStyle}>{children}</SafeAreaView>
		</>
	);
};
