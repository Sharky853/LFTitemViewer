const funnyFunction = require("../../functions/showcommand")
module.exports = {
    name: "showchange page 1",
    id: "show.page.1",
    async execute(interaction, bot) {
        let data = { values:[ {position: 2, value: 1}]};
        await funnyFunction.process(interaction, data, bot);
    }
};