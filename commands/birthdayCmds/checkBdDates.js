const Discord = require("discord.js");
const mongo = require("../../mongo");
const BDStorage = require("../../schemes/main-schema");
const moment = require("moment");
// const getUserID = require("../../util/getUserID");
const getImage = require("../../util/getImage");
const isDateToday = require("../../util/isDateToday");

module.exports = async (message, command, client) => {
  moment.locale("pt-br");
  await mongo().then(async (mongoose) => {
    try {
      const results = await BDStorage.find({
        bdate: moment().month(new Date().getMonth()).date(new Date().getDate().format("MM DD")),
      });
      if (!results) {
        await message.channel.send("Não achei registros na minha lista.. 🧐");
        return;
      }
      console.log(results);

      if (!results[1]) {
        // Send gif
        const xpath = ".GifList .column .GifListItem .Gif img";
        const path = "https://tenor.com/search/celebration-gifs";
        const att = "src";
        // Embed
        const user = client.users.cache.get(results[0]._id);
        const birthdayEmbed = new Discord.MessageEmbed()
          .setColor("#831fde")
          .setTitle("Hoje é seu aniversário!")
          .setDescription(`<@!${results[0]._id}>`)
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .addField(
            "Obrigada por fazer parte do nosso server!",
            "Muitas felicidades e muitos anos de vida pra você,\ntenha um ótimo dia e um excelente aniversário!",
            true
          )
          .addField("🇭 🇦 🇵 🇵 🇾 🥳 🎉 👏", "🇧 🇮 🇷 🇹 🇭 🇩 🇦 🇾")
          .setTimestamp();
        await getImage(message, path, xpath, att, command, birthdayEmbed);
        return;
      }

      for (let result of results) {
        if (!isDateToday(result.bdate)) continue;

        // Send gif
        const xpath = ".GifList .column .GifListItem .Gif img";
        const path = "https://tenor.com/search/celebration-gifs";
        const att = "src";

        let user = client.users.cache.get(result._id);

        // Embed
        const todayBdEmbed = new Discord.MessageEmbed()
          .setColor("#831fde")
          .setTitle("Hoje é seu aniversário!")
          // .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
          .setDescription(`<@!${result._id}>`)
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .addField(
            "Obrigada por fazer parte do nosso server!",
            "Muitas felicidades e muitos anos de vida pra você,\ntenha um ótimo dia e um excelente aniversário!",
            true
          )
          .addField("🇭 🇦 🇵 🇵 🇾 🥳 🎉 👏", "🇧 🇮 🇷 🇹 🇭 🇩 🇦 🇾")
          .setTimestamp();
        await getImage(message, path, xpath, att, command, todayBdEmbed);
      }

      // for (let date of results) {
      //   if (await isDateToday(date.bdate)) {
      //   }
      // }
      return;
    } finally {
      await mongoose.connection.close();
      return;
    }
  });
};