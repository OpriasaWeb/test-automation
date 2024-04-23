// https://filebin.net/
const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")


async function testUploadFile(){

  // Create a driver
  let driver = await new Builder().forBrowser("chrome").build()

  // Get and display all of the links in the page
  await driver.get(`https://filebin.net/`)

  let input = await driver.findElement(By.id("fileField"))

  await input.sendKeys("D:\\JEREMY OPRIASA's files\\DREAM CAR AND MOTOR\\1.png")


}

// Call the function to run
testUploadFile()