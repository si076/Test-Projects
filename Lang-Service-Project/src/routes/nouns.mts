// import { Router} from 'express';
import express from 'express'
import {getNouns, saveNouns} from '../controllers/nouns_ctrl.mjs'


const router = express.Router();

router.get('/', getNouns);

router.post('/', saveNouns);

export default router;