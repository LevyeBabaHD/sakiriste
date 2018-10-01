const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anons-kanal-ayarla',
            aliases: ['anonskanal'],
            group: 'ayarlar',
            memberName: 'anons-kanal-ayarla',
            description: 'Anons kanalı ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Hangi kanal anons kanalı olarak kullanılsın? (#kanalismi şeklinde yazınız.)',
                    type: 'channel'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

    async run(message, args) {
        
        const { channel } = args;
        message.guild.settings.set('anonsKanal', channel.id);
        return message.channel.send(`${this.client.emojis.get('464406478153973770')} Anons kanalı <#${channel.id}> kanalı olarak ayarlandı.`);
    }
};