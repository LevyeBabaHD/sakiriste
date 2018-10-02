onst { CommandoClient, SQLiteProvider } = require('discord.js-commando');
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');

const ayarlar = require('./data/ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
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
	});

client.on('ready', () => {
  client.user.setActivity("şakir-help İle Bütün Komutlara Erişim Sağlayabilirsiniz", { type: "WATCHING"});       
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
});

client.on('error', err => {
	console.log(err)
});

client.login(process.env.BOT_TOKEN);
