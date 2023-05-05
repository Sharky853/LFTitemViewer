const Discord = require("discord.js")
const { SlashCommandBuilder } = require('discord.js');
const {  Events, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, bot) {
		console.log(`command ping was asked`);
		await interaction.reply({
			content: `react here ! `,
			fetchreply: true,
			ephemeral: true,
			components: [new ActionRowBuilder().addComponents(
				new Discord.StringSelectMenuBuilder()
				.setCustomId('myFakeIdThatDoesntExist')
				.setPlaceholder(`Add a perk`)
				.addOptions([{ label: "bruh", description: "hi", value: "0"}]),
			)]

		}).then((inter) => {
			console.log(inter)
			console.log(bot)
			console.log(interaction)
			message.react('🍎')
		});
		

	},
};