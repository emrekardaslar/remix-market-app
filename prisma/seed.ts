import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
/*   const kody = await db.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  }); */

  const cocaCola = await db.product.create({
    data: {
      name: "Coca cola",
      price: 11.5,
      imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgT-aVvy9-AaxbhqALWPPBtzkmsi-1_z5Zw&usqp=CAU"
    }
  })

  const pepsi = await db.product.create({
    data: {
      name: "Pepsi",
      price: 11.45,
      imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiByxQjdaBHgB0he4ip9G7w5nuYbbActS5pQ&usqp=CAU"
    }
  })
}

seed();