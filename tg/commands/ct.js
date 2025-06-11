import { sendMessage } from "../telegram";

export async function createCommand(chatId){
    await sendMessage(chatId,"create")
}