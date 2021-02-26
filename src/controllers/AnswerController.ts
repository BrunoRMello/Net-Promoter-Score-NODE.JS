import { Response, Request, json } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";



class AnswerController {

    //http://localhost:3333/answers/1?u=3da9f795-5ab2-43fb-a408-4b380f006665
    /**
     * Route params =. patametros que compoes as rotas
     * routes.get("/ansewers/:value")
     * Query Params => busca, paginagao, nao obrigatoria sempre vem depois do ?
     * chave = valor
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surversUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surversUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey User does not exists!"
            });
        }

        surveyUser.value = Number(value);

        await surversUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}


export { AnswerController };