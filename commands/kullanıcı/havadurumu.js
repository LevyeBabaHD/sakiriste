const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const hd = require("weather-js");
const snekfetch = require("snekfetch");

module.exports = class WeatherCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'havadurumu',
			group: 'kullanıcı',
			memberName: 'havadurumu',
			description: 'Yazılan konumun hava durumunu gösterir.',
			examples: ['havadurumu'],
			guildOnly: true,
			guarded: true,
		args: [
				{
					key: 'hava',
					label: 'konum',
					prompt: 'Hava durumunu görmek istediğiniz konumu yazınız.',
					type: 'string'
				}
			]
		});
	}

	async run(message, args) {
		const client = this.client
		hd.find({search: args.hava, degreeType: 'C'}, function(err, result) {
			var current = result[0].current;
			var location = result[0].location;

			const embed = new RichEmbed()
				embed.setThumbnail(current.imageUrl)
				embed.setAuthor(`${current.observationpoint} | Hava Durumu Bilgisi`, 'https://i.imgur.com/MygJlMV.png', 'https://www.msn.com/tr-tr/weather/')
				embed.addField(`» Durum:`, current.skytext, false)
				embed.addField(`» Zaman Dilimi:`, `UTC${location.timezone}`, false)
				embed.addField(`» Ölçüm Birimi:`, `°${location.degreetype}`, false)
				embed.addField(`» Sıcaklık:`, `${current.temperature} °${location.degreetype}`, false)
				embed.addField(`» Hissedilen Sıcaklık:`, `${current.feelslike} °${location.degreetype}`, false)
				embed.addField(`» Rüzgar Durumu:`, current.winddisplay, false)
				embed.addField(`» Nem Oranı:`, `%${current.humidity}`, false)
				embed.setColor("RANDOM")
				embed.setTimestamp()
				embed.setFooter(`${client.user.username} | Hava Durumu Sistemi`)
			message.embed(embed)
		})
	}
};