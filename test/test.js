const {By, Key, Builder} = require("selenium-webdriver")

require("chromedriver")

async function test_case(){
  let driver = await new Builder().forBrowser("chrome").build()

  await driver.get("https://google.com")

  await driver.findElement(By.name("q")).sendKeys("Hello, World!", Key.RETURN)

  // Stop the automation testing after 10 seconds
  setInterval(() => {
    driver.quit()
  }, 20000)

}

// Call the test case function
test_case()