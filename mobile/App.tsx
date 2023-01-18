// libraries
import './src/lib/dayjs';

// components
import Home from './src/screens/Home';
import Loading from './src/components/Loading';

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
			<Home />
			<StatusBar barStyle="light-content" backgroundColor="transparent"  translucent />
		</>
	);
}

export default App;