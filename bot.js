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

client.on('message', message => { //Message Event | Listener

    if (message.content.startsWith(prefix + 'Userinfo')) {

        const UserInfo = new Discord.MessageEmbed()

            //All Fields are Optional Pick Any some

            .setAuthor(message.author.username, message.author.avatarURL()) //Heading With Username & Their Avatar 
            .setTitle('UserInfo')
            .setURL('www.google.com') //Any Vaild Link
            .setColor('RANDOM') //You Can Use HexColour Ex:- #000000
            .setImage(message.author.avatarURL()) //Add Any Image URl || Image
            .setThumbnail(message.author.avatarURL()) //Add Any Image URl || ThumbNail

            //All Feilds Are Just Examples pick Some & add as you like

            .addField('Avatar', message.author.avatar, true) //The ID of the user's avatar //Inline True or false
            .addField('AvatarURL', message.author.avatarURL({
                format: 'png'
            }), true) //{options} options are Size?: 128 | 256 | 512 | 1024 | 2048, Format?: "webp" | "png" | "jpg" | "gif" //.defaultAvatarURL() A link to the user's default avatar //.displayAvatarURL() A link to the user's avatar if they have one. Otherwise a link to their default avatar will be returned
            .addField('AvatarURL', message.author.avatarURL({
                size: '2048'
            }), true)
            .addField('Bot', message.author.bot, true) //Returns True If Message Author = Bot || False If Message Author not Bot.
            .addField('Created At', message.author.createdAt, false) //The time the user was created || .createdTimestamp - The timestamp the user was created at
            .addField('Discrim', message.author.discriminator, true) //A discriminator/tag based on username for the user Ex:- 0001
            .addField('DMChannel', message.author.dmChannel) //The DM between the client's user and this user || If Nothing Returns "Null"
            .addField('ID', message.author.id) //The ID of the User/author
            .addField('Last Message', message.author.lastMessage) //The Message object of the last message sent by the user, if one was sent
            .addField('Last Message ID', message.author.lastMessageID) //The ID of the last message sent by the user, if one was sent
            .addField('Presence', message.author.presence) //The presence of this user
            .addField('Presence Status', message.author.presence.status) //The presence status of this user
            .addField('Presence Game', message.author.presence.activity.name) //The presence Game of this user
            .addField('Tag', message.author.tag) //The Discord "tag" for this user || Ex:- Sai Chinna#6718
            .addField('Username', message.author.username) //The username of the user || Ex:- Sai Chinna
            .addField('Nick Name', message.guild.member(target).displayName) //Nick Name In That (message sent) server || Define target as message Author Ex:- let target = message.author; || Add This Line in Top

            .setFooter('Requested By', message.author.tag) //Change To Anything As You Wish
            .setTimestamp() //The timestamp of this embed

        message.channel.send(UserInfo);
    }


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

  if(command === "bot") {
    member.guild.channels.get('439792255365021696').setName(`Total Users: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    member.guild.channels.get('439793088001736725').setName(`Member Count: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    member.guild.channels.get('439793716052623361').setName(`Bot Count: ${bots}`)
  }

  if(command === "avatar") {
  client.users.get(event.user.uid).avatarURL
  
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  if(command === "info") {
    message.channel.send({embed: {
    color: 3447003,
    icon_url: client.user.avatarURL,
    description: "G'day, I'm Oofson, the biggest meme of 2018. I was created by the legendary @Rilo#6659. I like rushing to class and being a teacher pet. Which is why I have come to help you all and provide you with some amazing commands. Do '!help' to see all of the commands."
}})};
  

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
