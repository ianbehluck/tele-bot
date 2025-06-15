 import Telegram from "node-telegram-bot-api";
// import {BOT_TOKEN} from "./variable/telegram.js";
// import {BOT_TOKEN} from "./variable/.env";

const BOT_TOKEN = "7998836073:AAE6UCmlFtq-M8HR8V1gvnzig3U1Cuf0iiM";
const TelegramBot = require('node-telegram-bot-api');
const bot = new Telegram(BOT_TOKEN , {polling:true ,});

//设置机器人命令菜单
bot.setMyCommands([
    { command: 'getme', description: '获取你的用户ID' },
    { command: 'create', description: '创建平台账号' },
    { command: 'bind', description: '绑定微信小程序账号' },
    { command: 'unbind', description: '解绑微信小程序账号' },
    { command: 'getbalance', description: '查看平台余额' },
    { command: 'getgroupid', description: '获取群组ID（群组内使用）' },
    { command: 'help', description: '获取帮助信息' }
]).then(() => {
    console.log('命令菜单设置成功');
}).catch((error) => {
    console.error('设置命令菜单时出错:', error);
});

/*  
//msg 數據內容
{
  message_id: 258,
  from: {
    id: 7248682602,
    is_bot: false,
    first_name: 'BELLER',
    last_name: 'Hellnd',
    language_code: 'zh-hans'
  },
  chat: {
    id: 7248682602,
    first_name: 'BELLER',
    last_name: 'Hellnd',
    type: 'private'
  },
  date: 1749978913,
  text: '/getme',
  entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
}
*/
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log('-----onText----resp-----------' , resp);
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

//Keyboard
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
    "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
    }
});

//設置機器人頭像
bot.onText(/\/sendpic/, (msg) => {
  bot.sendPhoto(msg.chat.id,"https://www.somesite.com/image.jpg" );
});

bot.onText('/start', async (msg) => {
    const welcomeMessage = 'Welcome to the Hamster Key Generator Bot!';
    const keyboardOptions = {
        reply_markup: {
            keyboard: [
                ['🔄 getME', '🔄 getType'],
                ['Name']
            ],
            resize_keyboard: true
        }
    };
    bot.sendMessage(msg.chat.id, welcomeMessage, keyboardOptions);
});
 
bot.onText('/create', async (msg) => {
    // 获取用户 ID 和聊天 ID
    bot.sendMessage(msg.chat.id, "create");
});

 bot.onText('🔄 getME', async (msg) => {
    // 获取用户 ID 和聊天 ID
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat.type;
    bot.sendMessage(msg.chat.id, `用戶ID： ${userId}`);
});

 bot.onText('🔄 getType', async (msg) => {
    // 获取用户 ID 和聊天 ID
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat.type;
    bot.sendMessage(msg.chat.id, `用戶類型： ${chatType}`);
});

bot.onText('Name', async (msg) => {
    // 获取用户 ID 和聊天 ID
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat.type;
    const firsNname = msg.chat.first_name;
    const lastName = msg.chat.last_name;
    bot.sendMessage(msg.chat.id, `用戶名字： ${lastName} ${firsNname} `);
});

 bot.onText('/help', async (msg) => {
    const welcomeMessage = 'Welcome to the Hamster Key Generator Bot!';
    
    bot.sendMessage(msg.chat.id, "help");
});
 
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    console.log("--------on---msg-----------------");
    console.log(msg);
    console.log("--------on---msg-----------------");

    // 获取用户 ID 和聊天 ID
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat.type;

    // 获取消息中的命令（去掉可能的 @botname 后缀）
    const messageText = msg.text ? msg.text.split('@')[0] : '';

    // 处理 /getme 指令
    if (messageText === '/getme') {
        console.log("---getme--返回值-->" ,userId)
        bot.sendMessage(chatId, `你的用户ID：${userId}`);
    }
    else if (messageText === '/create') {
        bot.sendMessage(chatId, "create" );
    }
    else if (messageText === '/bind') {
        bot.sendMessage(chatId, "bind" );
    }
    else if (messageText === '/unbind') {
        bot.sendMessage(chatId, "unbind" );
    }
    else if (messageText === '/getbalance') {
        bot.sendMessage(chatId, "getbalance" );
    }
    else if (messageText === '/getgroupid') {
        if (chatType === 'group' || chatType === 'supergroup') {
            bot.sendMessage(chatId , `📌 **群组ID:** ${chatId}`);
        } else {
            bot.sendMessage(chatId ,'⚠️ 请将机器人邀请进群组后再调用 /getgroupid 指令。');
        }
    }
    else if (messageText === '/help') {
        bot.sendMessage(chatId, "help" );
    }

}); 

