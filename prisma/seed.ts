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
    imgLink: "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125036119/125036119_0_MC/48344531.jpg",
    category: "electronics",
    subCategory: "computers",
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
    imgList: ["https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125036119/125036119_1_MC/48412556.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125036119/125036119_2_MC/48412557.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125036119/125036119_3_MC/48344534.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125036119/125036119_4_MC/48344535.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125036119/125036119_5_MC/48412538.jpg"]
  }
})

const macbookPro = await db.product.create({
  data: {
    name: "2021 Apple MacBook Pro (16-inch, Apple M1 Pro chip with 10‑core CPU and 16‑core GPU, 16GB RAM, 1TB SSD) - Space Gray",
    price: 2546.50,
    imgLink: "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125034259/125034259_0_MC/57261934.jpg",
    category: "electronics",
    subCategory: "computers",
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
    imgList: ["https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125034259/125034259_1_MC/57262048.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125034259/125034259_2_MC/57261999.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125034259/125034259_3_MC/57262328.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125034259/125034259_4_MC/57262354.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125034259/125034259_7_MC/57262440.jpg"]
  }
})

  const fanta = await db.product.create({
    data: {
      name: "Fanta 0.5L",
      price: 6.25,
      imgLink: "https://positano.lv/wp-content/uploads/2021/11/fanta-0.5-new.png",
      category: "drink",
      subCategory: "fanta",
      description: `Fanta is an American-owned German brand of fruit-flavored carbonated soft drinks created by Coca-Cola Deutschland under the leadership of German businessman Max Keith. There are more than 200 flavors worldwide. Fanta originated in Germany as a Coca-Cola alternative in 1940 due to the American trade embargo of Nazi Germany, which affected the availability of Coca-Cola ingredients. Fanta soon dominated the German market with three million cans sold in 1943. The current formulation of Fanta was developed in Italy in 1955.`,
      imgList: [""]
    }
  })

  const miFryer = await db.product.create({
    data: {
      name: "Xiaomi Mi Smart Air Fryer 3,5 L",
      price: 157.68,
      imgLink: "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/120412509/120412509_0_MC/56452563.png",
      category: "electronics",
      subCategory: "kitchen",
      description: `About this item
      Healthier cooking with 360° heated air circulation, providing delicious food with less grease and fat
      1500W heating pipe for quick and rapid cooking
      100+ in-app recipes, just select and the air fryer will automatically select the temperature and time for you
      Adjustable temperature between 40℃ to 200℃. Aside from frying, you can also dry fruit and meat, ferment yogurt, defrost, and bake
      24h scheduled cooking so you can prepare your food in advance and get your cooking done even when you are busy OLED screen with interactive button, easy to control 3.5 Litre with grill rack to maximise your kitchen space Wear resistant and non-stick coating to make the air fryer both durable and easy to clean`,
      imgList: ["https://www.birnumara.com/image/cache/data/resimler/xiaomi-mi-smart-air-fryer-3-5-lt-yagsiz-fritoz-49993-600x600.png", "https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30385166/30385166_2_MC/8840401911858_1648538424305.jpg"]
    }
  }) 

  const ps5 = await db.product.create({
    data: {
      name: "Playstation 5 ",
      price: 500.00,
      imgLink: "https://cdn.shopify.com/s/files/1/0397/7982/7863/products/PS5K6_600x.jpg?v=1624623949",
      category: "electronics",
      subCategory: "gaming",
      description: `About this item
      Next wave of invites will be sent on 12/2/2022 to qualifying customers. While supplies last
      Model Number CFI-1215A01X
      Stunning Games - Marvel at incredible graphics and experience new PS5 features.
      Breathtaking Immersion - Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.
      Lightning Speed - Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.`,
      imgList: ["https://www.birnumara.com/image/cache/data/resimler/sony-playstation-5-oyun-konsolu-32402-600x600.jpg", "https://buynow.com.mt/image/cache/catalog/ps5dual-600x600.jpeg"]
    }
  }) 

  const xboxSeriesS = await db.product.create({
    data: {
      name: "Xbox Series S",
      price: 400.00,
      imgLink: "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125088429/125088429_1_MC/48352428.jpg",
      category: "electronics",
      subCategory: "gaming",
      description: `About this item
      Go all digital with Xbox Series S and experience next-gen speed and performance at a great price.
      Bundle includes: Xbox Series S console, one Xbox Wireless Controller, a high-speed HDMI cable, power cable, and 2 AA batteries.
      Make the most of every gaming minute with Quick Resume, lightning-fast load times, and gameplay of up to 120 FPS—all powered by Xbox Velocity Architecture.*
      Enjoy digital games from four generations of Xbox, with hundreds of optimized titles that look and play better than ever.
      Add Xbox Game Pass Ultimate (membership sold separately) to play new games day one. Enjoy hundreds of high-quality games with friends on console, PC, and cloud. Plus, now you can skip the install and jump in with cloud gaming.* `,
      imgList: ["https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125088429/125088429_2_MC/48352427.jpg", "https://www.eros.ae/media/catalog/product/cache/4d25cc2d7db4bdfe410479ebb1f61f20/m/i/microsoft-xbox-series-s-console-white-2.jpg"]
    }
  }) 

  const xboxSeriesX = await db.product.create({
    data: {
      name: "Xbox Series X",
      price: 500.00,
      imgLink: "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125088428/125088428_0_MC/48351660.jpg",
      category: "electronics",
      subCategory: "gaming",
      description: `About this item
      Next wave of invites will be sent on 12/02/2022 to qualifying customers. While supplies last.
      Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles-all games look and play best on Xbox Series X.
      Experience next-gen speed and performance with the Xbox velocity architecture, powered by a custom SSD and integrated software.
      Play thousands of games from 4 generations of Xbox with Backward compatibility, including optimized titles at launch.
      Download and play over 100 high-quality games, including all new Xbox Game Studios titles like Halo Infinite the day they release, with Xbox Game Pass ultimate (membership sold separately).
      Xbox Smart delivery ensures you play the best available version of your game no matter which Console you're playing on. `,
      imgList: ["https://ultimateconnection.co.za/wp-content/uploads/2021/11/XBOX-SERIES-X-1TB-1.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3-ukwhlUrdRBHX6rB9tKEmTZ6uMz7YwDGw&usqp=CAU"]
    }
  }) 

  const galaxyS22Ultra = await db.product.create({
    data: {
      name: "Galaxy S22 Ultra",
      price: 1000.00,
      imgLink: "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125078448/125078448_0_MC/62184198.jpg",
      category: "electronics",
      subCategory: "phone",
      description: `About this item
      8K SUPER STEADY VIDEO: Shoot videos that rival how epic your life is with stunning 8K recording, the highest recording resolution available on a smartphone; Video captured is effortlessly smooth, thanks to Auto Focus Video Stabilization on Galaxy S22 Ultra.Form_factor : Smartphone
      NIGHTOGRAPHY plus PORTAIT MODE: Capture the night with crystal clear, bright pics and videos, no matter the lighting with Night Mode; Portrait Mode auto-detects and adjusts to what you want front and center, making all your photos worthy of a frame
      108MP PHOTO RESOLUTION plus BRIGHT DISPLAY: Capture premium detail with 108MP resolution— the highest available on a cell phone; Your favorite content will look even more epic on our brightest display ever with Vision Booster
      ADAPTIVE COLOR CONTRAST: Streaming on the go, working from your patio or binge-watching late into the night. The Galaxy S22 Ultra adaptive screen automatically optimizes color and brightness, outdoors and indoors
      LONG LASTING BATTERY plus FAST CHARGING: Power every scroll, click, tap and stream all day long and then some with an intelligent, long-lasting battery; Dive back into action at a moment’s notice with 45W Super-Fast Charging
      EMBEDDED S PEN: New phone, new S Pen; Now you can unleash your creativity on Galaxy S22 Ultra with an embedded S Pen; Edit photos and videos with pinpoint accuracy, and do it all with that pen-to-paper feel
      PREMIUM DESIGN & CRAFTMANSHIP: With a classy, eye-catching glass-metal-glass design, we’re setting a standard for smart phones; With our strongest aluminum frame and the latest Gorilla Glass, this phone is lightweight and durable to help endure scratches and dings`,
      imgList: ["https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125078456/125078456_0_MC/60699488.jpg", "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125078450/125078450_0_MC/60699520.jpg"]
    }
  }) 
}

seed();