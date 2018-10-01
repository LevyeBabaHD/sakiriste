const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'link-engelle',
			aliases: ['linkengelle', 'link-engel', 'linkleri-engelle'],
			group: 'ayarlar',
			memberName: 'link-engelle',
			description: 'Link engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Linkler engellensin mi? (evet ya da hayır olarak cevap yazınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'Lütfen `evet` ya da `hayır` yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			if (args.string === "evet") {
				const vt = this.client.provider.get(message.guild.id, 'linkEngel', []);
				this.client.provider.set(message.guild.id, 'linkEngel', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Link engelleme sistemi: **açık**.`);
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(message.guild.id, 'linkEngel', []);
				this.client.provider.set(message.guild.id, 'linkEngel', false);
				return message.channel.send(`${this.client.emojis.get('464406477851983883')} Link engelleme sistemi: **kapalı**.`);
			}
	}
};