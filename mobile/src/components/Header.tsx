// icons / logo
import { Feather } from '@expo/vector-icons';
import Logo from '../assets/logo.svg';

// libraries
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';

// React Native
import { View, Text, TouchableOpacity } from 'react-native';

const Header = () => {
	const { navigate } = useNavigation();

	return (
		<View className="w-full flex-row items-center justify-between">
			<Logo />

			<TouchableOpacity
				activeOpacity={.7}
				className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
				onPress={() => navigate('new')}
			>
				<Feather
					name="plus"
					color={colors.violet[500]}
					size={22.5}
				/>

				<Text className="text-white ml-3 font-semibold text-base">
					Novo
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Header;