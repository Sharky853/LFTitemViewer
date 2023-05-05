const funnyFunction = require("../../functions/showcommand.js")
module.exports = {
    name: "ShowItemClass",
    id: "show.item.class",
    async execute(interaction, bot) {
        const selected = interaction.values[0];
        let data = { values: [{position: 1, value: selected}]};
        await funnyFunction.process(interaction, data, bot);
        //console.log(interaction.message.embeds[0].data.fields[0].value);
    }
};