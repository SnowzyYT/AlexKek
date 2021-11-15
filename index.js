const Discord = require('discord.js');

const client = new Discord.Client({disableEveryone: true});

const { token, default_prefix } = require('./config.json');

const fs = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const config = require('./config.json');
client.config = config;

const db = require('quick.db');

fs.readdirSync('./commands/').forEach(dir => {

    //in the cmds folder, we gonna check for the category
    fs.readdir(`./commands/${dir}`, (err, files) => {

        // console log err (catch err)
        if (err) throw err;

         // checking if the files ends with .js if its a javascript file
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

         // if there is no cmds in the file it will return
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        
        jsFiles.forEach(file => {

            // console the loaded cmds 
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`╠✅》 ${file} was loaded`)

            // gonna let the cmds run
            try {
                client.commands.set(fileGet.help.name, fileGet);

                // it search in the cmds folder if there is any aliases
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name);
              })

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
    });
});


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
});

let stats = {
    serverID: '<ID>',
    total: "<ID>",
    member: "<ID>",
    bots: "<ID>"
}

  client.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.channelID
    const oldUserChannel = oldMember.channelID
   const textChannel = newMember.guild.channels.cache.get('887069113069994035')
  
    if(newUserChannel === '852906675110281257') {
      textChannel.send(`Es ist jemand im Support Warteraum! <@&${'852906451084509224'}> <@&${'852906448684843018'}> <@&${'852906447749906463'}> <@&${'853655467715592233'}> <@&${'852906444710084609'}>`)
    } else if (oldUserChannel === '852906675110281257' && newUserChannel !== '852906675110281257') {
     textChannel.send(``)
   }
  })

 client.on('voiceStateUpdate', (oldMember, newMember) => {
   const newUserChannel = newMember.channelID
    const oldUserChannel = oldMember.channelID
   const textChannel = newMember.guild.channels.cache.get('887069113069994035')
  
    if(newUserChannel === '852906677450965032') {
     textChannel.send(`Es ist jemand in der Support Weiterleitung! @everyone`)
    } else if (oldUserChannel === '852906677450965032' && newUserChannel !== '852906677450965032') {
     textChannel.send(``)
    }
  })
  
client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix;
// no one did =setprefix
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    if(prefixes == null) {
        prefix = "." // this will be the default prefix
    } else {
        prefix = prefixes;
    }
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)
    let commands = client.commands.get(cmd.slice(default_prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(default_prefix.length)));

    if(commands) commands.run(client, message, args, prefix);
  })

client.login(token);
