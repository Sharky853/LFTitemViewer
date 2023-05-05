const funnyFunction = require("../../functions/modifyItemDescription.js")

const fs = require('fs');

module.exports = {
    name: "ModifyItemDescriptionNameAnswer",
    id: "Modify.Item.Description.Name.Answer",
    async execute(interaction, bot) {

        let value = interaction.fields.getTextInputValue('favoriteColorInput');

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

                item.nom = value

                items[I] = item

                var myJsonString = JSON.stringify(items);
                fs.writeFileSync(bot.config.weaponspath , myJsonString)
            }
        }


       

        let data = { values: [{position: 0, value: `${item.id}`}]};
        await funnyFunction.process(interaction, data, bot);


    }
};