import { sendMessage } from "../telegram";

export async function bindCommand(chatId){

    await sendMessage(chatId,"bing")
}