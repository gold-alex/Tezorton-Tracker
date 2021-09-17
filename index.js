const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const axios = require("axios");

//Global price var
let tezosprice = 0;

let token = process.env.TOKEN;
console.log('this is token', token)

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.on("ready", () => {
  console.log("Ready!");
});

//FUD Deterrent - "Good time to buy?"
client.on("message", (message) => {
  if (message.content.toLowercase.includes("good time")) {
    message.channel.send("Always.");
  }
});

async function getTezosPrice() {
  // Get crypto price from coingecko API
  try {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd`
    );
    tezosprice = data.data.tezos.usd;
    console.log(tezosprice);
    const GUILD_ID = "770748597708521493";
    const guild = await client.guilds.fetch(GUILD_ID);
    //Set bot nickname to updated price every 3000ms 
    await guild.me.setNickname(`$ ${tezosprice}`);
  } catch (err) {
    console.log("error");
  }
}

setInterval(function () {
  getTezosPrice();
}, 3000);

//Passing discord.js our authentication token from .env file
client.login(process.env.TOKEN);
