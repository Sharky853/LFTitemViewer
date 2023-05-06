module.exports = {
    name: "ShowRedirectionDatabase",
    id: "show.modifi.database",
    async execute(interaction, bot) {
        let selected = interaction.values[0];
        let data
        let path = ""
        selected = selected.split(":")
        switch (selected[0]){
            case "0" :

                path = "../../functions/modifyItemDescription.js"
            break;
            case "1" :
                path ="../../functions/modifyItemTemplate.js"
            break;
            case "2" :

            break;
            case "3" :

            break;
            case "4" :

            break;
            case "5" :

            break;
            
        }
        const funnyFunction = require(path)
            data = { values: [{position: 0, value: selected[1]}]};
                await funnyFunction.process(interaction, data, bot);
    }
};