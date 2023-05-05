const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "pageCHanged1",
    id: "page.change.to.0",
    async execute(interaction, bot) {
        let data = {
            values: [{
                position: 9,
                value: 0
            }, {
                position: 5,
                value: 0
            }, {
                position: 6,
                value: 0
            }, {
                position: 7,
                value: 0
            }, {
                position: 8,
                value: 0
            }]
        };
        await funnyFunction.process(interaction, data, bot);
    }
};