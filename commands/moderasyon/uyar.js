const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationWarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'uyar',
			aliases: ['uyarı', 'sunucuda uyar', 'uyarıat', 'uyarı ver'],
			group: 'moderasyon',
			memberName: 'uyar',
			description: 'İstediğiniz kişiye uyarı verir.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi uyarmak istersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden bu kişiyi uyarmak istiyorsun?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_MESSAGES");
    }

	async run(msg, args) {
		let guild = msg.guild
		const member = args.member;
		const user = member.user;
		const reason = args.sebep;
		const kasa = this.client.provider.get(msg.guild.id, 'modKasa', []);
		const eskikasano = Number(kasa);
		const kasano = parseInt(eskikasano) + 1;
		this.client.provider.set(msg.guild.id, 'modKasa', kasano);
		const vt = this.client.provider.get(msg.guild.id, 'modLog', []);
		const db = this.client.provider.get(msg.guild.id, 'modLogK', []);
		if (db ==! "evet") return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Lütfen \`mod-log-ayarla\` komutu ile mod-log kanalı belirleyiniz.`);
		let modlog = vt;
		if (!modlog) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log olarak belirlediğiniz kanal silinmiş, lütfen yeni  bir mod-log kanalı açıp \`mod-log-ayarla\` komutu ile mod-log olarak ayarlayınız.`);
		if (user.id === msg.author.id) return msg.say(`${this.client.emojis.get('464406477851983883')} Kendini uyaramazsın.`)
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say(`${this.client.emojis.get('464406477851983883')} Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}
		if (!msg.guild.member(user).kickable) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu kişiyi uyaramıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Eylem:`, `Uyarma`, false)
		.addField(`❯ Kullanıcı:`, `${user.tag} (${user.id})`, false)
		.addField(`❯ Yetkili:`, `${msg.author.tag} (${msg.author.id})`, false)
		.addField(`❯ Sebep`, reason, false)
		.setFooter(`Şakir | Kasa: ${kasano}`, this.client.user.avatarURL)
		.setThumbnail(user.avatarURL)
		.setTimestamp()
		guild.channels.get(modlog).send({embed});
		return msg.channel.send(`${this.client.emojis.get('464406478153973770')} İşlem başarılı!`);
	}
};