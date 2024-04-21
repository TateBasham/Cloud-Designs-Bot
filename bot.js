require("dotenv").config();
const { betaToken, mainToken } = process.env;
const { Client, Collection, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });

// Set up Command handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Set up Event handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
}

// Log in to Discord
client.login(mainToken)
    .then(() => {
        console.log('Bot logged in successfully!');
    })
    .catch(error => {
        console.error('Bot login failed:', error);
    });
