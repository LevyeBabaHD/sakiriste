const { Command } = require('discord.js-commando');

module.exports = class WhitelistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'whitelist',
			aliases: ['beyaz-liste'],
			group: 'admin',
			memberName: 'whitelist-user',
			description: 'Kara listeden kullanıcı siler.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'kimi blacklistden kurtarmak istersiniz?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(message) {
		return this.client.isOwner(message.author);
	}

	run(message, { user }) {
		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (!blacklist.includes(user.id)) return message.reply(`Bu kullanıcı kara listede değil.`);

		const index = blacklist.indexOf(user.id);
		blacklist.splice(index, 1);

		if (blacklist.length === 0) this.client.provider.remove('global', 'userBlacklist');
		else this.client.provider.set('global', 'userBlacklist', blacklist);

		return message.reply(`${user.tag} adlı kullanıcı kara listeden çıkarıldı.`);
	}
};