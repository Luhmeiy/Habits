// React Native
import { TouchableOpacity, Dimensions } from 'react-native';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

const DAY_MARGIN_BETWEEN = 8;
const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

const HabitDay = () => {
	return (
		<TouchableOpacity
			className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
			style={{ width: DAY_SIZE, height: DAY_SIZE }}
			activeOpacity={.7}
		/>
	)
}

export { HabitDay, DAY_MARGIN_BETWEEN, DAY_SIZE };