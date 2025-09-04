import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const client = new PrismaClient().$extends(withAccelerate())

