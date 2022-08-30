import { Request, Response } from "express"
import { UserService } from "../services/UserService"

class UserController {

    async add(request: Request, response: Response) {
        const { name, birth, phone } = request.body;
        const service = new UserService()

        try {
            const result = await service.add({ name, birth, phone })

            return response.status(200).json({
                code: 200,
                message: 'user.add',
                data: result
            })
        } catch (err) {
            return response.status(400).json({
                code: 400,
                error: err
            })
        }
    }

    async get(request: Request, response: Response) {
        const { user_id } = request;
        const service = new UserService()

        try {
            const result = await service.get(user_id)

            return response.status(200).json({
                code: 200,
                message: 'user.found',
                data: result
            })
        } catch (err) {
            return response.status(400).json({
                code: 400,
                error: err
            })
        }
    }

    async delete(request: Request, response: Response) {
        const { user_id } = request;
        const service = new UserService()

        try {
            await service.delete(user_id)

            return response.status(200).json({
                code: 200,
                message: 'user.deleted',
                data: {},
            })
        } catch (err) {
            return response.status(400).json({
                code: 400,
                error: err
            })
        }
    }


}

export { UserController }