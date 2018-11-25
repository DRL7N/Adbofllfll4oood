const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const USER = new Discord.Client();
const { BOTID , INVITE ,GUILD , ONLYADVERT, sinceLastLJ, cachedDMS,  USERID, CHANNELID, OWNERS, PREFIX} = require('./system');


client.on('ready', () => {
   console.log(`Online: ${client.user.tag}\nGuilds: ${client.guilds.size}`);
   client.user.setGame(`3rb Network`);
}).on("error", function(error) {
  return console.log(error);
}).on("message", message => {
  let A = message.content.split(' ');
  let S = A.join(' ');
if (message.content.startsWith(S)) {
if (message.author.id !== USERID) return;
if (message.channel.guild) return;
client.channels.get(CHANNELID).send(S);
}
});

USER.on('ready', () => {
  console.log(`Online: ${USER.user.tag}\nGuilds: ${USER.guilds.size}`);
  USER.user.setGame(`3rb Network`);
}).on("error", function(error) {
 return console.log(error);
}).on("message", async message => {
  if (message.author.id === USER.user.id) return;
  if (message.channel.type !== "dm") return;
  if (ONLYADVERT && !/discord\.gg\/\w+|bot\.discord\.io\/\w+|discordapp\.com\/invites\/\w+|discord\.me\/\w+/g.test(message.content)) return;
  let owner = USER.users.get(BOTID);
  let over = Date.now() - sinceLastLJ < 60000 ? "أقل من دقيقة بعد دخولي " : "عند دخولي مباشرة"
  if (!owner) {
      let msg = {
          content: message.content,
          author: {
              id: message.author.id,
              tag: message.author.tag
          },over
      }
      return cachedDMS.push(msg)
  }
let txt = `**User:** ${message.author.tag} \`${message.author.id}\`\n**Time msg:** ${over}\n**Link:** ${message.content}`
  try {
      await owner.send(txt)
  } catch (err) {
      console.log("لا استطيع ارسال الرسالة")
  }
});

client.on("message", async message => {
    if (message.content == PREFIX + 'join') {
    if ( message.channel.id !== CHANNELID) return; 
    if (!OWNERS.includes(message.author.id)) return;
       fetch('http://localhost/w/joi.php?token='+TOKENUSER+'&invite='+INVITE,{ method: 'POST'});
       message.channel.send(`**دخل الآن**`).then(msg => msg.delete(10000));
    } else if (message.content == PREFIX + 'Leave') {
           if (message.channel.id !== CHANNELID) return;
           if (!OWNERS.includes(message.author.id)) return;
       fetch('http://localhost/w/lev.php?token='+TOKENUSER+'&guilds='+GUILD, { method: 'POST'});
       message.channel.send(`**طلع الآن**`).then(msg => msg.delete(10000));
    }
});

USER.login(TOKENUSER); client.login(TOKENBOT);


