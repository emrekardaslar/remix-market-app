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

const macbookAir = await db.product.create({
  data: {
    name: "Macbook Air M1 8 GB 256 GB SSD 13.3 MGN63TU/A",
    price: 1153.93,
    imgLink: "https://cdn.dsmcdn.com/ty454/product/media/images/20220614/15/125590297/117920493/1/1_org_zoom.jpg",
    category: "Electronics",
    subCategory: "Computers",
    description: `
    About this item
    All-Day Battery Life – Go longer than ever with up to 18 hours of battery life.
    Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power.
    Superfast Memory – 8GB of unified memory makes your entire system speedy and responsive. That way it can support tasks like memory-hogging multitab browsing and opening a huge graphic file quickly and easily.
    Stunning Display – With a 13.3” Retina display, images come alive with new levels of realism. Text is sharp and clear, and colors are more vibrant.
    Why Mac – Easy to learn. Easy to set up. Astoundingly powerful. Intuitive. Packed with apps to use right out of the box. Mac is designed to let you work, play, and create like never before.
    Simply Compatible – All your existing apps work, including Adobe Creative Cloud, Microsoft 365, and Google Drive. Plus you can use your favorite iPhone and iPad apps directly on macOS. Altogether you’ll have access to the biggest collection of apps ever for Mac. All available on the App Store.
    Easy to Learn – If you already have an iPhone, MacBook Air feels familiar from the moment you turn it on. And it works perfectly with all your Apple devices. Use your iPad to extend the workspace of your Mac, answer texts and phone calls directly on your Mac, and more.
    Fanless Design – Your MacBook Air stays cool and runs quietly even while tackling intense workloads.
    AppleCare – Every Mac comes with a one-year limited warranty and up to 90 days of complimentary technical support. Get AppleCare+ to extend your coverage and reduce the stress and cost of unexpected repairs.
    Environmentally Friendly – MacBook Air is made with a 100% recycled aluminum enclosure and uses less energy for a smaller carbon footprint.
    `,
    imgList: ["https://cdn.dsmcdn.com/ty454/product/media/images/20220614/15/125590297/117920493/2/2_org_zoom.jpg", "https://cdn.dsmcdn.com/ty455/product/media/images/20220614/15/125590297/117920493/3/3_org_zoom.jpg", "https://cdn.dsmcdn.com/ty454/product/media/images/20220614/15/125590297/117920493/4/4_org_zoom.jpg"]
  }
})

const macbookPro = await db.product.create({
  data: {
    name: "2021 Apple MacBook Pro (16-inch, Apple M1 Pro chip with 10‑core CPU and 16‑core GPU, 16GB RAM, 1TB SSD) - Space Gray",
    price: 2546.50,
    imgLink: "https://m.media-amazon.com/images/I/61aUBxqc5PL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
    category: "Electronics",
    subCategory: "Computers",
    description: `
    About this item
    Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance
    Up to 10-core CPU delivers up to 2x faster performance to fly through pro workflows quicker than ever
    Up to 32-core GPU with up to 4x faster performance for graphics-intensive apps and games
    16-core Neural Engine for up to 5x faster machine learning performance
    Longer battery life, up to 21 hours
    Up to 64GB of unified memory so everything you do is fast and fluid
    Up to 8TB of superfast SSD storage launches apps and opens files in an instant
    Stunning 16-inch Liquid Retina XDR display with extreme dynamic range and contrast ratio
    1080p FaceTime HD camera with advanced image signal processor for sharper video calls
    Six-speaker sound system with force-cancelling woofers
    `,
    imgList: ["https://m.media-amazon.com/images/I/71ooAuqn7sL._AC_SX522_.jpg", "https://m.media-amazon.com/images/I/61JqllsE+DL._AC_SX522_.jpg", "https://m.media-amazon.com/images/I/81CowZF4cxL._AC_SX522_.jpg", "https://m.media-amazon.com/images/I/818mB1ifjfL._AC_SX522_.jpg", "https://m.media-amazon.com/images/I/61R8bADaJOL._AC_SX522_.jpg"]
  }
})
  
}

seed();