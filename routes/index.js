import { Router } from 'express';
const router = new Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        page: {
            
        }
    });
});

export default router;