module.exports = {
    name: "ShowRedirectionDatabase",
    id: "show.modifi.database",
    async execute(interaction, bot) {
        let selected = interaction.values[0];
        let data
        let path = ""
        selected = selected.split(":")
        switch (selected[0]) {
            case "0":

                path = "../../functions/modifyItemDescription.js"
                data = {
                    values: [{
                        position: 0,
                        value: selected[1]
                    }]
                };
                break;
            case "1":

                path = "../../functions/modifyItemTemplate.js"
                data = {
                    values: [{
                        position: 0,
                        value: selected[1]
                    }, {
                        position: 3,
                        value: "0"
                    }]
                };
                break;
            case "2":

                break;
            case "3":

                break;
            case "4":

                break;
            case "5":

                break;

        }
        try {
            const funnyFunction = require(path)

            await funnyFunction.process(interaction, data, bot);
        } catch (e) {

            console.log(`Someone try to use unfinish button`);
            await interaction.reply({
                content: `This is a unfinish interation,\nthe code behind it is not yet implemented`,
                fetchreply: true,
                ephemeral: true,
            })
        }

    }
};