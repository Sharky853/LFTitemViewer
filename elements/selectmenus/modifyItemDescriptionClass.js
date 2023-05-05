const funnyFunction = require("../../functions/modifyItemDescription.js")
const fs = require('fs');
module.exports = {
    name: "modifyweaponClass",
    id: "modify.class.select",
    async execute(interaction, bot) {
        const selected = interaction.values[0];


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
        let classes = JSON.parse(fs.readFileSync(bot.config.classpath));
        let item



        for (let I = 0; I < items.length; I++) {
            if (items[I].id == id) {
                let classid
                for (let c = 0; c < classes.length; c++) {
                    if (classes[c].id == selected) {
                        item = items[I]

                        item.class = classes[c].nom
        
                        items[I] = item
        
                        var myJsonString = JSON.stringify(items);
                        fs.writeFileSync(bot.config.weaponspath , myJsonString)
                    }
                }
            }
        }




        let data = {
            values: [{
                position: 0,
                value: `${item.id}`
            }]
        };
        await funnyFunction.process(interaction, data, bot);
        //console.log(interaction.message.embeds[0].data.fields[0].value);



    }
};