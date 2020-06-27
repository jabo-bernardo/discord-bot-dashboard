import { Router } from 'express';
import { discord_redirect_uri } from '../config.json';
const router = new Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        page: {
            
        },
        discordRedirectUri: discord_redirect_uri
    });
});

export default router;