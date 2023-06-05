const funnyFunction = require("../../functions/showcommand.js")
const fs = require('fs');
module.exports = {
    name: "Modify.Item.Template.Validation",
    id: "Modify.Item.Template.Validation",
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
        let items = JSON.parse(fs.readFileSync(bot.config.basestatspath));
        let item 

        for (let I = 0; I < items.length; I++) {
            if (items[I].id == id) {
                item = items[I]
            }
        }
        

        console.log("loading database : Base stats")
        bot.databases.basestatsdata = JSON.parse(fs.readFileSync(bot.config.basestatspath));
        console.log("database loaded succesfully : Base Stats")
            
        



        let data = { values: []};
        await funnyFunction.process(interaction, data, bot);
    }
};