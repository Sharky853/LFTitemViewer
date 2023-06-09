const {
    ActionRowBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js');

const fs = require('fs');

module.exports = {
    name: "Modify name",
    id: "Modify.Item.Description.Name",
    async execute(interaction, bot) {

        let footerText;
        try {
            footerText = interaction.message.embeds[0].footer.text;
        } catch (e) {
            console.log("oops")
        }
        let footerData = footerText.split("data");
        let footerDataData = footerData[1].split(":");
        // edit data

        let id = footerDataData[0]
        let items = JSON.parse(fs.readFileSync(bot.config.weaponspath));
        let item

        for (let I = 0; I < items.length; I++) {
            if (items[I].id == id) {
                item = items[I]
            }
        }

        const modal = new ModalBuilder()
            .setCustomId('Modify.Item.Description.Name.Answer')
            .setTitle('Change the Name of the item');


        const favoriteColorInput = new TextInputBuilder()
            .setMaxLength(30)
            // set the minimum number of characters required for submission
            .setMinLength(1)
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("Change item name")

            .setValue(`${item.nom}`)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);



        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);



    }
};