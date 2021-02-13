const Discord = require("discord.js");
const moment = require("moment");
const { prefix } = require("../config.json");
const addReaction = require("../util/addReaction");

var generateEmbed = async (message, args, ID) => {
  moment.locale("pt-br");
  var date = moment(new Date(args[2])).format("DD [de] MMMM");
  console.log(`D|>|Debug: ${date}`);

  var confirmationEmbed = new Discord.MessageEmbed()
    .setColor("#831fde")
    .setTitle("Blz! A data de aniversário está certa?")
    .setAuthor("Wisher", ID.displayAvatarURL({ dynamic: true }))
    .setDescription(`${date}.`);

  let msgEmbed = await message.channel.send(confirmationEmbed);
  var reactions = ["❌", "🔸", "✅"];
  await addReaction(msgEmbed, reactions);
  return msgEmbed;
};

module.exports = async (message, args, u, client) => {
  const ID = client.users.cache.get("805035898990755850");

  const handleReactions = (reaction, user) => {
    const emoji = reaction._emoji.name;
    const { guild } = reaction.message;

    const member = guild.members.cache.find((member) => member.id === user.id);

    if (!message.author.id == member.id) return;
    switch (emoji) {
      case "✅":
        return true;
      case "❌":
        return false;
    }
  };

  var msgEmbed = await generateEmbed(message, args, ID);

  client.on("messageReactionAdd", async (reaction, user) => {
    if (user.id == "805035898990755850") return;

    switch (handleReactions(reaction, user)) {
      case true:
        var confirmYes = new Discord.MessageEmbed()
          .setColor("#831fde")
          .setTitle("Irei me lembrar!! 👌")
          .setAuthor("Wisher", ID.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `**O aniversário de ${u.username}#${u.discriminator} será em ${date}!**`
          );
        await message.channel.send(confirmYes);
        await msgEmbed.delete();
        return;

      case false:
        var confirmNo = new Discord.MessageEmbed()
          .setColor("#831fde")
          .setTitle("Se está com problemas, a sintaxe correta é:")
          .setAuthor("Wisher", ID.displayAvatarURL({ dynamic: true }))
          .setDescription(`**${prefix}set bd <mention> <mes/dia>**`);
        await message.channel.send(confirmNo);
        await msgEmbed.delete();
        return;
    }
    return;
  });

  // Inserts into DB
  // await update(date, uID);
};
