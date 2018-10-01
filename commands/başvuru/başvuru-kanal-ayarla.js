const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'başvuru-kanal-ayarla',
            aliases: ['başvurukanal'],
            group: 'başvuru',
            memberName: 'başvuru-kanal-ayarla',
            description: 'Başvuruların gönderileceği kanalı ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Hangi kanal başvuru kanalı olarak kullanılsın?\n',
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
        const { channel } = args;
        message.guild.settings.set('başvuruKanal', channel.id);
        return message.channel.send(`${this.client.emojis.get('464406478153973770')} Başvuru formlarının gönderileceği kanal <#${channel.id}> kanalı olarak ayarlandı.`);
    }
};