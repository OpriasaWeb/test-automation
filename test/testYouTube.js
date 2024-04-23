const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")
const fs = require("fs")

async function ytScrape(){
  // create driver
  let driver = await new Builder().forBrowser("chrome").build()

  // Grab my own youtube channel
  await driver.get("https://www.youtube.com/channel/UCgi6J20rFtQBuff9fcVS0Sg")

  // Get and display all of the links in the page
  var links = await driver.findElements(By.partialLinkText("Project"));

  for(let link of links){
    console.log(await link.getText())
  }

  // Display a specific line in the page
  // let line = await driver.findElement(By.partialLinkText("Project"));
  // console.log(await line.getText())
  driver.quit()

}

// Call the function to run
ytScrape()