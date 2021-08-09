const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`on ${client.guilds.size} servers\n Add me to your server: https://goo.gl/UHDou4`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("messageDelete", (message) => {
 let logschannel = message.guild.channels.find('name', 'logs');
 logschannel.send({embed: {
              color: Math.floor(Math.random() * 16777214) + 1,  
              description: (`The message: '${message.content}' by ${message.author} was deleted by ${message.author}. Let's hope you're better at hiding your porn.`)
}})});
 

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on('message', (message) => {
      if(message.content.startsWith('!help')) {
          message.channel.send({embed: {
              color: Math.floor(Math.random() * 16777214) + 1,  
              description: ("Welcome to the Bettsey Bot **HELP PAGE!**\n"),
              fields: [{
                name: "Personal Commands: ↓",
                value: "`!help` - Makes this help page you are currently looking at.\n"
              },
              {
                name: "Others: ↓",
                value: "`!say <message>` - Controls what the bot says.\n"
              }
            ],
            timestamp: new Date(),
            footer: {
            icon_url: message.author.avatarURL,
            text: "Requested:"
            },
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
          }
        });
            }
        });

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

});

client.login(process.env.BOT_TOKEN);
