const funnyFunction = require("../../functions/modifyItemTemplate")
module.exports = {
    name: "ModifyIttem template return",
    id: "Modify.Item.Template.Return",
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

        let data = { values:[ {position: 4, value: 0}]};
        await funnyFunction.process(interaction, data, bot);
    }
};