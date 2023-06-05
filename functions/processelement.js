const {
    SlashCommandBuilder
} = require('discord.js');
const {
    ActionRowBuilder,
    Events,
    StringSelectMenuBuilder,
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


            /*footerdatadat should look like this : 

            {item id},{item rarity},{item class},{item lvl},{item training},{item perk 1},{item perk 2},{item perk 3},{item perk 4},{page}
                0           1             2          3           4               5             6             7               8         9

            */

            //#endregion

            if (footerDataData[9] == 0) {

                bot

                let fieldsW = []
                let fieldsR = []
                let fieldsC = []
                for (let c = 0; c < bot.databases.classes.length; c++) {
                    let item = bot.databases.classes[c]
                    fieldsC.push(item.field);
                }
                //
                //   hummmm, great song choice  :)
                //
                let itemselectedW
                let classtempo = bot.databases.classes[footerDataData[2]]
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
                // setup fields for rarity
                for (let r = 0; r < bot.databases.rarities.length; r++) {
                    let item = bot.databases.rarities[r]
                    fieldsR.push(item.field);
                }

                let itemselectedR = bot.databases.rarities[footerDataData[1]]
                let rows = []
                //#region Create the embed, build the rows, select action row
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('weapon.class.select')
                        .setPlaceholder(`Change item class : ` + classtempo.nom)
                        .addOptions(fieldsC),
                    ));
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('weapon.select')
                        .setPlaceholder(itemselectedW.nom)
                        .addOptions(fieldsW),
                    ));
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('weapon.rarity.select')
                        .setPlaceholder(itemselectedR.nom)
                        .addOptions(fieldsR),
                    ));
                rows.push(new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('page.change.to.1')
                        .setLabel(`Item stats`)
                        .setStyle(ButtonStyle.Danger),
                    ));
                // Rebuild footer data
                footerData[1] = footerDataData.join(":");
                footerText = footerData.join("data");



                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(itemselectedR.nom + " " + itemselectedW.nom)
                    .setDescription(itemselectedW.description)
                    .setFooter({
                        text: footerText
                    });

                // Create a canvas to build the weapon picture
                const canvas = Canvas.createCanvas(200, 200);
                const context = canvas.getContext('2d');
                try {
                    // load the weapon image.
                    const weaponImage = await Canvas.loadImage(`./Images/Items/${itemselectedW.id}.png`);

                    // This uses the canvas dimensions to stretch the image onto the entire canvas

                    // load the weapon rarity image
                    const rarityImage = await Canvas.loadImage(`./Images/Rarity/${itemselectedR.nom}.png`);
                    // Draw them.
                    context.drawImage(rarityImage, 0, 0, 200, 200);
                    context.drawImage(weaponImage, 10, 10, 180, 180);

                } catch (e) {
                    // load the weapon rarity image
                    const rarityImage = await Canvas.loadImage(`./Images/Error/ima.png`);
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
                //////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////
            } else {

                //stage 1 , get the fields of the good data base , 
                //stage 2 , write message for each field 
                //stage 3 , i dont know , let me draw 

                let itemchose; //moslty got the id of the item
                let itembasestats //get the base stats 
                let itemtierstats //get tier stats 
                let trainingitem; //get the training tree , read # level we choosed (max will be the training tree.lenght)
                let classchose; // get what base we should check tierlevel
                let levelitem; // get correct tierlevel

                let messagebase //first message base stats
                let messagetraining //give the training added
                let messagefinal //give the final damage
                let messgehidden //give the hidden damage of boost by the game
                let messageperk //give the adding of what the perk do 
                let messagespeciality //give nerd stuff when needed 

                for (item in bot.databases.items) {
                    if (bot.databases.items[item].id == footerDataData[0]) {
                        itemchose = bot.databases.items[item]
                    }
                } // get item 
                for (item in bot.databases.basestatsdata) {
                    if (bot.databases.basestatsdata[item].id == itemchose.id) {
                        itembasestats = bot.databases.basestatsdata[item]
                    }
                } // get item stats
                for (item in bot.databases.tierstatsdata) {
                    if (bot.databases.tierstatsdata[item].id == itemchose.id) {
                        itemtierstats = bot.databases.tierstatsdata[item]
                    }
                } // get item training
                for (item in bot.databases.trainings) {
                    if (bot.databases.trainings[item].id == itemchose.id) {
                        trainingitem = bot.databases.trainings[item]
                    }
                } // get item training 






                const canvas = Canvas.createCanvas(200, 200);
                const context = canvas.getContext('2d');
                try {
                    // load the weapon image.
                    const weaponImage = await Canvas.loadImage(`./Images/Items/${itemchose.id}.png`);

                    // This uses the canvas dimensions to stretch the image onto the entire canvas

                    // load the weapon rarity image
                    const rarityImage = await Canvas.loadImage(`./Images/Rarity/${bot.databases.rarities[footerDataData[2]].nom}.png`);
                    // Draw them.
                    context.drawImage(rarityImage, 0, 0, 200, 200);
                    context.drawImage(weaponImage, 10, 10, 180, 180);

                } catch (e) {
                    // load the weapon rarity image
                    const rarityImage = await Canvas.loadImage(`./Images/Error/ima.png`);
                    context.drawImage(rarityImage, 0, 0, 200, 200);
                    // Draw them.
                }

                let attachementname = 'weaponImage.png'
                // Use the helpful Attachment class structure to process the file for you
                const attachment = new AttachmentBuilder(await canvas.encode('png'), {
                    name: attachementname
                });



                footerData[1] = footerDataData.join(":");
                footerText = footerData.join("data");

                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("item rarity + item name + item lvl")
                    .setDescription(`${itemchose.description}`)
                    .addFields({
                        name: 'Base damages',
                        value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        inline: true
                    }, {
                        name: 'final values',
                        value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        inline: true
                    }, {
                        name: '\u200B',
                        value: '\u200B'
                    }, {
                        name: 'What training add',
                        value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        inline: true
                    }, {
                        name: 'perk adding',
                        value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        inline: true
                    }, {
                        name: '\u200B',
                        value: '\u200B'
                    }, {
                        name: 'hidden stats',
                        value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        inline: true
                    }, {
                        name: 'Item specificacity',
                        value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        inline: true
                    }, )
                    .setFooter({
                        text: footerText
                    });
                embed.setThumbnail("attachment://" + attachementname);

               

                await interaction.update({
                    embeds: [embed],
                    components: [],
                    files: [attachment],
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                });
            }
        } catch (e) {

            console.clear();
            console.log("Error detected")
            console.error(e)
            console.log(`error data :`)
            console.log(data)
            // Create the embed
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle("Jingle error !")
                .setDescription("Oops ,seems like an error has occurred :(\nWelp , here , have some Jingles , that will probably cheer you up !")
            // Create a canvas to build the weapon picture
            const canvas = Canvas.createCanvas(200, 200);
            const context = canvas.getContext('2d');

            // This uses the canvas dimensions to stretch the image onto the entire canvas

            // load the weapon rarity image
            const rarityImage = await Canvas.loadImage(`./Images/Error/Jingle.png`);
            // Draw them.
            context.drawImage(rarityImage, 0, 0, 200, 200);

            let attachementname = 'weaponImage.png'
            // Use the helpful Attachment class structure to process the file for you
            const attachment = new AttachmentBuilder(await canvas.encode('png'), {
                name: attachementname
            });

            embed.setThumbnail("attachment://" + attachementname);

            try {
                await interaction.update({
                    embeds: [embed],
                    files: [attachment],
                    components: [],
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                });




            } catch (e) {
                await interaction.reply({
                    embeds: [embed],
                    files: [attachment],
                    components: [],
                    ephemeral: true,
                }).then((inter) => {
                    resolve();
                })
            }
        }
    })
}