const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationMuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'konuştur',
			aliases: ['konuşturaç', 'sunucuda konuştur', 'unmute', 'unmuteat', 'susturaç'],
			group: 'moderasyon',
			memberName: 'konuştur',
			description: 'İstediğiniz kişiyi konuşturur.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi konuşturmak istersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden bu kişiyi konuşturmak istiyorsun?',
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
		const mL = this.client.provider.get(msg.guild.id, 'muteList', []);
		if (db ==! "evet") return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Lütfen \`mod-log-ayarla\` komutu ile mod-log kanalı belirleyiniz.`);
		let modlog = vt;
		if (!modlog) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log olarak belirlediğiniz kanal silinmiş, lütfen yeni  bir mod-log kanalı açıp \`mod-log-ayarla\` komutu ile mod-log olarak ayarlayınız.`);
		if (!msg.guild.member(user).kickable) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu kişinin susturmasını kaldıramıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
		if (!mL.includes(user.id)) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu kişi susturulmamış.`);
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say(`${this.client.emojis.get('464406477851983883')} Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}
		
		const index = mL.indexOf(user.id);
		mL.splice(index, 1);

		if (mL.length === 0) this.client.provider.remove(msg.guild.id, 'muteList');
		else this.client.provider.set(msg.guild.id, 'muteList', mL);

		msg.channel.overwritePermissions(user.id, {
			SEND_MESSAGES: true
		});

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Eylem:`, `Sustur kaldırma/konuşturma`)
		.addField(`❯ Kullanıcı:`, `${user.tag} (${user.id})`)
		.addField(`❯ Yetkili:`, `${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Sebep`, reason)
		.setThumbnail(user.avatarURL)
		.setTimestamp()
		.setFooter(`Şakir | Kasa: ${kasano}`, this.client.user.avatarURL)
		guild.channels.get(modlog).send({embed});
		return msg.channel.send(`${this.client.emojis.get('464406478153973770')} İşlem başarılı!`);
	}
};