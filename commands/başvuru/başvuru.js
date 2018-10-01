const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class AnonsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'başvuru',
            aliases: ['başvuru-yap'],
            group: 'başvuru',
            memberName: 'başvuru',
            description: 'Başvuru yaparsınız.',
            examples: ['Merhaba!'],
 			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'yazi',
                    prompt: 'Yaşın kaçtır?\n',
                    type: 'string',
                },
                {
                    key: 'yazi2',
                    prompt: 'Bize kendin hakkında kısaca bilgi verir misin?\n',
                    type: 'string',
                },
                {
                    key: 'yazi3',
                    prompt: 'Herhangi bir deneyimin veya tecbüren var mı? Varsa nedir?\n',
                    type: 'string',
                },
                {
                    key: 'yazi4',
                    prompt: 'Günde aktif olabileceğin saatler?\n',
                    type: 'string',
                },
                {
                    key: 'yazi5',
                    prompt: 'Peki, neden seni diğerleri yerine işe almalıyız?\n',
                    type: 'string',
                },
            ]
        });    
    }
    
    run(message, args) {
        const kanal = message.guild.channels.get(message.guild.settings.get('başvuruKanal'));
        if (!kanal) return message.reply(`${this.client.emojis.get('459626880300220426')} Başvuru kanalını bulamıyorum.Bu yüzden başvuru sistemi devre dışıdır.\nAçmak için \`başvuru-kanal-ayarla\` komutu ile bir başvuru kanalı belirleyin.`);
    
        message.reply(`${this.client.emojis.get('464406478153973770')} Başvurunuz gönderildi, en kısa zamanda size geri dönüş yapılacaktır.`);

        var tarih = ''
			if(moment(message.author.createdAt).format('MM') === '01') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Ocak ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '02') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Şubat ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '03') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Mart ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '04') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Nisan ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '05') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Mayıs ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '06') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Haziran ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '07') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Temmuz ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '08') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Ağustos ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '09') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Eylül ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '10') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Ekim ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '11') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Kasım ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(message.author.createdAt).format('MM') === '12') {
				var tarih = `${moment(message.author.createdAt).format('DD')} Aralık ${moment(message.author.createdAt).format('YYYY HH:mm:ss')} `
            }

          const { yazi } = args;
          const { yazi2 } = args;
          const { yazi3 } = args;
          const { yazi4 } = args;
          const { yazi5 } = args;
        const embed = new RichEmbed()
        .setAuthor(`📋 ${message.author.username} Adlı kullanıcının başvurusu.`)   
        .setColor("RANDOM")
        .setDescription(``)
        .setThumbnail(message.author.avatarURL)
        .addField(`**❯ Kullanıcı:**`, `<@${message.author.id}>`)
        .addField(`**❯ Kullanıcı ID:**`,`${message.author.id}`)
        .addField(`**❯ Hesap Kuruluşu:**`, tarih)
        .addField(`**❯ Yaşın kaçtır?**`, yazi)
        .addField(`**❯ Bize kendin hakkında kısaca bilgi verir misin?**`, yazi2)
        .addField(`**❯ Herhangi bir deneyimin veya tecbüren var mı? Varsa nedir?**`, yazi3)
        .addField(`**❯ Günde aktif olabileceğin saatler?**`, yazi4)
        .addField(`**❯ Peki, neden seni diğerleri yerine işe almalıyız?**`, yazi5)
        .setFooter(`Başvuru Formu`)
        .setTimestamp()
        return kanal.send(embed);
    }
};