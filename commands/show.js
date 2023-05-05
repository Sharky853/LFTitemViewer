const {
    SlashCommandBuilder
} = require('discord.js');
const {
    ActionRowBuilder,
    Events,
    StringSelectMenuBuilder,
    EmbedBuilder,
    AttachmentBuilder
} = require('discord.js');
const fs = require('fs');

const Canvas = require('@napi-rs/canvas');

const funnyFunction = require("../functions/showcommand.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('show the database info of a item'),
    async execute(interaction, bot) {

        let data = { values: [
            {position: 0, value: 0}, //item id
            {position: 1, value: 0}, //item class
            {position: 2, value: 0}  //page
        ]};
        
        await funnyFunction.process(interaction, data, bot);
    },
}