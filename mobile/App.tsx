// libraries
import './src/lib/dayjs';

// components
import Loading from './src/components/Loading';
import Routes from './src/routes';

// fonts
import { 
	useFonts,
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold
} from '@expo-google-fonts/inter';

// React Native
import { StatusBar } from 'react-native';

const App = () => {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold
	});

	if(!fontsLoaded) {
		return <Loading />;
	}

	return (
		<>
			<Routes />
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
		</>
	);
}

export default App;