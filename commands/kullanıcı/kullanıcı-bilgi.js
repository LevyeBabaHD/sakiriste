const stripIndents = require('common-tags').stripIndents;
const moment = require('moment')
const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'kullanıcı-bilgi',
			aliases: ['kullanıcı'],
			group: 'kullanıcı',
			memberName: 'kullanıcı-bilgi',
			description: 'İstediğiniz bir kişi hakkında bilgi verir.',
			guildOnly: true,

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimin hakkında bilgi almak istersin?',
					type: 'member',
				}
			]
		});
	}

	run(message, args) {		
		const member = args.member;
		const user = member.user;
			const Durum = user.presence.status;
			const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
			const durm = (Durum == "online" ? (this.client.emojis.get('466955711910248458') + "Çevrimiçi") : (Durum == "offline" ? (this.client.emojis.get('466955726145847326') + "Çevrimdışı") : (Durum == "idle" ? (this.client.emojis.get('466955712887783424') + "Boşta") : (Durum == "dnd" ? (this.client.emojis.get('466955726674460673') + "Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))

			var tarih = ''
			if(moment(user.createdAt).format('MM') === '01') {
				var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '02') {
				var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '03') {
				var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '04') {
				var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '05') {
				var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '06') {
				var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '07') {
				var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '08') {
				var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '09') {
				var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '10') {
				var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '11') {
				var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '12') {
				var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			
				    const embed = new Discord.RichEmbed()
					.setColor(Durm)
					.setAuthor(user.username, user.avatarUR)
					.addField(`❯ İsmi:`, `${user.tag}`)
					.addField(`❯ ID:`, `${user.id}`)
					.addField(`❯ Kayıt tarihi:`, tarih)
					.addField(`❯ Durumu:`, `${durm}`)
					.addField(`❯ Şu an oynadığı oyun:`, `${user.presence.game ? user.presence.game.name : 'Şu anda oyun oynamıyor.'}`)
					.addField(`❯ Bot mu?`, `${user.bot ? '\nEvet' : 'Hayır'}`)
					.addField(`❯ Rolleri:`, `<@&${member.roles.map(roles => `${roles.id}`).join('>, <@&')}>`)
					.setThumbnail(user.avatarURL)
					message.channel.send({embed});
	}
};