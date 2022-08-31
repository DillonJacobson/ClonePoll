import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '@prisma/client'
import { PollSchema, UserSchema } from '../../../../schemas/user';
import { prisma } from '../../../../db'



type ResponseBody = {
	data: any[]
	status: string
	statusCode: number
	statusMessage: string
	errorData?: any
};

const userSchema = new UserSchema()
const pollSchema = new PollSchema()

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseBody>
){
	let uuid = req.query.uuid as string;

	if (!uuid || uuid === undefined)
		return res.status(400).json({data:[], status:"ERROR", statusCode:400, statusMessage:"UUID not provided"});

	if (req.method === "GET"){
		await prisma.user.findUnique({
			where: {
				uuid: uuid
			},
			select: userSchema.selectFields({include:['username', 'polls']}, [{name:'polls', filters:pollSchema.selectFields({include:['title']})}])
		}).then((data) => {
			return res.status(200).json({data:[data], status:"OK", statusCode:200, statusMessage:"Request complete"})
		}).catch((err) => {
			console.log(err)
			return res.status(500).json({data:[], status:"ERROR", statusCode:500, statusMessage:"An Error has occured", errorData: err})
		})
		
	}
};
