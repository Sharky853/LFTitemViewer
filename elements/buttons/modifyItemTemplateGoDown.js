const funnyFunction = require("../../functions/modifyItemTemplate.js")
module.exports = {
    name: "ModifyItemTemplateGoDown",
    id: "Modify.Item.Template.GoDown",
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

        let data = { values:[ {position: 3, value: (parseInt(footerDataData[3]) + 1)}]};
        await funnyFunction.process(interaction, data, bot);
    }
};