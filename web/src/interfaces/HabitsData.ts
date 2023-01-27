export interface IWeekDays {
	week_day: number;
}

export interface IHabitsData {
	id: string;
	title: string;
	weekDays: IWeekDays[];
}