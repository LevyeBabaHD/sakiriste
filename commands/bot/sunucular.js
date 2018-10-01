const {Command} = require('discord.js-commando'),
  {stripIndents} = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class CheckGuildsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'sunucular',
      aliases: ['sunucu-listesi'],
      memberName: 'sunucular',
      group: 'bot',
      description: 'Botun bulunduğu sunucuları gösterir.',
    });
  }

  run (message) {

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(this.client.user.avatarURL)
    .setAuthor(`Şakir | Sunucular`, this.client.user.avatarURL)    
    .setDescription(stripIndents`
    **Botun bulunduğu sunucu listesi:**

    Bot ${this.client.guilds.size} tane sunucuda bulunuyor.
        
    ❯  ${this.client.guilds.map(m => m.name).join(` \n❯  `)}`, {split: true});
    return message.embed(embed)
  }
};