const fs = require('node:fs');
const path = require('node:path');
module.exports = async (bot, client, reload) => {
    const buttonsPath = './elements/buttons/'
    console.log(buttonsPath);
    const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));  
    for (const file of buttonFiles) {
        const filePath = "." + buttonsPath + file;
        if(reload){
            delete require.cache[require.resolve(filePath)];
        }
        const button = require(filePath);
        console.log(`The button : ${button.name} : has been hadded.`);
    
        if ('name' in button && 'id' in button && 'execute' in button) {
            client.buttons.set(button.name, button);
        } else {
            console.log(`[WARNING] The selectmenus at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}