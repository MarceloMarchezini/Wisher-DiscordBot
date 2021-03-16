// const getImage = require("../../util/getImage");

// module.exports = async (message, args, command) => {
//   if (args[0]) {
//     const xpath = ".image a.link";
//     const path = "https://www.dogpile.com/serp?qc=images&q=" + args; // jpg/png search engine
//     const att = "href";
//     await getImage(message, path, xpath, att, command, args);
//   } else {
//     await message.channel.send("Mas você nem me falou o que procurar!");
//   }
//   return;
// };

const Scraper = require("images-scraper");
const google = new Scraper({
  puppeteer: {
    headless: true,
  },
  safe: true,
});
const { shuffle } = require("lodash");

module.exports = async (message, args, command) => {
  if (!args[0]) {
    message.channel.send("Mas você nem me falou o que procurar!");
    return;
  }

  const query = args.join("+");

  const result = shuffle(await google.scrape(query, 40));
  // const result = shuffle(await google.scrape(query + "&safe=active", 40));
  if (result[0].url === undefined) {
    message.channel.send("Ops.. Não achei o que procurava.. 😔");
    return;
  }
  console.log(`||>|Url: ${result[0].url}`);
  await message.channel.send(result[0].url);

  return;
};
