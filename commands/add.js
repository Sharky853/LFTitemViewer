const Discord = require("discord.js")
const {
	SlashCommandBuilder
} = require('discord.js');
const funnyFunction = require("../functions/additem.js")
const {
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,ActionRowBuilder,
	EmbedBuilder,

} = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('add an element'),
	async execute(interaction, bot) {
		console.log(`add as been called`);

		let weapons = JSON.parse(fs.readFileSync(bot.config.weaponspath));

		
		var myJsonString = JSON.stringify(weapons);




		console.log(myJsonString)


		fs.writeFileSync(bot.config.test , myJsonString)

		const embed = new EmbedBuilder()
			.setColor(0xFFaa00)
			.setTitle("Add an item")
			.setDescription("Add item as been called, please select what item you want to add")
		const select = new StringSelectMenuBuilder()
			.setCustomId('add.select.type')
			.setPlaceholder('Choose what to add')
			.addOptions(
				new StringSelectMenuOptionBuilder()
				.setLabel('item')
				.setDescription('Add a item to the database')
				.setValue('0'),
				new StringSelectMenuOptionBuilder()
				.setLabel('training')
				.setDescription('Add a training tree to a item')
				.setValue('1'),
				new StringSelectMenuOptionBuilder()
				.setLabel('perk')
				.setDescription('Add a Perk to the database')
				.setValue('2'),
			);
			const row = new ActionRowBuilder()
			.addComponents(select);
		await interaction.reply({
			embeds: [embed],
			components: [row],
			ephemeral: true,
		})


	},
};