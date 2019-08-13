const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.BOT_TOKEN;

client.on('ready', () => {
    console.log('ready...');
});

client.on('message', message => {
    if(message.author.bot) {
        return;
    }

    if (message.content === "!count") {
        count_message(message);
    }
});

client.login(token);

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function count_message(message) {
    message.channel.send('3');
    await sleep(750);
    message.channel.send('2');
    await sleep(750);
    message.channel.send('1');
    await sleep(750);
    message.channel.send('スタート!!');
}