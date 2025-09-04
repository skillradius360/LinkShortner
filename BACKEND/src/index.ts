import { Context } from 'hono'
import {client} from "./db/prisma.db.js"
import {z} from "zod"

import {Hono} from "hono"
const app = new Hono()


enum codes{
  Error=400,
  AllOk=200
}
app.post("/shorten",shortenURI)
app.get("/health",health)

function generateRandomString(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers ="0123456789"
    let result = "";

    // Shuffle by picking unique characters
    while (result.length < length) {
        let randomChars= chars[Math.floor(Math.random() * chars.length)];
        let randomNums= numbers[Math.floor(Math.random() * numbers.length)];
        
            result += randomChars;
            result+=randomNums;
    }

    return result;
}

async function health(c:Context){
  return c.json({"msg":"ALL OK AND WORKING!"})
}

async function shortenURI(c: Context) {
  try {
    // Parse request body
    const body = await c.req.json()

    // Validation
    const validation = z.object({
      originalUrl: z.string().url(), // ensure it's a proper URL
      length: z.number().optional()
    })

    const parsed = validation.safeParse(body)

    if (!parsed.success) {
      return c.json({ msg: "Please provide full URI" }, codes.Error)
    }

    // Generate UUID
    const generateUUID = await generateRandomString(parsed.data.length ?? 8)

    if (!generateUUID) {
      return c.json({ msg: "UUID generation failure" }, codes.Error)
    }

    // Create DB record
    const createRecord = await client.linkTable.create({
      data: {
        mainLink: parsed.data.originalUrl,
        generatedLink: `http://localhost:8000/process/validate/${generateUUID}/`,
        generatedUuid: generateUUID
      }
    })

    if (!createRecord) {
      return c.json({ msg: "Record creation failure" }, codes.Error)
    }

    return c.json(
      { msg: "URL created successfully", createRecord },
      codes.AllOk
    )
  } catch (err) {
    return c.json({ msg: "Internal server error" }, 500)
  }
}
    
    async function redirector (c:Context) {
    
        const paramsValidator = z.object({path:z.string()})
      const params = await c.req.param
    const parsedValue = paramsValidator.safeParse(params)

    if(!parsedValue.success){
        return c.json({"msg":"url invalid"},codes.Error)
    }
    
    const data = await client.linkTable.findUnique({
        where:{
            generatedUuid:parsedValue.data?.path
        }
    })
    
    if (!data){
        return c.json({"msg":"Cannot find the url"},codes.Error)
    }
    c.redirect(data.mainLink)
    // return c.status(codes.AllOk).json({"msg":"URL created successfully",
    //     generatedLink:data.generatedLink })

}
export {shortenURI,redirector}


export default {app,shortenURI,redirector}

