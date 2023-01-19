// icons
import { Feather } from '@expo/vector-icons';

// libraries
import { useNavigation } from '@react-navigation/native';

// React Native
import { TouchableOpacity } from "react-native";
import colors from 'tailwindcss/colors';

const BackButton = () => {
	const { goBack } = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={.7}
			onPress={goBack}
		>
			<Feather
				name="arrow-left"
				size={32}
				color={colors.zinc[400]}
			/>
		</TouchableOpacity>
	)
}

export default BackButton;