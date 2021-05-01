const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();
const title = require('console-title');
const notifier = require('node-notifier');
const config = require('./config.json');
let token = config.token;
let count = 0;

bot.on("ready", () => {
    console.log(`Hey ${chalk.magenta(bot.user.tag)}, happy to see you !\nLets start the sniper :)`);
    title(`Hey ${bot.user.tag}... Waiting for a gift`);
    if(config.presence !== true) return;

    try {
		const rpc = require("discord-rpc")
		const client = new rpc.Client({ transport: 'ipc' })
			client.on('ready', () => {
			client.request('SET_ACTIVITY', {
				pid: process.pid,
				activity : {
					details : "s/o Nats#1987",
					assets : {
					large_image : "natsniper",
					large_text : "NatSniper" 
				},
			buttons : [{label : "Github Repo" , url : "https://github.com/Nats-uuu/NatSniper"}]
		}
	})
})
client.login({ clientId : "837842013088645160" });

      }
    catch(err) {
        console.log(`I couldn't set your rich presence... \nMake an issue if there is any problem`)
    }
});

let repeated = [];

bot.on("message", message => {
    try {
        if(message.channel.type === "dm" || message.channel.type === "group") return;
        let code;
        if (message.channel.type != 'dm' && message.channel.type != 'group') {
            // Nitro Sniper
            if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/" || message.content.includes("discord.com/gifts/)) {
                var start = new Date();
                console.log(`[${chalk.bgMagenta("GIFT")}] - [${chalk.cyan(message.guild.name)}] - ${chalk.blue(message.author.tag)}: ${chalk.underline(message.content)}`);
                if (message.content.includes("discord.gift")) {
                    code = message.content.split("discord.gift/").pop();
                    code = code.replace(/\s+/g," ");
                    code = code.split(' ')[0];
                    if (repeated.includes(code)) {
                        console.log(`${code} - Already attempted :(\n`);
                    }
                    else {
                        request.post({
                            url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                            headers: {
                                'Authorization': token
                            },
                            time: true
                        }, function (error, response, body) {
                            var result = JSON.parse(body);
                            var responseTime = new Date() - start;
                            console.log(`[${chalk.bgRed('INFO')}] - ${result.message} \nFinished in: (${chalk.cyan(responseTime / 1000) + 's'})\n`);

                            notifier.notify({
                                title: 'NatSniper',
                                icon: 'https://i.imgur.com/g30aFHT.png',
                                appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                                message: result.message + ` (${(responseTime / 1000) + 's'})`,
                                timeout: 0.1
                            });
                        });
                        repeated.push(code);
                    }
                }
                else if (message.content.includes("discordapp.com/gifts")){
                    code = message.content.split("discordapp.com/gifts/").pop();
                    code = code.replace(/\s+/g," "); 
                    code = code.split(' ')[0]; 
                    
                    if (repeated.includes(code)) {
                        console.log(`${code} - Already attempted :(\n`);
                    }
                    else {
                        request.post({
                            url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                            headers: {
                                'Authorization': token
                            },
                            time: true
                        }, function (error, response, body) {
                            var result = JSON.parse(body);
                            var responseTime = new Date() - start;
                            console.log(`[${chalk.bgRed('INFO')}] - ${result.message} \nFinished in: (${chalk.cyan(responseTime / 1000) + 's'})\n`);
                            // Notification alerts
                            notifier.notify({
                                title: 'NatSniper',
                                icon: 'https://i.imgur.com/g30aFHT.png',
                                appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                                message: result.message + ` (${(responseTime / 1000) + 's'})`,
                                timeout: 0.1
                            });
                        });
                        repeated.push(code);
                    }
                }
				else if (message.content.includes("discord.com/gifts")){
                    code = message.content.split("discord.com/gifts/").pop();
                    code = code.replace(/\s+/g," "); 
                    code = code.split(' ')[0]; 
                    
                    if (repeated.includes(code)) {
                        console.log(`${code} - Already attempted :(\n`);
                    }
                    else {
                        request.post({
                            url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                            headers: {
                                'Authorization': token
                            },
                            time: true
                        }, function (error, response, body) {
                            var result = JSON.parse(body);
                            var responseTime = new Date() - start;
                            console.log(`[${chalk.bgRed('INFO')}] - ${result.message} \nFinished in: (${chalk.cyan(responseTime / 1000) + 's'})\n`);
                            // Notification alerts
                            notifier.notify({
                                title: 'NatSniper',
                                icon: 'https://i.imgur.com/g30aFHT.png',
                                appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                                message: result.message + ` (${(responseTime / 1000) + 's'})`,
                                timeout: 0.1
                            });
                        });
                        repeated.push(code);
                    }
                }
                count += 1;
                if (count == 1) {
                    title(`${count.toString()} gift | ${bot.user.tag} | Sniped on ${bot.guilds.size} guilds`)
                }
                else if (count > 1) {
                    title(`${count.toString()} gifts | ${bot.user.tag} | Sniped on ${bot.guilds.size} guilds`)
                }
            }
        }
    }
    catch(e) {
        console.log(e)
    }
});
bot.login(token).catch(function (error) {
    console.log(error.message);
});
