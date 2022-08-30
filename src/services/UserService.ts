import { prismaClient } from "../prisma"

interface IUser {
    name: string
    birth: string
    phone: string
}

class UserService {

    async get(user_id: string) {
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: user_id
                }
            })

            return user;
        } catch (err) {
            throw new Error('user.not_found')
        }
    }

    async add(data: IUser) {
        try {
            const user = await prismaClient.user.create({
                data: data
            })
            return user;
        } catch (err) {
            throw new Error(err.toString())
        }
    }

    async delete(user_id) {
        try {
            await prismaClient.delete(user_id)
            return true;
        } catch (err) {
            throw new Error(err.toString())
        }
    }

}

export { UserService, IUser }