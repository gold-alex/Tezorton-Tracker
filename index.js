const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const axios = require("axios");
require('dotenv').config()

//Global price var
let tezosprice = 0;
let twentyfourhourchange = 0;
let token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.on("ready", () => {
  console.log("Ready!");
});

//FUD Deterrent - "Good time to buy?"
client.on("message", (message) => {
  if (message.content.includes("good time") || message.content.includes("Good time")){
    if (message.content.includes("tezos") || message.content.includes("Tezos")) {
      message.channel.send("Always.");
    }
  }})

async function getTezosPrice ()  {
  // Get crypto price from coingecko API
  try {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd&include_24hr_change=true`
    );
    tezosprice = data.data.tezos.usd;
    twentyfourhourchange = data.data.tezos.usd_24h_change;
    //Round the 24hr change two decimal places
    twentyfourhourchangeRounded = twentyfourhourchange.toFixed(2);
    console.log("heres da change", twentyfourhourchangeRounded);

    console.log(tezosprice);
    const GUILD_ID = "*******INSERT YOUR GUILD/CHANNEL ID IN HERE IN QUOTES**********";
    const guild = await client.guilds.fetch(GUILD_ID);
    //Set bot nickname to updated price every 3000ms 
    await guild.me.setNickname(`$ ${tezosprice}`);
    await client.user.setActivity(`${twentyfourhourchangeRounded}%`, {type: 'WATCHING'})
  } catch (err) {
    console.log("error");
  }
}

setInterval(function () {
  getTezosPrice();
}, 3000);



//Passing discord.js our authentication token from .env file
client.login(token)
