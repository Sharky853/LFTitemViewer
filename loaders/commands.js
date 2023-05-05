const fs = require('node:fs');
const path = require('node:path');
module.exports = async (bot, client, reload) => {
    const commandsPath = './commands/'
    console.log(commandsPath);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));  
    for (const file of commandFiles) {
        const filePath = "." + commandsPath + file;
        if(reload){
            delete require.cache[require.resolve(filePath)];
        }
        const command = require(filePath);
        console.log(`The command : ${command.data.name} : has been hadded.`);
    
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}