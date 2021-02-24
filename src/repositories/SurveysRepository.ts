

import {  EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";


@EntityRepository(Survey)
class SurveysReposity extends Repository <Survey> {};


export { SurveysReposity };