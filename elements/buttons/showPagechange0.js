const funnyFunction = require("../../functions/showcommand")
module.exports = {
    name: "showchange page 0",
    id: "show.page.0",
    async execute(interaction, bot) {
        let data = { values:[ {position: 2, value: 0}]};
        await funnyFunction.process(interaction, data, bot);
    }
};