const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
let afkUsers = require('../../bin/afk.json');
const { RichEmbed } = require('discord.js')

module.exports = class AFKCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'afk',
            group: 'kullanıcı',
			memberName: 'afk',
			description: 'AFK moduna geçersiniz.(Sizi birisi etiketlediğinde AFK olduğunuzu söyler.)',

			args: [
				{
				key: 'msg',
				label: 'message',
				prompt: 'Neden AFK olmak istiyorsun?',
				type: 'string',
			}
		],
		})
	}

	async run(message, args) {
		if (afkUsers[message.author.id]) {
			afkUsers[message.author.id].afk = true;
			afkUsers[message.author.id].status = args;
			afkUsers[message.author.id].id = message.author.id;
			const embed = new RichEmbed()
			.setColor("RANDOM")
			.setDescription(`<@${message.author.id}>, Adlı kullanıcı artık **${JSON.stringify(afkUsers[message.author.id].status.msg)}** sebebi ile AFK!`)
			message.channel.send(embed)
		} else {	
		    afkUsers[message.author.id] = {
				'afk': false,
				'status': 'Online'
			};

			message.reply(`Bu komutu ilk kullanımda çalıştıramazsınız. Lütfen komutu tekrar kullanınız.`)
		}
	}
};