import { PrismaClient } from '@prisma/client'

let prisma;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  prisma = new PrismaClient()
} else {
//check if there is already a connection to the database
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma };