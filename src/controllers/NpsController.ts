import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


/**
 * 12345678910
 * Detratores = 0- 6
 * Passivos = 7-8
 * Promotres 9-10
 * 
 * Calculo do nps
 * (numero de promotores -(menos) nuemro de detratores) / (numero de respondentes) X 100
 */
class NpsController {
    async execute(request: Request, response: Response) {

        const { survey_id } = request.params

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id
        })

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6

        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswres = surveysUsers.length;

        const calculate = (promoters - detractor) / totalAnswres;

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswres,
            nps: calculate,

        })

    }
}


export { NpsController }