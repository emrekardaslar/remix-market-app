import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  /* const kody = await db.user.create({
    data: {
      username: "test2",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  }); */

  const cocaCola = await db.product.create({
    data: {
      name: "Coca cola",
      category: "drink",
      subCategory: "coke",
      description: "Coca-Cola, or Coke, is a carbonated soft drink manufactured by the Coca-Cola Company. Originally marketed as a temperance drink and intended as a patent medicine, it was invented in the late 19th century by John Stith Pemberton in Atlanta, Georgia.",
      price: 11.5,
      imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgT-aVvy9-AaxbhqALWPPBtzkmsi-1_z5Zw&usqp=CAU",
      imgList: ["test1", "test2"]
    }
  })

  const pepsi = await db.product.create({
    data: {
      name: "Pepsi",
      category: "drink",
      subCategory: "coke",
      description: "Pepsi is a carbonated soft drink manufactured by PepsiCo. Originally created and developed in 1893 by Caleb Bradham and introduced as Brad's Drink",
      price: 11.45,
      imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiByxQjdaBHgB0he4ip9G7w5nuYbbActS5pQ&usqp=CAU",
      imgList: ["test1", "test2"]
    }
  })


  const iceTea = await db.product.create({
    data: {
      name: "Ice Tea",
      category: "drink",
      subCategory: "tea",
      description: "Iced tea (or ice tea)[1] is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled.",
      price: 11.00,
      imgLink: "https://ayb.akinoncdn.com/products/2022/04/12/3560/bfe7d2f6-d113-4e28-b1ce-8522e5023f82_size780x780_quality60_cropCenter.jpg",
      imgList: ["test1", "test2"]
    }
  })

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

  const water = await db.product.create({
    data: {
      name: "Aquafina",
      price: 4.00,
      category: "drink",
      subCategory: "water",
      description: "Fresh and pure, Aquafina is the perfect companion for happy bodies everywhere.",
      imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgT-aVvy9-AaxbhqALWPPBtzkmsi-1_z5Zw&usqp=CAU",
      imgList: ["test1", "test2"]
    }
  })

/*   const clearOrderItems = await db.orderItem.deleteMany({ })
  const clearOrders = await db.order.deleteMany({ }) */

/*   const commentOnIceTea = await db.comment.create({
    data: {
      productId: "fb5a8824-bd61-495c-9b4f-710b1d435ee7",
      content: "Tasteful",
      userId: "860b4da3-e1f0-434a-ab18-2bc5f5c8d7ef"
    }
  }) */

 // await db.comment.deleteMany()

 const chocolate = await db.product.create({
  data: {
    name: "Milka",
    price: 7.45,
    imgLink: "https://cdn.shopify.com/s/files/1/0413/1107/6505/products/07040550-5608ae-1650x1650_1024x.jpg?v=1592850335",
    category: "food",
    subCategory: "Chocolate",
    description: "Milka is one of the world's most beloved – and recognizable – chocolate brands. Made with Alpine milk, Milka has been delighting consumers in Germany and beyond since 1901. The brand, with its unique lilac-colored packaging and Lila, the Milka cow, have a dedicated “cow-munity” of adoring fans around the world!",
    imgList: ["test1", "test2"]
  }
})
  
}

seed();