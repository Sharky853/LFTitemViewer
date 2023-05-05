const fs = require('node:fs');
const path = require('node:path');
module.exports = async (bot, client, reload) => {
    const modalsPath = './elements/modals/'
    console.log(modalsPath);
    const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));  
    for (const file of modalFiles) {
        const filePath = "." + modalsPath + file;
        if(reload){
            delete require.cache[require.resolve(filePath)];
        }
        const modal = require(filePath);
        console.log(`The modal : ${modal.name} : has been hadded.`);
    
        if ('name' in modal && 'id' in modal && 'execute' in modal) {
            client.modals.set(modal.name, modal);
        } else {
            console.log(`[WARNING] The modal at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}