const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ScanPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reklam-taraması',
            group: 'moderasyon',
            aliases: ['reklam-taraması'],
            memberName: 'reklam-taraması',
            description: 'Oynuyor mesajlarındaki reklamları arar.',
            examples: ['reklam-taraması'],
            guildOnly: true,
        })
    }

    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

    run(msg) {
        const members = msg.guild.members.filter(member => member.user.presence.game && /(discord.gg|discord.me|discordapp.com|discord.io|discord.tk)/g.test(member.user.presence.game.name));
        const embed = new Discord.RichEmbed()
            embed.setDescription(members.map(member => `${member}`).join("\n") || "Kimsenin oynuyor mesajı reklam içermiyor.")
            embed.setColor("RANDOM")
            embed.setTimestamp()
            embed.setFooter(`${this.client.user.username} Reklam Tarama Sistemi`)
        msg.channel.send({embed})

    }
}