import express from 'express';
import {getNouns} from '../controllers/nouns_ctrl.mjs'


const router = express.Router();

router.get('/', getNouns)

export default router;