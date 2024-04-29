const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")

async function scrape(){
  // create driver
  let driver = await new Builder().forBrowser("MicrosoftEdge").build()

  await driver.get('https://ratings.fide.com/top.phtml?list=men')

  // Grab element from provided website
  let names = await driver.findElements(By.css(".tur"));

  // console.log(names)
  for(let n of names){
    console.log(await n.getText())
  }

  driver.quit();
}

// Call the function to run
scrape();