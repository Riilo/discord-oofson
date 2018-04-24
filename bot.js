const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`on ${client.guilds.size} servers\n Add me to your server: https://goo.gl/UHDou4`);
});

client.on('guildMemberAdd', member => {
  message.channel.send("Welcome to the server! ${member}!");
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("messageDelete", (messageDelete) => {
let logschannel = message.guild.channels.find('logs', 'logs');
 messageDelete.logschannel.send.send(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`)
});
 

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
                name: "Removing users: ↓",
                value: "`!ban <user (ping/mention)> <reason>` - Bans the user specified from the server.\n———\n`!kick <user (ping/mention)> <reason>` - Kicks the user specified from the server.\n"
              },
              {
                name: "Personal Commands: ↓",
                value: "`!ping` - Gives you your ping.\n———\n`!poll` - Creates a poll with answers 'Yes' and 'No'\n———\n`!help` - Makes this help page you are currently looking at.\n"
              },
              {
                name: "Others: ↓",
                value: "`!purge <2-100>` - Clears chat history depending on how many messages specified.\n———\n`!say <message>` - Controls what the bot says.\n"
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
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  } else

  if(command === "game") {
    const game = args.join(" ");
    message.delete().catch(O_o=>{}); 
    client.user.setGame(game);

  } else
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  if(command === "poll") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    const pollTopic = await message.channel.send("**Incoming Poll: **"+"`"+sayMessage+"`");
    pollTopic.react(`✅`);
    pollTopic.react(`⛔`);
};
// test
  
  if(command === "kick") {
    if(!message.member.roles.some(r=>["Owner","Colonel General"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
  
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  
});

client.login(process.env.BOT_TOKEN);
