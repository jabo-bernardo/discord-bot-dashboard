import { Router } from 'express';
import request from 'async-request';
import { getGuildsBySession, connectedToDiscord } from './api';

const router = new Router();

router.get("/", connectedToDiscord, async (req, res) => {
    const guilds = await getGuildsBySession(req.session);
    res.render("pages/dashboard", {
        page: {
            title: "Dashboard"
        },
        guildList: guilds
    });
})

export default router;