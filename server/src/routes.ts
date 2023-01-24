import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
	app.post('/habits', async (req) => {
		const createHabitBody = z.object({
			title: z.string(),
			weekDays: z.array(
				z.number().min(0).max(6)
			),
			userId: z.any()
		});

		const { title, weekDays, userId } = createHabitBody.parse(req.body);

		const today = dayjs().startOf('day').toDate();

		await prisma.habit.create({
			data: {
				title,
				created_at: today,
				user_id: userId.userId,
				weekDays: {
					create: weekDays.map(weekDay => {
						return {
							week_day: weekDay
						}
					})
				}
			}
		})
	});

	app.post('/user', async (req) => {
		const createUserBody = z.object({
			id: z.any(),
			name: z.string(),
			nickname: z.string()
		});

		const { id, name, nickname } = createUserBody.parse(req.body);

		await prisma.user.create({
			data: {
				id,
				name,
				nickname
			}
		})
	})

	app.get('/user', async (req) => {
		const getUserParams = z.object({
			nickName: z.any()
		});

		const { nickName } = getUserParams.parse(req.query);

		const userData = await prisma.user.findMany({
			where: {
				nickname: nickName
			}
		});

		return userData;
	});

	app.get('/user_id', async (req) => {
		const getUserParams = z.object({
			userId: z.any()
		});

		const { userId } = getUserParams.parse(req.query);

		const userData = await prisma.user.findMany({
			where: {
				id: userId
			}
		});

		return userData;
	});

	app.patch('/user', async (req) => {
		const userParams = z.object({
			name: z.string(),
			nickname: z.string(),
			userId: z.any()
		});

		const { name, nickname, userId } = userParams.parse(req.body);

		await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				name,
				nickname
			},
		});
	});

	app.get('/day', async (req) => {
		const getDayParams = z.object({
			date: z.coerce.date(),
			userId: z.any()
		});

		const { date, userId } = getDayParams.parse(req.query);

		const parsedDate = dayjs(date).startOf('day');
		const weekDay = parsedDate.get('day');

		// All habits
		const possibleHabits = await prisma.habit.findMany({
			where: {
				created_at: {
					lte: date
				},
				user_id: userId,
				weekDays: {
					some: {
						week_day: weekDay
					}
				}
			}
		});

		// Completed habits
		const day = await prisma.day.findUnique({
			where: {
				date: parsedDate.toDate()
			},
			include: {
				dayHabits: true
			}
		});

		const completedHabits = day?.dayHabits.map(dayHabit => {
			return dayHabit.habit_id;
		}) ?? [];

		return {
			possibleHabits,
			completedHabits
		}
	});

	app.patch('/habits/:id/toggle', async (req) => {
		const toggleHabitParams = z.object({
			id: z.string().uuid()
		})

		const { id } = toggleHabitParams.parse(req.params);

		const today = dayjs().startOf('day').toDate();

		let day = await prisma.day.findUnique({
			where: {
				date: today
			}
		})

		if (!day) {
			day = await prisma.day.create({
				data: {
					date: today,
					user_id: 'rtmZ3H3KFFfWfJIvUCXYgjcjcZF2',
				}
			})
		}

		const dayHabit = await prisma.dayHabit.findUnique({
			where: {
				day_id_habit_id: {
					day_id: day.id,
					habit_id: id
				}
			}
		})

		if (dayHabit) {
			await prisma.dayHabit.delete({
				where: {
					id: dayHabit.id
				}
			})
		} else {
			await prisma.dayHabit.create({
				data: {
					day_id: day.id,
					habit_id: id
				}
			})
		}
	});

	app.get('/summary/:id', async (req) => {
		const summaryParams = z.object({
			id: z.any()
		})

		const { id } = summaryParams.parse(req.params);

		const summary = await prisma.$queryRaw`
			SELECT
				D.id,
				D.date,
				(
					SELECT
						cast(count(*) as float)
					FROM day_habits DH
					WHERE DH.day_id = D.id
				) as completed,
				(
					SELECT
						cast(count(*) as float)
					FROM habit_week_days HWD
					JOIN habits H
						ON H.id = HWD.habit_id
					WHERE
						HWD.week_day = cast(strftime('%w', D.date/1000, 'unixepoch') as int)
						AND H.created_at <= D.date
						AND H.user_id = ${id}
				) as amount
			FROM days D
			WHERE D.user_id = ${id}
		`

		return summary;
	});
}