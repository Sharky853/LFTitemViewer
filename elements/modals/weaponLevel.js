const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "levelModal",
    id: "weapon.level.modal",
    async execute(interaction, bot) {

        let value = interaction.fields.getTextInputValue('favoriteColorInput');


        //verifie if number given is a number, if not , get random number
        if (Number.isNaN(+value)) {
            value = Math.floor(Math.random() * 50) + 1;
        }

        //verifie if number is in bounds , if not , make it inbounds 
        if(value < 1){
            value = 1 
        }
        if(value > 50){
            value = 50 
        }    

        //remove leading 0 if needed : example :  09 become 9
        value =  parseInt(value);

        let data = { values: [{position: 3, value: value}]};
        await funnyFunction.process(interaction, data, bot);
        /* const selected = interaction.values[0];

        let data = { values: [{position: 2, value: selected}]};
        await funnyFunction.process(interaction, data, bot);*/



    }
};