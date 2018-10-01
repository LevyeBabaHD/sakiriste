const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'oto-rol-ayarla',
			aliases: ['giriş-rol-ayarla'],
			group: 'ayarlar',
			memberName: 'oto-rol-ayarla',
			description: 'Giriş rolü ayarlamanızı/belirlemenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Hangi rol giriş rolü olarak ayarlansın? (rol ismini yazınız)\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'girisRol', []);
			const db = this.client.provider.get(message.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(message.guild.id, 'girisRolK', true);
				message.channel.send(`${this.client.emojis.get('464406477851983883')} Giriş rolü zaten **<@${args.rol.id}>** olarak ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(message.guild.id, 'girisRolK', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Giriş rolü **<@${args.rol.id}>** rolü olarak ayarlandı.`);
			}
	}
};