// icons
import { Feather } from '@expo/vector-icons';

// libraries
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

// React Native
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface Props extends TouchableOpacityProps {
	title: string;
	checked?: boolean;
}

const Checkbox = ({ checked = false, title, ...rest }: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={.7}
			className="flex-row mb-2 items-center"
			{...rest}
		>
			{
				checked
				?
					<Animated.View
						className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
						entering={ZoomIn}
						exiting={ZoomOut}
					>
						<Feather
							name="check"
							size={20}
							color={colors.white}
						/>
					</Animated.View>
				:
					<View className="h-8 w-8 bg-zinc-900 rounded-lg items-center justify-center" />
			}

			<Text className="text-white text-base font-semibold ml-3">
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export default Checkbox;