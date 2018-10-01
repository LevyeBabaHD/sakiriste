const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hata-bildir',
            group: 'bot',
            memberName: 'hata-bildir',
            description: 'Bottaki bir hatayı bildirirsiniz.',
            args: [
                {
                    key: 'hata',
                    prompt: 'Bildirmek istediğiniz hatayı yazınız.',
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

    message.reply(`${this.client.emojis.get('464406478153973770')} Hata Bildirildi! Yakında incelenecektir!`);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`» Bende bir hata bulmuşlar!`)
    .addField(`❯ Bildirilen Hata/Sorun`, args.hata)
    .addField(`❯ Bildiren Kullanıcı Hakkında`, `• Kullanıcı ID: ${message.author.id} \n• Kullanıcı Adı: ${message.author.tag}`)
    .addField(`❯ Bildirilen Sunucu Hakkında`, `• Sunucu ID: ${message.guild.id} \n• Sunucu Adı: ${message.guild.name}`)
    .addField(`❯ Bildirilen Sunucu`, davet)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    this.client.channels.get(`436862793132802068`).send({embed})
    }
}