import { Router } from "express";
import {ROUTES} from '../constants/routes.const';

const router = Router();

router.get(ROUTES.HEALTH, (req, res)=>{
    res.send('server is up and running!');
});

export default router;

