import { Client } from 'discord.js';

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

setTimeout(() => {
    client.login(process.env.ABCDE);
}, 3000)