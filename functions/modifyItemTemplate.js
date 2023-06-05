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
    name: "modifyItemTemplate",
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
                footerDataData[dataset.position] = dataset.value + "";
            });
            let rows = []
            let id = footerDataData[0]
            let item
            for (let I = 0; I < bot.databases.items.length; I++) {
                if (bot.databases.items[I].id == id) item = bot.databases.items[I]
            }
            let bases = JSON.parse(fs.readFileSync(bot.config.basestatspath));
            let base = null

            for (let I = 0; I < bases.length; I++) {
                if (bases[I].id == id) {
                    base = bases[I]
                }
            }
            let textINembed = ""
            if (base == null) {
                textINembed = "no Template for this weapon : set it up\nJust add a value, the template will automaticly be created"
            } else {
                for (let b = 0; b < base.stats.length; b++) {
                    if (b == footerDataData[3]) {
                        textINembed += "->`"
                    }
                    if (b == 0) {
                        textINembed += `${base.stats[b].cat} : use level stats`
                    } else {
                        textINembed += `${base.stats[b].cat} : ${base.stats[b].base}`
                    }
                    if (b == footerDataData[3]) {
                        textINembed += "`<-"
                    }
                    textINembed += "\n"
                }
            }
            let acceptenable = false
            if(base == null){
                acceptenable = true
            }

            let enableup = true
            let enabledown  = true

            if(!acceptenable){
                enableup = footerDataData[3] == 0
                enabledown = footerDataData[3] == base.stats.length - 1
            }
           
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Template.GoUp')
                    .setLabel(`go up`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(enableup|| acceptenable)
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Template.GoDown')
                    .setLabel(`go down`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled( enabledown || acceptenable)
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Template.Edit.Database')
                    .setLabel(`modify`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(acceptenable)
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Template.Add.Database')
                    .setLabel(`add a value at the end`)
                    .setStyle(ButtonStyle.Primary),
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Template.Validation')
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
                    value: textINembed
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