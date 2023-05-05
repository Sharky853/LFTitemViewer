const {
    SlashCommandBuilder
} = require('discord.js');
const {
    ActionRowBuilder,
    Events,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ModalBuilder,
    ButtonStyle
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
    name: "processelement",
    process
}




async function process(interaction, data, bot) {
    return new Promise(async (resolve, reject) => {
        try {

            //#region Deconstruct data from previous embed
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
            if (footerDataData[2] == 0) {

                let fieldsW = []
                let fieldsC = []
                for (let c = 0; c < bot.databases.classes.length; c++) {
                    let item = bot.databases.classes[c]
                    fieldsC.push(item.field);
                }
                let itemselectedW
                let classtempo = bot.databases.classes[footerDataData[1]]
                for (let w = 0; w < bot.databases.items.length; w++) {
                    let item = bot.databases.items[w]
                    if (item.id == footerDataData[0]) {
                        itemselectedW = item
                    }
                    if (item.class == classtempo.nom & item.id != "in build mode") {
                        let field = item.field;
                        field.value = `${item.id}`;
                        field.label = `${item.nom}`;
                        fieldsW.push(field);
                    }
                }
                footerData[1] = footerDataData.join(":");
                footerText = footerData.join("data");
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(itemselectedW.nom)
                    .setFooter({
                        text: footerText
                    });
                let rows = []
                //#region Create the embed, build the rows, select action row
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('show.item.class')
                        .setPlaceholder(`Change item class : ` + classtempo.nom)
                        .addOptions(fieldsC),
                    ));
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('show.item.select')
                        .setPlaceholder(itemselectedW.nom)
                        .addOptions(fieldsW),
                    ));
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('show.page.1')
                        .setLabel(`Make change`)
                        .setStyle(ButtonStyle.Danger),
                    ));
                // Rebuild footer data
                // Create a canvas to build the weapon picture
                const canvas = Canvas.createCanvas(200, 200);
                const context = canvas.getContext('2d');
                try {
                    // load the weapon image.
                    const weaponImage = await Canvas.loadImage(`./Images/Items/${itemselectedW.id}.png`);
                    // This uses the canvas dimensions to stretch the image onto the entire canvas
                    // load the weapon rarity image
                    // Draw them.
                    context.drawImage(weaponImage, 10, 10, 200, 200);
                } catch (e) {
                    // load the weapon rarity image
                    const rarityImage = await Canvas.loadImage(`./Images/Error/image.png`);
                    context.drawImage(rarityImage, 0, 0, 200, 200);
                    // Draw them.
                }
                let attachementname = 'weaponImage.png'
                // Use the helpful Attachment class structure to process the file for you
                const attachment = new AttachmentBuilder(await canvas.encode('png'), {
                    name: attachementname
                });
                embed.setThumbnail("attachment://" + attachementname);
                //#endregion
                try {
                    await interaction.update({
                        embeds: [embed],
                        components: rows,
                        files: [attachment],
                        ephemeral: true,
                    }).then((inter) => {
                        resolve();
                    });
                } catch (e) {
                    await interaction.reply({
                        embeds: [embed],
                        components: rows,
                        files: [attachment],
                        ephemeral: true,
                    }).then((inter) => {
                        resolve();
                    })
                }
            } else {
                let fieldsW = []
                let fieldsC = []
                for (let c = 0; c < bot.databases.classes.length; c++) {
                    let item = bot.databases.classes[c]
                    fieldsC.push(item.field);
                }
                let itemselectedW
                let classtempo = bot.databases.classes[footerDataData[1]]
                for (let w = 0; w < bot.databases.items.length; w++) {
                    let item = bot.databases.items[w]
                    if (item.id == footerDataData[0]) {
                        itemselectedW = item
                    }
                    if (item.class == classtempo.nom & item.id != "in build mode") {
                        let field = item.field;
                        field.value = `${item.id}`;
                        field.label = `${item.nom}`;
                        fieldsW.push(field);
                    }
                }
                let tierinfo = ""
                let tierdata = []
                try {
                    for (let t = 0; t < bot.databases.tierstatsdata.length; t++) {
                        if (bot.databases.tierstatsdata[t].id == itemselectedW.id) {
                            tierdata = bot.databases.tierstatsdata[t].basestats
                            //common 
                            tierinfo += "common value : "
                            for (let tc = 0; tc < tierdata.Common.length; tc++) {
                                tierinfo += `| ${tierdata.Common[tc].value}`
                            }
                            tierinfo += "\ncommon increment : "
                            for (let tc = 0; tc < tierdata.Common.length; tc++) {
                                tierinfo += `| ${tierdata.Common[tc].increment}`
                            }
                            //uncommon
                            tierinfo += "\nuncommon value : "
                            for (let tc = 0; tc < tierdata.Uncommon.length; tc++) {
                                tierinfo += `| ${tierdata.Uncommon[tc].value}`
                            }
                            tierinfo += "\nuncommon increment : "
                            for (let tc = 0; tc < tierdata.Uncommon.length; tc++) {
                                tierinfo += `| ${tierdata.Uncommon[tc].increment}`
                            }
                            //rare
                            tierinfo += "\nrare value : "
                            for (let tc = 0; tc < tierdata.Rare.length; tc++) {
                                tierinfo += `| ${tierdata.Rare[tc].value}`
                            }
                            tierinfo += "\nrare increment : "
                            for (let tc = 0; tc < tierdata.Common.length; tc++) {
                                tierinfo += `| ${tierdata.Rare[tc].increment}`
                            }
                            //epic
                            tierinfo += "\nepic value : "
                            for (let tc = 0; tc < tierdata.Epic.length; tc++) {
                                tierinfo += `| ${tierdata.Epic[tc].value}`
                            }
                            tierinfo += "\nepic increment : "
                            for (let tc = 0; tc < tierdata.Epic.length; tc++) {
                                tierinfo += `| ${tierdata.Epic[tc].increment}`
                            }
                            //leggy
                            tierinfo += "\nlegendary value : "
                            for (let tc = 0; tc < tierdata.Legendary.length; tc++) {
                                tierinfo += `| ${tierdata.Legendary[tc].value}`
                            }
                            tierinfo += "\nlegendary increment : "
                            for (let tc = 0; tc < tierdata.Legendary.length; tc++) {
                                tierinfo += `| ${tierdata.Legendary[tc].increment}`
                            }
                        }
                    }
                    if (tierinfo == "") {
                        tierinfo = "missing data . . . "
                    }
                } catch {
                    tierinfo = "missing data or error in the build "
                }
                let trainingInfo = ""
                try {
                    for (let t = 0; t < bot.databases.trainings.length; t++) {
                        if (bot.databases.trainings[t].id == itemselectedW.id) {
                            for (let tf = 0; tf < bot.databases.trainings[t].field.length; tf++) {
                                trainingInfo += `lvl:${tf + 1} :  ${bot.databases.trainings[t].field[tf].cat} =  ${bot.databases.trainings[t].field[tf].val}\n`
                            }
                        }
                    }
                    if (trainingInfo == "") {
                        trainingInfo = "missing data . . . "
                    }
                } catch {
                    trainingInfo = "missing data or error in the build "
                }
                try {
                    globalinfo = `item id : \`${itemselectedW.id}\`\nitem name :\` ${itemselectedW.nom}\`\nclass : \`${itemselectedW.class}\`\ndescription : \`${itemselectedW.description}\`\nlabel description : \`${itemselectedW.field.label}\`\n`
                } catch {
                    globalinfo = "missing data or error in the build "
                }
                let templateInfo = ""
                try {
                    for (let b = 0; b < bot.databases.basestatsdata.length; b++) {
                        if (bot.databases.basestatsdata[b].id == itemselectedW.id) {
                            for (let bf = 0; bf < bot.databases.basestatsdata[b].stats.length; bf++) {
                                templateInfo += `${ bot.databases.basestatsdata[b].stats[bf].cat}: ${bot.databases.basestatsdata[b].stats[bf].base}\n`
                            }
                        }
                    }
                    if (templateInfo == "") {
                        templateInfo = "missing data . . . "
                    }
                } catch {
                    templateInfo = "missing data or error in the build "
                }
                // Rebuild footer data
                footerData[1] = footerDataData.join(":");
                footerText = footerData.join("data");
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(itemselectedW.nom)
                    .addFields({
                        name: 'Item global information',
                        value: globalinfo
                    }, {
                        name: 'Item tier start value',
                        value: tierinfo,
                    }, {
                        name: 'Training tree',
                        value: trainingInfo,
                        inline: true
                    }, {
                        name: 'Item template',
                        value: templateInfo,
                        inline: true
                    }, {
                        name: 'Perk adding',
                        value: 'not yet implemented ',
                        inline: true
                    })
                    .setFooter({
                        text: footerText
                    });
                let rows = []
                //#region Create the embed, build the rows, select action row


                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('show.page.0')
                        .setLabel(`Return item selection `)
                        .setStyle(ButtonStyle.Danger),
                    ));

                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId("show.modifi.database")
                        .setPlaceholder("Make change to the database :")
                        .addOptions(
                                new StringSelectMenuOptionBuilder()
                            .setLabel("Item Description")
                            .setDescription("Make change in the description and image of a item")
                            .setValue(`0:${itemselectedW.id}`),
                                new StringSelectMenuOptionBuilder()
                            .setLabel("Item Template")
                            .setDescription("Make change in the template of a item")
                            .setValue(`1:${itemselectedW.id}`),
                                new StringSelectMenuOptionBuilder()
                            .setLabel("Item tier value")
                            .setDescription("Make change in the tier value of a item")
                            .setValue(`2:${itemselectedW.id}`),
                                new StringSelectMenuOptionBuilder()
                            .setLabel("Item training tree")
                            .setDescription("Make change in the training tree of a item")
                            .setValue(`3:${itemselectedW.id}`),
                                new StringSelectMenuOptionBuilder()
                            .setLabel("Item perks")
                            .setDescription("Make change in the perk selection of a item")
                            .setValue(`4:${itemselectedW.id}`),
                        )
                    ))
                // Create a canvas to build the weapon picture
                const canvas = Canvas.createCanvas(200, 200);
                const context = canvas.getContext('2d');
                try {
                    // load the weapon image.
                    const weaponImage = await Canvas.loadImage(`./Images/Items/${itemselectedW.id}.png`);
                    // This uses the canvas dimensions to stretch the image onto the entire canvas
                    // load the weapon rarity image
                    // Draw them.
                    context.drawImage(weaponImage, 10, 10, 200, 200);

                } catch (e) {
                    // load the weapon rarity image
                    const rarityImage = await Canvas.loadImage(`./Images/Error/image.png`);
                    context.drawImage(rarityImage, 0, 0, 200, 200);
                    // Draw them.
                }

                let attachementname = 'weaponImage.png'
                // Use the helpful Attachment class structure to process the file for you
                const attachment = new AttachmentBuilder(await canvas.encode('png'), {
                    name: attachementname
                });

                embed.setThumbnail("attachment://" + attachementname);
                //#endregion
                try {
                    await interaction.update({
                        embeds: [embed],
                        components: rows,
                        files: [attachment],
                        ephemeral: true,
                    }).then((inter) => {
                        resolve();
                    });
                } catch (e) {
                    await interaction.reply({
                        embeds: [embed],
                        components: rows,
                        files: [attachment],
                        ephemeral: true,
                    }).then((inter) => {
                        resolve();
                    })
                }

            }
        } catch (e) {
            console.log(e)
        }
    })
};