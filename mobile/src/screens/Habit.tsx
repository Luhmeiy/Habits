// components
import BackButton from '../components/BackButton';
import Checkbox from '../components/Checkbox';
import ProgressBar from '../components/ProgressBar';

// libraries
import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';

// React Native
import { ScrollView, Text, View } from "react-native";

interface Params {
	date: string
}

const Habit = () => {
	const route = useRoute();
	const { date } = route.params as Params;

	const parsedDate = dayjs();
	const dayOfWeek = parsedDate.format('dddd');
	const dayAndMonth = parsedDate.format('DD/MM');

	return (
		<View className="flex-1 bg-background px-8 pt-16">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 50 }}
			>
				<BackButton />

				<Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
					{dayOfWeek}
				</Text>

				<Text className="text-white font-extrabold text-3xl">
					{dayAndMonth}
				</Text>

				<ProgressBar progress={50} />

				<View className="mt-6">
					<Checkbox
						title="Beber 2L de água"
						checked={false}
					/>

					<Checkbox
						title="Caminhar"
						checked={true}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

export default Habit;