const commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['avatarbul'],
            group: 'kullanıcı',
            memberName: 'avatar',
            description: 'İstediğiniz kullanıcının avatarının linkini verir.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

			args: [
				{
					key: 'member',
					label: 'genel',
					prompt: 'Kimin avatarının linkini istersin?',
					type: 'member'
				}
			]
        });
    }

async run(message, args) {
    const member = args.member;
    const user = member.user;
        
  	const embed = new Discord.RichEmbed()
  	.setColor("RANDOM")
    .setImage(user.avatarURL) 
    .setFooter('Şakir | Avatar Sistemi')
    message.channel.send({embed})
    }
}