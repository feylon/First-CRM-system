import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot("7224043903:AAFWeEUftC7bAi2SWWcIrm6pxDPZUBFi2N8", {

    polling: true
    
});

bot.on('text', async msg => {

    console.log(msg);
bot.sendMessage(4193061241,()=>{
    "Salom"
})
    
    // if(msg.id == 6662172747)
    //     bot.sendMessage(msg.chat.id,
    // "Salom Xush kelibsiz"

    //     );

    });
export default bot;