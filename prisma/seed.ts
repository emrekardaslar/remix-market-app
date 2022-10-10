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

/*   const cocaCola = await db.product.create({
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
 */

/*   const iceTea = await db.product.create({
    data: {
      name: "Ice Tea",
      price: 11.00,
      imgLink: "https://ayb.akinoncdn.com/products/2022/04/12/3560/bfe7d2f6-d113-4e28-b1ce-8522e5023f82_size780x780_quality60_cropCenter.jpg"
    }
  })
 */
/*   const order = await db.order.create({
    data: {
      id: 'testorderid1',
      userId: '860b4da3-e1f0-434a-ab18-2bc5f5c8d7ef'
    }
  })

  const orderItem = await db.orderItem.create({
    data: {
      productId: "de534b3e-588c-4266-bcef-b352bc13f0d3",
      orderId: "testorderid1"
    }
  }) */

/*   const order = await db.order.create({
    data: {
      userId: '860b4da3-e1f0-434a-ab18-2bc5f5c8d7ef'
    }
  }) */

/*   const orderItem = await db.orderItem.create({
    data: {
      productId: "a9450a2d-2d35-4523-b27b-b8552260efe9",
      orderId: "3360fc79-4737-4cd9-9c1d-af0166436cec"
    }
  }) */

/*   const water = await db.product.create({
    data: {
      name: "Aquafina",
      price: 4.00,
      imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgT-aVvy9-AaxbhqALWPPBtzkmsi-1_z5Zw&usqp=CAU"
    }
  }) */

/*   const clearOrderItems = await db.orderItem.deleteMany({ })
  const clearOrders = await db.order.deleteMany({ }) */
}

seed();