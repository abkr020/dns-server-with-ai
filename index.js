import {startUdpServer , createResponse , createTxtAnswer} from 'denamed'
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("start");
startUdpServer(async (query) => {

    // console.log(query);
    // console.log("gemini api key is",GEMINI_API_KEY);

    // console.log("querry is below");
    // console.log("questions is below");
    // console.log("question is - ",query.questions[0]);
    const q = query.questions[0];
    console.log("last call question is",q);






    const prompt = `
    answer the following question in one word or single sentense.
    question : ${q.name.split('.').join(' ')}`;

    // console.log("prompt is",prompt);


    const result = await model.generateContent(prompt);
    // console.log("result is",result.response.text());
    // return createResponse(query, [createTxtAnswer(query.questions[0],'Hello World!')]);
    return createResponse(query, [createTxtAnswer(q,result.response.text())]);
    // return createResponse(query, [createTxtAnswer(question,'Hello World!')]);

},
{port: process.env.PORT}
);