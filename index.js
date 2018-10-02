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
		['sunucu', 'Sunucu Komutları'],
		['bot', 'Bot Komutları'],
		['ayarlar', 'Ayarlar'],
		['admin', 'Admin'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

	sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});
   client.user.setActivity("şakir-help | Yardım Menüsü, { type: "WATCHING" });
      client.user.setActivity("şakir-canlı-destek | Canlı Destekden İleşişime Geçin", { type: "WATCHING" });
      client.user.setActivity("şakir-tavsiye | Tavsiyelerinize Bize Bildirin", { type: "WATCHING" });
      client.user.setActivity(`${client.guilds.size} Sunucu | ${client.users.size} Kullanıcıya Hizmet Veriyoruz`, { type: "WATCHING" });
  }, 15000);
});
client.on('ready', () => {
  client.user.setActivity("", { type: "WATCHING"});       
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.user.username} İsmi İle Giriş Yaptı`);
	
});

client.on('error', err => {
	console.log(err)
});

client.login(process.env.BOT_TOKEN);
