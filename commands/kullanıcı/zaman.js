const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const moment = require('moment');

module.exports = class TimeCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'zaman',
      memberName: 'zaman',
      group: 'kullanıcı',
      description: 'Tarih ve saati gösterir.',
    });
  }

  run(message) {
    
			var tarih = ''
      if(moment().format('MM') === '01') {
				var tarih = `${moment().format('DD')} Ocak ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '02') {
				var tarih = `${moment().format('DD')} Şubat ${moment().format('YYYY')} `
			}
      if(moment().format('MM') === '03') {
				var tarih = `${moment().format('DD')} Mart ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '04') {
				var tarih = `${moment().format('DD')} Nisan ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '05') {
				var tarih = `${moment().format('DD')} Mayıs ${moment().format('YYYY')} `
			}
      if(moment().format('MM') === '06') {
				var tarih = `${moment().format('DD')} Haziran ${moment().format('YYYY')} `
			}
      if(moment().format('MM') === '07') {
				var tarih = `${moment().format('DD')} Temmuz ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '08') {
				var tarih = `${moment().format('DD')} Ağustos ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '09') {
				var tarih = `${moment().format('DD')} Eylül ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '10') {
				var tarih = `${moment().format('DD')} Ekim ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '11') {
				var tarih = `${moment().format('DD')} Kasım ${moment().format('YYYY')} `
			}
			if(moment().format('MM') === '12') {
				var tarih = `${moment().format('DD')} Aralık ${moment().format('YYYY')} `
			}

      var saat = ''
        var saat = `${moment().format('HH:mm:ss')} `
        
      const embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle(`Zaman Bilgisi:`)
      .setURL('https://discord.gg/tJuHvr')
      .addField(`Tarih:`, tarih)
      .addField(`Saat:`, saat)
      return message.channel.send(embed);
  }
}