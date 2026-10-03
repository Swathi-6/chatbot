import * as readline from "node:readline/promises";
import {stdin as input, stdout as output} from "node:process";
import {reply, type ChatMessage} from "./lib/chat.ts";

const r1 = readline.createInterface({input, output});
const history: ChatMessage[] = [];
console.log('Chat started. Type your question or "exit" to quit');

while(true){
    const question = (await r1.question("You: ")).trim();
    if(question === "exit")
        break;
    if(!question)
        continue;

    const userMessage: ChatMessage = {role:"user", content:question};

    try{
        const answer = await reply([...history, userMessage]);
        history.push(userMessage, {role:"assistant", content:answer});
        console.log('\nAI: ', answer, '\n');
    }catch(error){
        const message = error instanceof Error ? error.message: String(error);
        console.error('\nError: ', message, '\n');
    }
}

r1.close();
