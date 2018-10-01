const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class mesajCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mesaj',
            group: 'bot',
            memberName: 'mesaj',
            description: `Bot sahibine (Levye"ye) mesaj gönderir.`,
            args: [
                {
                    key: 'mesaj',
                    prompt: 'Sahibime iletmek istediğiniz mesajı yazınız.',
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

    message.reply(`${this.client.emojis.get('464406478153973770')} Mesajınız sahibime iletildi!`);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.author.tag} adlı kullanıcının mesajı`)
    .addField(`❯ Kulanıcı Hakkında`, `Kullanıcı İsim: ${message.author.tag} \nKullanıcı ID: ${message.author.id}`)
    .addField(`❯ Sunucu Hakkında`, `Sunucu Adı: ${message.guild.name} \nSunucu ID: ${message.guild.id}`)
    .addField(`❯ Mesaj`, args.mesaj)
    .addField(`❯ Gönderilen Sunucu`, davet)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    this.client.users.get(`436862793132802068`).send(embed);
}
}