import { Router } from 'express';
import DiscordOauth2 from 'discord-oauth2';
import config from '../config.json';

const router = new Router();

/* Discord Authorization */
router.get("/authorize", (req, res) => {
    const code = req.query.code;
    if(code == null) {
        return res.redirect(config.discord_redirect_uri);
    }
    const auth = new DiscordOauth2();
    auth.tokenRequest({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        code: code,
        scope: "identify guilds",
        grantType: "authorization_code",
    }).then(respond => {
        req.session.discordAuth = respond;
        res.redirect("/dashboard");
    });
});

/* Retrieves the list of guild the user has access to invite the bot. */
/* API Functions */
export async function getGuildsBySession(session) {
    const auth = new DiscordOauth2();
    let guilds = await auth.getUserGuilds(session.discordAuth.access_token);
    return guilds.filter(v => v.permissions == 2147483647)
}

/* Middlewares */
export function connectedToDiscord(req, res, next) {
    if(req.session.discordAuth == null) {
        return res.redirect(config.discord_redirect_uri);
    }
    next()
}

export default { router };