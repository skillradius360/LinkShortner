import { client } from "../db/prisma.db.js";
import { codes } from "../constants.js";
import { parse, z } from "zod";
function generateRandomString(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let result = "";
    // Shuffle by picking unique characters
    while (result.length < length) {
        let randomChars = chars[Math.floor(Math.random() * chars.length)];
        let randomNums = numbers[Math.floor(Math.random() * numbers.length)];
        result += randomChars;
        result += randomNums;
    }
    return result;
}
console.log(generateRandomString());
async function shortenURI(req, res) {
    const validation = z.object({
        originalUrl: z.string(),
        length: z.number()
    });
    const parsed = await validation.safeParse(req.body);
    if (!parsed.success) {
        res.status(codes.Error).json({ "msg": "Please provide full URI" });
    }
    // const isAllowed = await client.linkTable.findFirst({
    //     where:{
    //         mainLink:parsed.data?.originalUrl|| ""
    //     }
    // })
    // if(!isAllowed){
    //     return res.status(codes.NotAcceptable).json({"msg":"URL exists ..cant be s"})
    // }
    const generateUUID = await generateRandomString(parsed.data?.length || 8);
    if (generateUUID.length < 1) {
        res.status(codes.Error).json({ "msg": "UUID genertion failure" });
    }
    const createRecord = await client.linkTable.create({
        data: {
            mainLink: parsed.data?.originalUrl || "",
            generatedLink: `http://localhost:8000/process/validate/${generateUUID}/`,
            generatedUuid: generateUUID
        }
    });
    console.log(createRecord);
    if (!createRecord) {
        res.status(codes.Error).json({ "msg": "Record creation failure" });
    }
    return res.status(codes.AllOk).json({ "msg": "URL created successfully", createRecord });
}
async function redirector(req, res) {
    const paramsValidator = z.object({ path: z.string() });
    const parsedValue = paramsValidator.safeParse(req.params);
    if (!parsedValue.success) {
        return res.status(codes.Error).json({ "msg": "url invalid" });
    }
    const data = await client.linkTable.findUnique({
        where: {
            generatedUuid: parsedValue.data?.path
        }
    });
    if (!data) {
        return res.status(codes.Error).json({ "msg": "Cannot find the url" });
    }
    res.redirect(data.mainLink);
    // return res.status(codes.AllOk).json({"msg":"URL created successfully",
    //     generatedLink:data.generatedLink })
}
export { shortenURI, redirector };
//# sourceMappingURL=shortner.controllers.js.map