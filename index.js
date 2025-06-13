import Telegram from "node-telegram-bot-api";
// import {BOT_TOKEN} from "./variable/telegram.js";
// import {BOT_TOKEN} from "./variable/.env";

const BOT_TOKEN = "7998836073:AAE6UCmlFtq-M8HR8V1gvnzig3U1Cuf0iiM";
const bot = new Telegram(BOT_TOKEN , {polling:true ,});
/*
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
*/

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log('---------resp-----------' , resp);
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    console.log("-----------msg-----------------");
    console.log(msg);
    console.log("-----------msg-----------------");

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
/*
  //处理Webhook请求 
  module.exports = async (req, res) => { 
    try { 
      //处理来自Telegram的更新 
      await bot.handleUpdate(req.body); 
      res.status(200).send('OK');
    } catch (error) { 
      console.error('处理更新时出错:'， error);
      res.status(500).send('内部服务器错误');
    } 
  }；
*/