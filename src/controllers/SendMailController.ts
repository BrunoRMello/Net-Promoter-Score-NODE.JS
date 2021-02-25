import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysReposity } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;


        const usersRepository = getCustomRepository(UsersRepository);
        const surveysResponse = getCustomRepository(SurveysReposity);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlredyExists = await usersRepository.findOne({ email });

        if (!userAlredyExists) {
            return response.status(400).json({
                error: "Users does not exists",
            });
        }

        const surveyAlreadyExists = await surveysResponse.findOne({ id: survey_id });
        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "survey does not exists!"
            })
        }


        //salvar as informações na tabela surveyuser
        const surveyUser = surveysUsersRepository.create({
            User_id: userAlredyExists.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser);
        //enviar email para usuario

        return response.json(surveyUser);

    }
}

export { SendMailController }