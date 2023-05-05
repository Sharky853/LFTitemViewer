const Discord = require("discord.js")
const {
    SlashCommandBuilder
} = require('discord.js');
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
    name: "modifyItemDescription",
    process
}



async function process(interaction, data, bot) {
    return new Promise(async (resolve, reject) => {
        try {

            let footerText;
            try {
                footerText = interaction.message.embeds[0].footer.text;
            } catch (e) {
                footerText = "data";
                data.values.forEach((dataset) => {
                    footerText += dataset.value + ":";
                });
                footerText = footerText.substring(0, footerText.length - 1);
            }

            let footerData = footerText.split("data");
            let footerDataData = footerData[1].split(":");

            // edit data
            data.values.forEach((dataset) => {
                footerDataData[dataset.position] = dataset.value;
            });

            let rows = []

            let id = data.values[0].value
            let items = JSON.parse(fs.readFileSync(bot.config.weaponspath));
            let item

            for (let I = 0; I < items.length; I++) {
                if (items[I].id == id) {
                    item = items[I]
                }
            }

            globalinfo = `item id : \`${item.id}\`\nitem name :\` ${item.nom}\`\nclass : \`${item.class}\`\ndescription : \`${item.description}\`\nlabel description : \`${item.field.description}\`\n`


            let fieldsC = []
            for (let c = 0; c < bot.databases.classes.length; c++) {
                let item = bot.databases.classes[c]
                fieldsC.push(item.field);
            }

            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Description.Name')
                    .setLabel(`Change item name`)
                    .setStyle(ButtonStyle.Primary),
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Description.Description')
                    .setLabel(`Change item description`)
                    .setStyle(ButtonStyle.Primary),
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Description.Label')
                    .setLabel(`Change item label description`)
                    .setStyle(ButtonStyle.Primary),
                ));

            rows.push(new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('modify.class.select')
                    .setPlaceholder(`Change item class`)
                    .addOptions(fieldsC),
                ));

            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Description.Validation')
                    .setLabel(`Set changes`)
                    .setStyle(ButtonStyle.Danger),
                ));

            footerData[1] = footerDataData.join(":");
            footerText = footerData.join("data");

            let embed = new EmbedBuilder()
                .setColor("ffaa00")
                .setTitle("Making change to " + item.nom)
                .addFields({
                    name: 'Item global information',
                    value: globalinfo
                })
                .setFooter({
                    text: footerText
                })


            try {
                await interaction.update({
                    embeds: [embed],
                    components: rows,
                    files: [],
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                });
            } catch (e) {
                await interaction.reply({
                    embeds: [embed],
                    components: [],
                    files: [],
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                })
            }

        } catch (e) {
            console.log(e)
        }
        //Hello tense moon   :) 

    })
}