import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UsersController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

const sendMailController = new SendMailController();

const ansewersController = new AnswerController();

const npsController = new NpsController();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", ansewersController.execute);

router.get("/nps/:survey_id", npsController.exectue);

export { router };
