const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');

const ayarlar = require('./data/ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.prefix,
    unknownCommandResponse: false,
    owner: ayarlar.sahip
    disableEveryone: false
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
	client.on('ready', () => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`),
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.user.username} ismi ile giriş yaptı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.guilds.size} Sunucu | ${client.users.size} Kullanıcıya hizmet veriyoruz.`)
  client.user.setStatus('dnd')
  client.setInterval(() => {
      client.user.setActivity("şakir-help | Yardım Menüsü", { type: "WATCHING" });
      client.user.setActivity("şakir-tavsiye şakir-canlı-destek | Tavsiyelerinizi Bildirin CanlıDestekden İletişime Geçin", { type: "WATCHING" });
      client.user.setActivity(`${client.guilds.size} Sunucu | ${client.users.size} Kullanıcı`, { type: "WATCHING" });
  }, 15000);
});

client.on('error', err => {
	console.log(err)
});

client.login(process.env.BOT_TOKEN);
