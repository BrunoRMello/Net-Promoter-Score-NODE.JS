import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SurveysReposity } from "../repositories/SurveysRepository";


class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysReposity)

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey);
    }
    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysReposity)

        const all = await surveysRepository.find();

    }
}
export { SurveysController };