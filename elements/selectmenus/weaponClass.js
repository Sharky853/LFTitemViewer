const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "weaponClass",
    id: "weapon.class.select",
    async execute(interaction, bot) {
        const selected = interaction.values[0];
        let data = { values: [{position: 2, value: selected}]};
        await funnyFunction.process(interaction, data, bot);
        //console.log(interaction.message.embeds[0].data.fields[0].value);

        

    }
};