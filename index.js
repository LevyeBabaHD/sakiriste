const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando'),
    path = require('path'),
    sqlite = require('sqlite'),
	  oneLine = require('common-tags').oneLine,
      moment = require('moment'),
      dbaapi = require('discord-bots-api'),
      winston = require('winston'),
	  request = require('request'),
	  snekfetch = require('snekfetch'),
	  { MongoClient } = require('mongodb'),
	  MongoDBProvider = require('commando-provider-mongo'),
	  Jimp = require('jimp'),
      Discord = require('discord.js'),
      fs = require('fs'),
    { RichEmbed } = require('discord.js');
let afkUsers = require('./bin/afk.json');

const ayarlar = require('./data/ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
    disableEveryone: true
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type !== 'text') return;
  if (message.content.startsWith(message.guild.commandPrefix)) return;

  if (afkUsers[message.author.id]) {
    if (afkUsers[message.author.id].afk === true) {
      const afk2 = new RichEmbed()
      .setColor("#36393E")
      .setDescription(`<@${message.author.id}> Adlı kullanıcı AFK modundan çıktı! Tekrar hoş geldin!`)
      message.channel.send(afk2)
      afkUsers[message.author.id].afk = false;
    }
  }

  if (message.mentions) {
    message.mentions.users.map((user) => {
      if (afkUsers[user.id]) {
        if (afkUsers[user.id].afk === true) {
          const afk = new RichEmbed()
          .setColor("#36393E")
          .setDescription(`<@${message.author.id}>, <@${user.id}> Adlı kullanıcı **${JSON.stringify(afkUsers[user.id].status.msg)}** sebebi ile AFK!`)
          message.channel.send(afk);
        }
      }
    })
  }
})

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCkT_L10rO_NixDHNjoAixUu45TVt0ES-s');
const queue = new Map();

var servers = {};
var prefix = 'şakir-';
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
	var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "oynat":
    var voiceChannel = message.member.voiceChannel;
    const voiceChannelAdd = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Hata`)
    .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`)
		if (!voiceChannel) return message.channel.send(voiceChannelAdd);
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
      const warningErr = new RichEmbed()
      .setColor("#36393E")
      .setTitle(`Hata`)
      .setDescription(`Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`)
			return message.channel.send(warningErr);
		}
		if (!permissions.has('SPEAK')) {
      const musicErr = new RichEmbed()
      .setColor("#36393E")
      .setTitle(`Hata`)
      .setDescription(`Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`)
			return message.channel.send(musicErr);
		}
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      const PlayingListAdd = new RichEmbed()
      .setColor("#36393E")
      .setTitle(`Oynatma Listesi:`)
      .setDescription(`**${playlist.title}** İsimli şarkı oynatma listesine Eklendi.`)
			return message.channel.send(PlayingListAdd);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
          var index = 0;
          const embed = new RichEmbed()
          .setColor("#36393E")
          .setTitle(`Şarkı Seçimi`)
          .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')} \n**Lütfen hangi şarkıyı seçmek istiyorsan \`1\` ile \`10\` arası bir sayı yaz.**`)
          .setFooter(`Şarkı seçimi \`10\` saniye içinde iptal edilecektir.`)
					message.channel.send({embed});
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
            console.error(err);
            const NoNumber = new RichEmbed()
            .setColor("#36393E")
            .setTitle(`Hata`)
            .setDescription(`Şarkı seçimi iptal edildi.`) 
						return message.channel.send(NoNumber);
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
          console.error(err);
          const songNope = new RichEmbed()
          .setColor("#36393E")
          .setTitle(`Hata`)
          .setDescription(`Aradığınız isimde bir şarkı bulamadım.`) 
					return message.channel.send(songNope);
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
        break;
      case "geç":
      const err0 = new RichEmbed()
      .setColor("#36393E")
      .setTitle(`Hata`)
      .setDescription(`Bir sesli kanalda değilsin.`) 
    if (!message.member.voiceChannel) return message.channel.send(err0);
    const err05 = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
		if (!serverQueue) return message.channel.send(err05);
    const songSkip = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Şarkı Geçildi`)
    .setDescription(`Şarkı başarıyla geçildi.`)
    serverQueue.connection.dispatcher.end(songSkip);
		return undefined;
break;
      case "dur":
    const err1 = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Hata`)
    .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(err1);
    const err2 = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
		if (!serverQueue) return message.channel.send(err2);
		serverQueue.songs = [];
    const songEnd = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Şarkı Kapatıldı`)
    .setDescription(`Şarkı başarıyla kapatıldı.`)
    serverQueue.connection.dispatcher.end(songEnd); 
		return undefined;
break;
      case "ses":
      const asd1 = new RichEmbed()
      .setColor("#36393E")
      .setTitle(`Hata`)
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(asd1);
    const asd2 = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(asd2);
    const volumeLevel = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Ses Seviyesi`)
    .setDescription(`Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    if (!args[1]) return message.channel.send(volumeLevel);
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    const volumeLevelEdit = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Ses Seviyesi`)
    .setDescription(`Yeni Ses Seviyesi: **${args[1]}**`)
    return message.channel.send(volumeLevelEdit);
break;
      case "şarkı-listesi":
    if (!serverQueue) return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
    const songList10 = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Şarkı Listesi`)
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} \n\n**Şuanda Çalınan Şarkı:** ${serverQueue.songs[0].title}`)
    return message.channel.send(songList10);
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Ses kanalına giremedim HATA: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
    if (playlist) return undefined;

    const songListBed = new RichEmbed()
    .setColor("#36393E")
    .setTitle(`Şarkı Listesine Eklendi`)
    .setDescription(`Şarkı listesine **${song.title}** adlı şarkı eklendi.`)
		return message.channel.send(songListBed);
	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
  }
  console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı.');
      else message.channel.send(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  const playingBed = new RichEmbed()
  .setColor("#36393E")
  .setTitle(`Şarkı Çalınıyor...`)
  .setDescription(`Çalınan Şarkı: **${song.title}**`)
	serverQueue.textChannel.send(playingBed);
}
});


client.on('guildCreate', async guild => {
  var guildhook = new Discord.WebhookClient("467634292303069184", "nkZvJGrVhu7VRvWVvcB5_1hVE4CnNu0uXSp3pIiWqDI2KA09DenEEx-Nuc5leBDRzBPp")
  const eklendim = new RichEmbed()
  .setColor("#36393E")
  .setThumbnail(guild.iconURL)
  .setAuthor(`Bir Sunucuya Eklendim!`)
  .addField(`Sunucu Adı:`, `${guild.name}`)
  .addField(`Sunucu ID:`, `${guild.id}`)
  .addField(`Sunucu Sahibi:`, `${guild.owner}`)
  .addField(`Sunucu Sahibi ID:`, `${guild.ownerID}`)
  guildhook.send(eklendim)

  logger.log(`data`, `${guild.name} sunucusuna eklendim!`);
})

.on('guildDelete', async guild => {
  var guildhook = new Discord.WebhookClient("467634292303069184", "nkZvJGrVhu7VRvWVvcB5_1hVE4CnNu0uXSp3pIiWqDI2KA09DenEEx-Nuc5leBDRzBPp")
  const atildim = new RichEmbed()
  .setColor("#36393E")
  .setThumbnail(guild.iconURL)
  .setAuthor(`Bir Sunucudan Atıldım!`)
  .addField(`Sunucu Adı:`, `${guild.name}`)
  .addField(`Sunucu ID:`, `${guild.id}`)
  .addField(`Sunucu Sahibi:`, `${guild.owner}`)
  .addField(`Sunucu Sahibi ID:`, `${guild.ownerID}`)
  guildhook.send(atildim)

  logger.log(`data`, `${guild.name} sunucusundan atıldım!`);		
})

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
  msg.react('😡');
  msg.reply('**Sen botun kara listesindesin bu yüzden komutlarımı kullanamazsın.**')
	return true;
});

client.on("guildMemberAdd", async member => {
  const veri = client.provider.get(member.guild.id, "girisCikisK", []);
  if (veri ==! true) return;
  if (veri === true) {
    const kanalveri = client.provider.get(member.guild.id, "girisCikis", []);
    let username = member.user.username;
    if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
    if (member.guild.channels.get(kanalveri).type === "text") {
      let randname = await randomString(16, 'aA');
      const bg = await Jimp.read("./guildAdd.png");
      const userimg = await Jimp.read(member.user.avatarURL);
      var font;
      if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
      else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
      else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
      await bg.print(font, 430, 170, member.user.tag);
      await userimg.resize(362, 362);
      await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
        setTimeout(function () {
          member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
        }, 1000);
        setTimeout(function () {
        fs.unlink("./img/" + randname + ".png");
        }, 10000);
    }
  }
})

client.on("guildMemberRemove", async member => {
const veri = client.provider.get(member.guild.id, "girisCikisK", []);
if (veri ==! true) return;
if (veri === true) {
  const kanalveri = client.provider.get(member.guild.id, "girisCikis", []);
  let username = member.user.username;
  if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
  if (member.guild.channels.get(kanalveri).type === "text") {
    let randname = await randomString(16, 'aA');
    const bg = await Jimp.read("./guildRemove.png");
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 430, 170, member.user.tag);
    await userimg.resize(362, 362);
    await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
      setTimeout(function () {
        member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
      }, 1000);
      setTimeout(function () {
      fs.unlink("./img/" + randname + ".png");
      }, 10000);
  }
}
})

  client.on('guildMemberAdd', member => {
    const hgK = client.provider.get(member.guild.id, 'girisCikis', []);
    if (!hgK) return;
    if (member.guild.channels.get(hgK) === undefined || member.guild.channels.get(hgK) === null) return;
    if (member.guild.channels.get(hgK).type === "text") {
   member.guild.channels.get(hgK).send(`📥 ● <@${member.user.id}> Adlı kullanıcı Sunucu'ya katıldı!`);
      }
    } 
  );
  
  client.on('guildMemberRemove', member => {
    const hgK = client.provider.get(member.guild.id, 'girisCikis', []);
    if (!hgK) return;
    if (member.guild.channels.get(hgK) === undefined || member.guild.channels.get(hgK) === null) return;
    if (member.guild.channels.get(hgK).type === "text") {
   member.guild.channels.get(hgK).send(`📤 ● <@${member.user.id}> Adlı kullanıcı Sunucu'dan ayrıldı!`);
      }
    } 
  );
  
  client.on('guildMemberAdd', async member => {
    const veri = client.provider.get(member.guild.id, 'girisRolK', []);
    if (veri ==! true) return;
    if (veri === true) {
      const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
      if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
      member.addRole(girisrolveri);
    }
  })
  
  client.on('message', msg => {
    if (!msg.guild) return;
    const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
    if (veri !== true) return;
    if (veri === true) {
    const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
    if (swearWords.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        return;
      }
    }
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (regex.test(msg.content)==true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        
        return msg.reply('Bu sunucuda linkler **Şakir Bot** tarafından engellenmektedir.Link atmana izin vermeyeceğim!').then(msg => msg.delete(3000));
      } else {
        return;
      };
    } else {
      return;
    };
    };
  })

  client.on('guildMemberAdd', async member => {
      if (!member.guild) return;
      const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
      if (member.guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setTitle('Sunucuya katıldı!')
        .setDescription(`<@${member.user.id}> Adlı kullanıcı Sunucu'ya katıldı!`)
        .setFooter(`Katılan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp()
        member.guild.channels.get(logCh).send({embed});
      }
    })
    
    .on('guildMemberRemove', async member => {
      if (!member.guild) return;
      const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
      if (member.guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setTitle('Sunucudan ayrıldı;')
        .setDescription(`<@${member.user.id}> Adlı kullanıcı Sunucu'dan ayrıldı!`)
        .setFooter(`Ayrılan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp()
        member.guild.channels.get(logCh).send({embed});
      }
    })
    
    .on('guildBanAdd', async (guild, member) => {
      if (!guild) return;
      const enabled = client.provider.get(guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
      if (guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setTitle('Üye yasaklandı.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> adlı kullanıcı yasaklandı!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Yasaklanan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();
        guild.channels.get(logCh).send({embed});
  
      }
    })
    
    .on('guildBanRemove', async (guild, member) => {
      if (!guild) return;
      const enabled = client.provider.get(guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
      if (guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setTitle('Üyenin yasaklaması kaldırıldı.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> adlı kullanıcının yasaklanması kaldırıldı!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Yasaklanması Kaldırılan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();
        guild.channels.get(logCh).send({embed});
      }
    })
    
    .on('messageDelete', async msg => {
      if (!msg.guild) return;
      const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
      if (msg.guild.channels.get(logCh).type === "text") {
        if (msg.author.bot) return;
        var embed = new Discord.RichEmbed()
        .setTitle(`Mesaj silindi.`)
        .setColor("#36393E")
        .setDescription(`<#${msg.channel.id}> kanalında <@${msg.author.id}> tarafından gönderilen bir mesaj silindi. \nSilinen Mesaj: \n\`\`\`\n"${msg.content}"\n\`\`\``)
        .setFooter(`Silinen Mesaj ID: ${msg.id} | Mesajı Silen Kullanıcı ID: ${msg.author.id}`)
        msg.guild.channels.get(logCh).send({embed});
      }
    })
    
    .on('channelCreate', async channel => {
      if (!channel.guild) return;
      const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
      if (channel.guild.channels.get(logCh).type === "text") {
        if (channel.type === "text") {
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal oluşturuldu.`)
          .setDescription(`<@${msg.author.id}> tarafından <#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id} | Oluşturan Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        };
        if (channel.type === "voice") {
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal Oluşturuldu.`)
          .setDescription(`<@${msg.author.id}> tarafından ${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id} | Oluşturan Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        }
      }
    })
      
    .on('channelDelete', async channel => {
      if (!channel.guild) return;
      const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
      if (channel.guild.channels.get(logCh).type === "text") {
        if (channel.type === "text") {
          let embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal Silindi.`)
          .setDescription(`<@${msg.author.id}> tarafından <#${channel.id}> kanalı silindi. _(metin kanalı)_`)
          .setFooter(`Silinen Kanal ID: ${channel.id} | Silen Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        };
        if (channel.type === "voice") {
          let embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal Silindi.`)
          .setDescription(`<@${msg.author.id}> tarafından ${channel.name} kanalı silindi. _(sesli kanal)_`)
          .setFooter(`Silinen Kanal ID: ${channel.id} | Silen Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        }
      }
    })
  
    .on('messageUpdate', async (oldMsg, newMsg) => {
      if (!oldMsg.guild) return;
      if (oldMsg.author.bot) return;
      const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
      if (oldMsg.guild.channels.get(logCh).type === "text") {
          const embed = new RichEmbed()
          .setColor("#36393E")
          .setTitle('Mesaj Düzenlendi.')
          .setDescription(`<@${oldMsg.author.id}> adlı kullanıcı <#${oldMsg.channel.id}> kanalına gönderdiği mesajı düzenledi.`)
          .addField(`Eski Mesaj`, `\`\`\`\n${oldMsg.content}\n\`\`\``)
          .addField(`Yeni Mesaj`, `\`\`\`\n${newMsg.content}\n\`\`\``)
        oldMsg.guild.channels.get(logCh).send({embed});
      }
    }
  );
  
 
  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'sa') {
      msg.reply ('**Aleykümselam Yeğenim**')
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'sea') {
      msg.reply ('**Aleykümselam Yeğenim**')
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'slm') {
      msg.reply ('**Aleykümselam Yeğenim**')
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'selam') {
      msg.reply ('**Aleykümselam Yeğenim**')
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'Selamünaleyküm') {
      msg.reply ('**Aleykümselam Yeğenim**')
    }
  });

  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'Selamün Aleyküm') {
      msg.reply ('**Aleykümselam Yeğenim**')
    }
  });

  client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['bot', 'Bot Komutları'],
    ['kullanıcı', 'Kullanıcı Komutları'],
	  ['eğlence', 'Eğlence Komutları'],
    ['başvuru', 'Başvuru Sistemi'],
    ['sunucu', 'Sunucu Komutları'],
    ['moderasyon', 'Moderasyon Komutları'],
    ['ayarlar', 'Ayarlar'],
    ['genel', 'Genel Komutlar'],
    ['admin', 'Bot Sahibi Komutları'],
    ['destek', 'Destek'],
    ['minecraft', 'Minecraft Komutları'],

  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

  sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
	  client.setProvider(new SQLiteProvider(db));
  });

client.on('ready', () => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`),
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.user.username} ismi ile giriş yaptı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.guilds.size} Sunucu | ${client.users.size} Kullanıcıya hizmet veriyor.`)
  client.user.setStatus('dnd')
  client.setInterval(() => {
      client.user.setActivity("şakir-help | Yardım Menüsü ", { type: "WATCHING" });
      client.user.setActivity("şakir-canlı-destek | Bizimle Canlı Destekden İletişime Geçin", { type: "WATCHING" });
      client.user.setActivity("şakir-tavsiye | Tavsiyelerinizi Bize Bildirin", { type: "WATCHING" });
      client.user.setActivity("Herkese Çay | Şakire Yok", { type: "WATCHING" });
      client.user.setActivity("Şakir Tekrardan  | Aktif", { type: "WATCHING" });
      client.user.setActivity(`${client.guilds.size} Sunucu | ${client.users.size} Kullanıcı`, { type: "WATCHING" });
  }, 15000);
});

client.on('error', err => {
	console.log(err)
});

client.login(ayarlar.TOKEN);

async function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}