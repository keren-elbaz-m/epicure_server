import { Router } from "express";

const router = Router();

router.get('/health', (req, res)=>{
    res.send('server is up and running!');
});

export default router;