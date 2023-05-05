const {
    ActionRowBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js');
const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "weaponTraining",
    id: "weapon.training.press",
    async execute(interaction, bot) {
        /* const selected = interaction.values[0];

        let data = { values: [{position: 2, value: selected}]};
        await funnyFunction.process(interaction, data, bot);*/

        const modal = new ModalBuilder()
            .setCustomId('weapon.training.modal')
            .setTitle('Choose training level');

        // Add components to modal

        // Create the text input components
        const favoriteColorInput = new TextInputBuilder()
            .setMaxLength(2)
            // set the minimum number of characters required for submission
            .setMinLength(1)
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("Choose the training level")
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