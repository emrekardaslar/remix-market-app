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
      imgLink: "http://cdn.shopify.com/s/files/1/0269/8575/8790/products/Coca_cola_355ml_c3458b36-1bfd-4241-9834-5dec83b0378b.png?v=1618852366",
      imgList: ["https://hancionline.com/wp-content/uploads/2020/04/coca-cola-600x600.jpg"]
    }
  })

  const pepsi = await db.product.create({
    data: {
      name: "Pepsi",
      category: "drink",
      subCategory: "coke",
      description: "Pepsi is a carbonated soft drink manufactured by PepsiCo. Originally created and developed in 1893 by Caleb Bradham and introduced as Brad's Drink",
      price: 11.45,
      imgLink: "https://st3.depositphotos.com/8478842/18358/v/450/depositphotos_183583568-stock-illustration-pepsi-cola-coda-drinks.jpg",
      imgList: ["https://www.knjaznatura.co.rs/files/thumbs/files/files/thumbs_600/1300001542_600_600px.jpg"]
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
      imgList: ["https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30141743/30141743_0_MC/8809365700658_1600421577264.jpg"]
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
      imgLink: "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/600-600/119329--01--1635243305.jpeg",
      imgList: ["https://d10ui928gx5i4g.cloudfront.net/media/cache/03/e2/03e2f3b2f5c559475a77a4efb74e8db5.jpg"]
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
    subCategory: "chocolate",
    description: "Milka is one of the world's most beloved – and recognizable – chocolate brands. Made with Alpine milk, Milka has been delighting consumers in Germany and beyond since 1901. The brand, with its unique lilac-colored packaging and Lila, the Milka cow, have a dedicated “cow-munity” of adoring fans around the world!",
    imgList: ["https://m.media-amazon.com/images/I/61h-RNC6V-L.jpg"]
  }
})
  
}

seed();