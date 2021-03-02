const Discord = require("discord.js");
const moment = require("moment");
const sendHappyBd = require("./birthdayCmds/sendHappyBd");

// Kudo https://github.com/iSherlott
// function formatDate(data) {
//   let fdata = [...data];
//   return `${fdata[8]}${fdata[9]}-${fdata[5]}${fdata[6]}-${fdata[0]}${fdata[1]}${fdata[2]}${fdata[3]}`; // Ano Mes Dia
// }

module.exports = async (message, args) => {
  switch (args[0]) {
    case "date":
      moment.locale("pt-br");
      var result = moment(new Date(args[1]));
      console.log(`D|>|Date: ${result}`);
      message.channel.send(result.format());
      break;
    case "await":
      await message.channel.send("Escutando..");
      const msgs = await message.channel.awaitMessages((msg) => msg.content, {
        time: 10000,
      });
      const msgMap = msgs.map((msg) => msg.content).join(", ");
      console.log(`D|>|Await: ${msgMap}`);
      message.channel.send(`Terminei de escutar: ${msgMap}`);
      break;
    case "mention":
      const target = message.mentions.users.first();
      if (!target) {
        console.error("X|>|Err: No mention");
        message.channel.send("Você tem que mencionar alguém, bobinho..");
      } else {
        console.log(`D|>|Mention: ${target}`);
      }
      break;
    case "bdEmbed":
    case "happyBd":
    case "happy":
    case "h":
      await sendHappyBd(message);
      break;
    case "embed":
      args.shift();
      const debugEmbed = new Discord.MessageEmbed()
        .setColor("#831fde")
        .setTitle(`Título: ${args}`)
        .setDescription(`Descrição: ${args}`)
        .addField(`Campo 1: ${args}`, `Campo 2: ${args}`, true);
      await message.channel.send(debugEmbed);
    default:
      console.log(`D|>|Default: ${args}`);
  }
  return;
};
