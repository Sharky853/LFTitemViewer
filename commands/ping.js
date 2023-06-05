const Discord = require("discord.js")
const {
	SlashCommandBuilder
} = require('discord.js');
const {
	ActionRowBuilder,
	Events,
	AttachmentBuilder,
	ModalBuilder,
} = require('discord.js');
const fs = require('fs');
const Canvas = require('@napi-rs/canvas');
const {
	basename
} = require('path');
const {
	error
} = require('console');
const {
	basestatspath
} = require('../config');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, bot) {
		console.log(`command ping was asked`);







		const canvas = Canvas.createCanvas(1200, 600);
		const context = canvas.getContext('2d');
		try {
			// load the weapon image.
			const weaponImage = await Canvas.loadImage(`./Images/Items/1.png`);
			// load the weapon rarity image
			const rarityImage = await Canvas.loadImage(`./Images/Rarity/Epic.png`);
			//set a color for background 
			context.fillStyle = '#484559';
			//draw background and images
			context.fillRect(0, 0, 1200, 600);
			context.drawImage(rarityImage, 15, 15, 150, 150);
			context.drawImage(weaponImage, 25, 25, 130, 130);
			//make the text for weapon presentation 
			context.fillStyle = '#d910e0';
			context.font = "35px Arial";
			//change the rarity depending of what the player have chosen
			context.fillText("EPIC", 190, 50);
			context.fillStyle = '#b1e7fc'
			//change the name of the weapon and aply the correct distance via hard code element 
			context.fillText(" \u00B7 Gatline Gun", 280, 50);
			context.lineWidth = 5;
			context.strokeStyle = '#7c8799'
			
            
			//circle
			context.beginPath();
			context.arc(70, 260, 60, 0, 2 * Math.PI);
			context.stroke();
            context.beginPath();
			context.arc(200, 260, 60, 0, 2 * Math.PI);
			context.stroke();
            context.beginPath();
			context.arc(330, 260, 60, 0, 2 * Math.PI);
			context.stroke();
            context.beginPath();
			context.arc(460, 260, 60, 0, 2 * Math.PI);
			context.stroke();
            

			//vertical line
            context.moveTo(530, 190);
			context.lineTo(530, 600);
            context.moveTo(800, 0);
			context.lineTo(800, 600);
            context.moveTo(1000, 190);
			context.lineTo(1000, 600);
			//horizontal middle line
			context.moveTo(0, 395);
			context.lineTo(530, 395);
			context.stroke();
			context.moveTo(800, 395);
			context.lineTo(1200, 395);
			context.stroke();
            context.moveTo(0, 190);
			context.lineTo(1200, 190);
			context.stroke();

            
            
            
            
            
            
            
            // description , change letters to suite correctly 
			context.font = "20px Arial";
			var txt = 'A rapid fire cannon shooting multiple projectiles in fast succession\nthis is just to test the line skip , for fun ';
			var x = 190;
			var y = 90;
			var lineheight = 20;
			var lines = txt.split('\n');

			for (var i = 0; i < lines.length; i++)
				context.fillText(lines[i], x, y + (i * lineheight));







			


			// description , change letters to suite correctly 
			context.font = "20px Arial";
			var txt = 'A rapid fire cannon shooting multiple projectiles in fast succession\nthis is just to test the line skip , for fun ';
			var x = 190;
			var y = 90;
			var lineheight = 20;
			var lines = txt.split('\n');

			for (var i = 0; i < lines.length; i++)
				context.fillText(lines[i], x, y + (i * lineheight));




		} catch (e) {
			// load the weapon rarity image
			const rarityImage = await Canvas.loadImage(`./Images/Error/Jingle.png`);
			context.drawImage(rarityImage, 0, 0, 200, 200);
			// Draw them.
		}

		let attachementname = 'weaponImage.png'
		// Use the helpful Attachment class structure to process the file for you
		const attachment = new AttachmentBuilder(await canvas.encode('png'), {
			name: attachementname
		});

		await interaction.reply({
			files: [attachment],
			components: [],
			ephemeral: true,

		})
	},
};