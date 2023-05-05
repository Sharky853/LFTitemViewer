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

const funnyFunction = require("../functions/processelement.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('weapon')
        .setDescription('send embed with weapon stats'),
    async execute(interaction, bot) {
        
    let data = { values: [
        {position: 0, value: 0}, //item id
        {position: 1, value: 0}, //item rarity
        {position: 2 ,value: 0}, //item class
        {position: 3 ,value: 1}, //item level
        {position: 4, value: 0}, //item training
        {position: 5, value: 0}, //item perk id 1
        {position: 6, value: 0}, //item perk id 2
        {position: 7 ,value: 0}, //item perk id 3
        {position: 8 ,value: 0}, //item perk id 4
        {position: 9, value: 0}  //page of embed
    ]};
        await funnyFunction.process(interaction, data, bot);
    },
}