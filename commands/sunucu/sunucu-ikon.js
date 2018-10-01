const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sunucu-ikon',
            group: 'sunucu',
            memberName: 'sunucu-ikon',
            description: 'Sunucunun ikonunu gösterir.',
        });    
    }

    run(msg) {

            const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(msg.guild.iconURL)
            .setAuthor(msg.guild.name + 'Sunucusu İkonu')
            return msg.embed(embed)
        }
};