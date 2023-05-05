const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "pageCHanged0",
    id: "page.change.to.1",
    async execute(interaction, bot) {
        let data = { values:[ {position: 9, value: 1}]};
        await funnyFunction.process(interaction, data, bot);
    }
};