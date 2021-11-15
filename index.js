const Discord = require('discord.js');

const client = new Discord.Client({disableEveryone: true});

const { token, default_prefix } = require('./config.json');
const config = require('./config.json');
client.config = config;

client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
});

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
  

client.login(token);
