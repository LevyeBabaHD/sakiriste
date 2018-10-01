const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist',
			aliases: ['kara-liste'],
			group: 'admin',
			memberName: 'blacklist-user',
			description: 'Kullanıcıyı bottan banlamanızı sağlar.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'Kim blackliste alınsın?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(message) {
		return this.client.isOwner(message.author);
	}

	run(message, { user }) {
		if (this.client.isOwner(user.id)) return message.reply(`Bot sahibi kara lsiteye alınamaz.`);

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return message.reply(`Bu kişi zaten kara listede bulunuyor.`);

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);

		return message.reply(`${user.tag} kara listeye alındı.`);
	}
};