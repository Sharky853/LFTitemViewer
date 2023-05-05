
const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "weaponRarity",
    id: "weapon.rarity.select",
    async execute(interaction, bot) {
        const selected = interaction.values[0];
        let data = { values: [{position: 1, value: selected}]};
        await funnyFunction.process(interaction, data, bot);
    }
};