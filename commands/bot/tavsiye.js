const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tavsiye',
            group: 'bot',
            memberName: 'tavsiye',
            description: 'Bot için tavsiye bildirirsiniz.',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Bot için ne tavsiyesi bildirmek istersiniz?',
                    type: 'string'
                }
            ]
        });
    }

async run(message, args) {

    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet linkini almak için yeterli yetkim yok.';

    message.reply(`${this.client.emojis.get('464406478153973770')} Tavsiyeniz bildirildi! Yakında öneriniz/tavsiyeniz hakkında geri dönüş yapılacaktır.`);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`» Yeni bir tavsiye!`)
    .addField(`❯ Gönderilen Tavsiye`, args.tavsiye)
    .addField(`❯ Gönderen Kullanıcı Hakkında`, `• Kullanıcı ID: ${message.author.id} \n• Kullanıcı Adı: ${message.author.tag}`)
    .addField(`❯ Gönderilen Sunucu Hakkında`, `• Sunucu ID: ${message.guild.id} \n• Sunucu Adı: ${message.guild.name}`)
    .addField(`❯ Gönderilen Sunucu`, davet)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`Şakir Bot | Tavsiye Sistemi`)
    .setTimestamp()
    this.client.channels.get(`495580208678567938`).send({embed})
    }
}