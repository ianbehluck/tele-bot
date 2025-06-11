import { sendMessage } from "../telegram";

export async function moneyCommand(chatId){
    await sendMessage(chatId,"money")
}