const funnyFunction = require("../../functions/processelement.js")
module.exports = {
    name: "trainingModal",
    id: "weapon.training.modal",
    async execute(interaction, bot) {

        let value = interaction.fields.getTextInputValue('favoriteColorInput');



        //verifie if number given is a number, if not , get random number
        if (Number.isNaN(+value)) {
            value = Math.floor(Math.random() * 50) + 1;
        }

        //verifie if number is in bounds , if not , make it inbounds 
        if(value < 0){
            value = 0
        }
        if(value > 33){
            value = 33
        }

        //remove leading 0 if needed : example :  09 become 9
        value =  parseInt(value);

        let data = { values: [{position: 4, value: value}]};
        await funnyFunction.process(interaction, data, bot);


    }
};