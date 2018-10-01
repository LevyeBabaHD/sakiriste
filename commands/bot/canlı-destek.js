const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');

module.exports = class SupportCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'canlı-destek',
      group: 'bot',
      memberName: 'canlı-destek',
      description: 'Şakir Bot Destek Ekibi ile görüşmeye bağlanırsınız.',
      details: oneLine `
               Şakir Bot ile ilgili yardıma ihtiyacınız var mı?
               Geliştiricilerle iletişime geçmek ve ihtiyacınız olan yardımı almak için bu komutu kullanın!
			`,
      examples: ['canlı-destek'],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message) {
    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet linkini almak için yeterli yetkim yok.';
    let isEnabled
    const client = this.client
    message.reply(`Şakir Bot Desteği ile iletişim kurduğunuz için teşekkür ederiz! Herhangi bir destek yetkilisi varsa, yakında sizinle iletişim kuracaktır.`)
    let chan = message.channel
    let supportChan = '495580732237021194'
    const embed = new RichEmbed()
      .setTitle(':bangbang: **Yeni Destek Çağrısı** :bangbang:')
      .setColor("RANDOM")
      .setDescription(`**Sunucu Adı:** ${message.guild.name} (${message.guild.id}) \n**Kanal:** #${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id}) \n**Destek İstenen Sunucu:** ` + davet)
      .setFooter('Şakir Bot canlı-destek sistemi')
      .setTimestamp()
		this.client.channels.get(supportChan).send('<@&464840738568404994>')
		this.client.channels.get(supportChan).send({ embed })
    const collector = this.client.channels.get(supportChan).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    this.client.channels.get(supportChan).send('Destek çağrısına bağlanmak için `katıl` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply(`Çağrı zaman aşımına uğradı.`)
      if (reason === 'aborted') {
        message.reply(':x: Çağrı reddedildi.')
        this.client.channels.get(supportChan).send(`Başarıyla çağrı reddedildi.`)
      }
      if (reason === 'success') {
        this.client.channels.get(supportChan).send(`Destek çağrısı alındı!`)
        //eslint-disable-next-line no-useless-escape
        this.client.channels.get(supportChan).send('Destek çağrısını kapatmak için `kapat` yazınız.')
        chan.send(`${message.author}`)
        chan.send(`Çağrınız bir destek yetkilisi tarafından alındı!`)
        chan.send('En kısa zamanda size yardımcı olacaklar.')
        //eslint-disable-next-line no-useless-escape
        chan.send('Destek çağrısını kapatmak için `kapat` yazınız.')
        isEnabled = true
        this.client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send(`Çağrı kapatıldı.`)
              if (message.channel.id === chan.id) client.channels.get(supportChan).send(`Çağrı diğer taraftan kapatıldı.`)
              if (message.channel.id === supportChan) chan.send(`Çağrı diğer taraftan kapatıldı.`)

              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(supportChan).send(`**(Kullanıcı) ${message.author.tag}**: ${message.content}`)
            if (message.channel.id === supportChan) chan.send(`**(Canlı Destek) ${message.author.tag}:** ${message.content}`)
          }
          contact(client)
        })
      }
    })
  }
};