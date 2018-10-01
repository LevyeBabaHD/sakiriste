const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mod-log-ayarla',
			aliases: ['modlogayarla', 'modlog', 'mod-log'],
			group: 'ayarlar',
			memberName: 'mod-log-ayarla',
			description: 'Mod-log kanalını değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'mod-log kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
		var ch = await args.channel;
		if (ch.type == 'voice') return message.reply('Sesli kanallar seçilemez!');
			const vt = this.client.provider.get(message.guild.id, 'modLog', []);
			const db = this.client.provider.get(message.guild.id, 'modLogK', []);
			if (vt === args.channel.id) {
				this.client.provider.set(message.guild.id, 'modLogK', true);
				message.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'modLog', args.channel.id);
				this.client.provider.set(message.guild.id, 'modLogK', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Mod-log kanalı **<#${args.channel.id}>** kanalı olarak ayarlandı.`);
			}
	}
};