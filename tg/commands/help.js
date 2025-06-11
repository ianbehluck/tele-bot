import { sendMessage } from "../telegram";

export async function helpCommand(chatId){
    await sendMessage(chatId,"help")
}