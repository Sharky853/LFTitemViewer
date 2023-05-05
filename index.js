// Require the necessary discord.js classes
const fs = require('node:fs');
const discord = require('discord.js')
const path = require('node:path');
const {
	Client,
	Collection,
	Events,
	GatewayIntentBits,
	Message,
	AttachmentBuilder,
	ModalBuilder 
} = require('discord.js');
const config = require('./config');
// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds ,  GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions]
});
client.commands = new Collection();
client.selectmenus = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
let databases = []
let bot = {
	client,
	config,
	databases
};
console.log("loading database : items")
let items = JSON.parse(fs.readFileSync(bot.config.weaponspath));
console.log("database loaded succesfully : items")
console.log("loading database : rarities")
let rarities = JSON.parse(fs.readFileSync(bot.config.raritypath));
console.log("database loaded succesfully : rarities")
console.log("loading database : classes")
let classes = JSON.parse(fs.readFileSync(bot.config.classpath));
console.log("database loaded succesfully : classes")
console.log("loading database : trainings")
let trainings = JSON.parse(fs.readFileSync(bot.config.trainingpath));
console.log("database loaded succesfully : trainings")
console.log("loading database : template")
let basestatsdata = JSON.parse(fs.readFileSync(bot.config.basestatspath));
console.log("database loaded succesfully : template")
console.log("loading database : tiers")
let tierstatsdata = JSON.parse(fs.readFileSync(bot.config.tierstatspath));
console.log("database loaded succesfully : tiers")
console.log("loading database : perks")
let perks = JSON.parse(fs.readFileSync(bot.config.perkpath));
console.log("database loaded succesfully : perks")
bot.databases = {items , rarities , classes , trainings , basestatsdata , tierstatsdata , perks};
global.bot = bot;
client.loadCmds = (bot, client, reload) => require(path.join(__dirname, 'loaders/commands.js'))(bot, client, reload);
client.loadCmds(bot, client, false);
client.loadSelectMenus = (bot, client, reload) => require(path.join(__dirname, 'loaders/selectmenus.js'))(bot, client, reload);
client.loadSelectMenus(bot, client, false);
client.loadButtons = (bot, client, reload) => require(path.join(__dirname, 'loaders/buttons.js'))(bot, client, reload);
client.loadButtons(bot, client, false);
client.loadModals = (bot, client, reload) => require(path.join(__dirname, 'loaders/modals.js'))(bot, client, reload);
client.loadModals(bot, client, false);
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	console.error("//////////\nbot successfully loaded, clearing logs\n//////////")
	setTimeout(() => {  console.clear() }, 10000);
});
async function execute(interactionThing, interaction, interType, interName, bot) {
	if (!interactionThing)  {
		console.error(`No ${interType} matching ${interName} was found.`);
		return;
	}
	try {
		await interactionThing.execute(interaction, bot);
	} catch (error) {
		console.error(error);
		let errorMsg = `There was an error while executing this ${interType}!`;
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: errorMsg,
				ephemeral: true
			});
		} else {
			await interaction.reply({
				content: errorMsg,
				ephemeral: true
			});
		}
	}
}
client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {	
		const command = interaction.client.commands.get(interaction.commandName);
		execute(command, interaction, "command", interaction.commandName, bot)
	}
	if (interaction.isStringSelectMenu()) {
		const menu = interaction.client.selectmenus.find(selectmenu => selectmenu.id == interaction.customId);
		execute(menu, interaction, "menu", interaction.customId, bot);
	}
	if (interaction.isButton()) {
		interactionButtonData =  interaction.customId.split(':')
		const button = interaction.client.buttons.find(button => button.id == interactionButtonData[0]);
		console.log(interactionButtonData[0])
		execute(button, interaction, "button", interaction.customId, bot);
	}
	if (interaction.isModalSubmit()) {
		const modal = interaction.client.modals.find(modal => modal.id == interaction.customId);
		execute(modal, interaction, "modal", interaction.customId, bot);
	}
});
// Log in to Discord with your client's token
client.login(config.token);