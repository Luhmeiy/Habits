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
			userId: z.string(),
			habitId: z.string().nullable()
		});

		const { title, weekDays, userId, habitId = null } = createHabitBody.parse(req.body);

		const today = dayjs().startOf('day').toDate();

		await prisma.habit.create({
			data: {
				title,
				created_at: today,
				user_id: userId,
				group_id: habitId,
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

	app.get('/habits', async (req) => {
		const getHabitsParams = z.object({
			userId: z.string()
		});

		const { userId } = getHabitsParams.parse(req.query);

		const today = dayjs().startOf('day').toDate();

		const habitsData = await prisma.habit.findMany({
			where: {
				user_id: userId,
				OR: [
					{ ended_at: { gte: today } },
					{ ended_at: null }
				],
			},
			include: {
				weekDays: true
			}
		});

		return habitsData;
	});

	app.get('/habits_id', async (req) => {
		const getHabitParams = z.object({
			id: z.any()
		});

		const { id } = getHabitParams.parse(req.query);

		const habitData = await prisma.habit.findMany({
			where: {
				id: id
			},
			include: {
				weekDays: true
			}
		});

		return habitData;
	});

	app.patch('/habit_delete', async (req) => {
		const habitParams = z.object({
			habitId: z.string()
		});

		const { habitId } = habitParams.parse(req.body);
		
		const yesterday = dayjs().startOf('day').add(-1, 'day').toDate();

		await prisma.habit.update({
			where: {
				id: habitId
			},
			data: {
				ended_at: yesterday
			}
		});
	});

	app.patch('/habit_rename', async (req) => {
		const habitParams = z.object({
			habitId: z.string(),
			title: z.string(),
			groupId: z.string().nullable()
		});

		const { habitId, title, groupId } = habitParams.parse(req.body);

		if (groupId) {
			console.log(groupId)
			await prisma.habit.updateMany({
				where: {
					OR: [
						{ id: habitId },
						{ id: groupId }
					]
				},
				data: {
					title
				}
			});
		} else {
			await prisma.habit.updateMany({
				where: {
					id: habitId
				},
				data: {
					title
				}
			});
		}
	})

	app.post('/user', async (req) => {
		const createUserBody = z.object({
			id: z.string(),
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
			userId: z.string()
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
			userId: z.string()
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
			userId: z.string()
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
				OR: [
					{ ended_at: { gte: date } },
					{ ended_at: null }
				],
				user_id: userId,
				weekDays: {
					some: {
						week_day: weekDay
					}
				}
			}
		});

		// Completed habits
		const day = await prisma.day.findFirst({
			where: {
				date: parsedDate.toDate()
			},
			select: {
				dayHabits: {
					where: {
						habit: {
							OR: [
								{ ended_at: { gte: date } },
								{ ended_at: null }
							],
							user_id: userId
						}
					},
					select: {
						habit_id: true,
					},
				}
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
					date: today
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
			id: z.string()
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
					JOIN habits H
						ON H.id = DH.habit_id
					WHERE 
						DH.day_id = D.id
						AND (H.ended_at >= D.date OR H.ended_at IS NULL)
						AND H.user_id = ${id}
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
						AND (H.ended_at >= D.date OR H.ended_at IS NULL)
						AND H.user_id = ${id}
				) as amount
			FROM days D
		`

		return summary;
	});
}