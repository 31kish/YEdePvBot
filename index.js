const Moment = require('moment');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.BOT_TOKEN;
let remindId = null;

client.on('ready', () => {
    console.log('ready...');
});

client.on('message', message => {
    if(message.author.bot) {
        return;
    }

    if (message.content.startsWith('!count')) {
        const time = Number(message.content.split(' ')[1]);

        if (isNaN(time)) {
            console.log('カウントダウンのみ');
            count_message(message.channel);
        } else {
            console.log('カウンドダウン後、終了宣言');
            remind(message.channel, time);
        }
    } else if (message.content === '!cancel') {
        if (remindId != null) {
            console.log('キャンセルしました');
            clearTimeout(remindId);
            message.channel.send('キャンセルしました。');
        }
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

async function count_message(channel) {
    channel.send('3');
    await sleep(750);
    channel.send('2');
    await sleep(750);
    channel.send('1');
    await sleep(750);
    channel.send('スタート!!');
}

/**
 * カウントダウンのあと、指定した時間に終了宣言します
 * @param {} channel チャンネル
 * @param {} end_time 終了時間（分）
 */
function remind(channel, end_time) {
    const min = end_time * 60 * 1000;
    console.log(`${min}ミリ秒`);
    console.log(`${end_time}分後に終了宣言します`);

    let now = Moment();
    now.add(end_time, 'minutes');
    channel.send(`制限時間 ${end_time}分 ${now.format('HH:mm')}まで`);

    count_message(channel);

    remindId = client.setTimeout(function () {
        channel.send('終了!!');
        remindId = null;
    }, min);
}