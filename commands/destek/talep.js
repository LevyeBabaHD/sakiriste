const commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'talep',
            group: 'destek',
            memberName: 'talep',
            description: 'Sunucunuzda destek talebi açar.',
});
}
     
run(message) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Destek Ekibi")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' rolünü bulamadım.Talep odası açabilmem için **Destek Ekibi** isminde bir rol oluşturup talep odalarını görebilecek kişilere yani yetkililere veriniz.`);
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.channel.send(`Zaten açık durumda bir talebin var.`);
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Destek Ekibi");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`Destek talebi oluşturuldu, <#${c.id}> burada yetkililer size yardımcı olacaktır.`).then(message => message.delete());
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`Merhaba ${message.author.username}!`, ` Yetkililerimiz burada sizinle ilgilenecektir. \nDestek talebini kapatmak için \`>kapat\` yazabilirsiniz.
        `)
        .setFooter(`Şakir | Destek Talebi Sistemi`, this.client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
        c.send(`<@${message.author.id}> Adlı kullanıcı destek talebi açtı! @everyone`)
        message.delete();
    }).catch(console.error);
}}

