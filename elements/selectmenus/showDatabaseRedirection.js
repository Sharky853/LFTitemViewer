module.exports = {
    name: "ShowRedirectionDatabase",
    id: "show.modifi.database",
    async execute(interaction, bot) {
        let selected = interaction.values[0];
        selected = selected.split(":")
        switch (selected[0]){
            case "0" :
                const funnyFunction = require("../../functions/modifyItemDescription.js")
                let data = { values: [{position: 0, value: selected[1]}]};
                await funnyFunction.process(interaction, data, bot);
            break;
            case "1" :

            break;
            case "2" :

            break;
            case "3" :

            break;
            case "4" :

            break;
        }
    }
};