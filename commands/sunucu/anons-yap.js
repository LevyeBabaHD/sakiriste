const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AnonsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anons-yap',
            aliases: ['duyuru-yap'],
            group: 'sunucu',
            memberName: 'anons-yap',
            description: 'Anons/duyuru yaparsınız.',
            examples: ['Merhaba!'],
 			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'baslik',
                    prompt: 'Anonsun/duyurunun başlığının ne olmasını istersiniz?',
                    type: 'string'
                },
                {
                    key: 'yazi',
                    prompt: 'Anonsta/duyuruda ne yazmasını istersiniz?',
                    type: 'string'
                },
            ]
        });    
    }
    
    hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }
    
    run(msg, args) {
        const kanal = msg.guild.channels.get(msg.guild.settings.get('anonsKanal'));
        if (!kanal) return msg.reply(`${this.client.emojis.get('464406477851983883')} Anons kanalını bulamıyorum. Lütfen \`anons-kanal-ayarla\` komutu ile bir anons kanalı belirleyin.`);
    
          msg.reply(`${this.client.emojis.get('464406478153973770')} İşlem Başarılı!`);
    
          const { baslik, yazi } = args;
       kanal.send('@everyone').then(msg => msg.delete());
        const embed = new RichEmbed()
        .setAuthor(baslik)   
        .setDescription(yazi)
        .setFooter(`Better Bot | Anons/Duyuru Sistemi`)
        .setTimestamp()
        .setColor("RANDOM")
        return kanal.send(embed);
    
    }
};