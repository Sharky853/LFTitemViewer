const fs = require('node:fs');
const path = require('node:path');
module.exports = async (bot, client, reload) => {
    const selectmenussPath = './elements/selectmenus/'
    console.log(selectmenussPath);
    const selectmenusFiles = fs.readdirSync(selectmenussPath).filter(file => file.endsWith('.js'));  
    for (const file of selectmenusFiles) {
        const filePath = "." + selectmenussPath + file;
        if(reload){
            delete require.cache[require.resolve(filePath)];
        }
        const selectmenus = require(filePath);
        console.log(`The selectmenus : ${selectmenus.name} : has been hadded.`);
    
        if ('name' in selectmenus && 'id' in selectmenus && 'execute' in selectmenus) {
            client.selectmenus.set(selectmenus.name, selectmenus);
        } else {
            console.log(`[WARNING] The selectmenus at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}