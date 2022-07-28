// import { Router} from 'express';
import e from 'express'
import {getNouns, saveNouns} from '../controllers/nouns_ctrl.mjs'


const nounsRouter = e.Router();

nounsRouter.get('/', getNouns);

nounsRouter.post('/', saveNouns);

export {nounsRouter};