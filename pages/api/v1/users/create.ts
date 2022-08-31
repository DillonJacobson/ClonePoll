// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import slugify from 'slugify'

import { Prisma, PrismaClient, User } from '@prisma/client'

import { generatePasswordHash } from '../../../../utils/helpers';
import { UserSchema } from '../../../../schemas/user';

type ResponseBody = {
  data: object[]
  status: string
  statusCode: number
  statusMessage: string
}

const prisma = new PrismaClient();

const userSchema = new UserSchema();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  let resBody: ResponseBody  = {data: [], status: 'OK', statusCode: 200 , statusMessage:"Success"}

  if (req.method === "POST"){
    let {email, password, username} = req.body
    console.log(req.body)
    await prisma.user.create({
      data:{
        email,
        passwordHash: await generatePasswordHash(password),
        username,
        slug: slugify(username)
      },
      select: userSchema.selectFields({exclude:['passwordHash']})
    }).then((data) => {
      resBody.data = [data]
      resBody.statusMessage = "User data processed"
    }).catch((e) => {
      if (e.code === 'P2002'){
        resBody.data = [e.meta.target[0]]
        resBody.status = 'ERROR'
        resBody.statusCode = 400
        resBody.statusMessage = "Data failed to validate."
      }
    })
  } else {
    resBody.status = 'ERROR'
    resBody.statusCode = 405
    resBody.statusMessage = "Method not allowed"
  }
  return res.status(resBody.statusCode).json(resBody)
}
