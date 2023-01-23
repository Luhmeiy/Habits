import dayjs from 'dayjs';

const generateRestOfDates = () => {
	const lastDayOfTheYear = dayjs().endOf('year');
	const today = new Date();

	const dates = [];
	let compareDate = lastDayOfTheYear;

	while (compareDate.isAfter(today)) {
		dates.push(compareDate.toDate());
		compareDate = compareDate.subtract(1, 'day');
	}

	return dates.slice(0, -1).reverse();
}

export default generateRestOfDates;