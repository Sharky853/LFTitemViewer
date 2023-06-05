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
            let dataselected = -1
            if (footerDataData[4] == 0) { // in edit mode
                dataselected = footerDataData[3]
            }
            try {
                if (footerDataData[4] == 1) { // in adding mode
                    let makeElement = {
                        cat: `not defined`,
                        base: 0
                    }
                    base.stats.push(makeElement)
                    dataselected = base.stats.length - 1
                }
            } catch {}
            let textINembed = ""
            let textINdescription = "Choose type value from the list"
            if (base == null) {
                textINdescription = "Give the first template item"
                textINembed = "no Template for this weapon : set it up\nJust add a value, the template will automaticly be created"
            } else {
                for (let b = 0; b < base.stats.length; b++) {
                    if (b == dataselected) {
                        textINembed += "->`"
                    }
                    if (b == 0) {
                        textINembed += `${base.stats[b].cat} : use level stats`
                    } else {
                        textINembed += `${base.stats[b].cat} : ${base.stats[b].base}`
                    }
                    if (b == dataselected) {
                        textINembed += "`<-"
                    }
                    textINembed += "\n"
                }
            }

            rows.push(new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId("show.modifi.database")
                    .setPlaceholder(textINdescription)
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Damage")
                        .setValue(`0`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Cooldown")
                        .setValue(`1`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Range")
                        .setValue(`2`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Radius")
                        .setValue(`3`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Crit Chance")
                        .setValue(`4`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Projectile Speed")
                        .setValue(`5`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Spread")
                        .setValue(`6`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Clip size")
                        .setValue(`7`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Projectiles")
                        .setValue(`8`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Duration")
                        .setValue(`9`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("HitPoints")
                        .setValue(`10`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Speed")
                        .setValue(`11`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Defence")
                        .setValue(`12`),
                        new StringSelectMenuOptionBuilder()
                        .setLabel("Cleanse")
                        .setValue(`13`),
                    )
                ))
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('notYetImplemented:2')
                    .setLabel(`Select the value`)
                    .setStyle(ButtonStyle.Primary),
                ));
            rows.push(new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('Modify.Item.Template.Return')
                    .setLabel(`Save and return`)
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