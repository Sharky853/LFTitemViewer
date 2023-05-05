const funnyFunction = require("../../functions/showcommand.js")
const fs = require('fs');
module.exports = {
    name: "Modify.Item.Description.Validation",
    id: "Modify.Item.Description.Validation",
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
        

        console.log("loading database : items")
        bot.databases.items = JSON.parse(fs.readFileSync(bot.config.weaponspath));
        console.log("database loaded succesfully : items")
            
        



        let data = { values: [{position: 0, value: `${item.id}`}]};
        await funnyFunction.process(interaction, data, bot);
    }
};