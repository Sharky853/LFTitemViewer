const Discord = require("discord.js")
const {
    SlashCommandBuilder
} = require('discord.js');
const funnyFunction = require("../functions/additem.js")
const {
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,

} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "additem",
    process
}



async function process(interaction, data, bot) {
    return new Promise(async (resolve, reject) => {
        console.clear()
        console.log(data.values)

       
        // declare feilds array
        


        let classfields = [];
        let rows = [];
        
        
        
        /*footerdatadat should look like this : 
        
        {item id},{item rarity},{item class},{item lvl},{item training},{item perk 1},{item perk 2},{item perk 3},{item perk 4},{page}
            0           1             2          3           4               5             6             7               8         9
        
        */
        
        for (let c = 0; c < classes.length; c++) {
            let item = classes[c]
            classfields.push(item.field);
        }
        
        
        
        
        
        
        const fieldsC = classfields
        
        //#region Create the embed, build the rows, select action row
        rows.push(new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('add.class.select')
                .setPlaceholder(`Choose a class`)
                .addOptions(fieldsC),
            ));

            rows.push(new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('add.return.name')
                .setLabel(`I made a mistake`)
                .setStyle(ButtonStyle.Danger),
            ));
        

        let embed = new EmbedBuilder()
            .setColor("ffaa00")
            .setTitle("Almost done !")
            .setDescription(`the data you have given for now are as follow :\nname : ${data.values[0].value}\ndescription : ${data.values[1].value}\nsmall description : ${data.values[2].value}\n\nChoose what class this item from`)


            try {
                await interaction.update({
                    embeds: [embed],
                    components: rows,
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                });
            } catch (e) {
                await interaction.reply({
                    embeds: [embed],
                    components: rows,
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                })
            }
        //Hello tense moon   :) 

    })
}


