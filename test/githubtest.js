const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")

async function test_case(){
  // Create driver
  let driver = await new Builder().forBrowser("chrome").build()

  // Send driver to website
  await driver.get("https://github.com")

  // Grab an element from the page
  await driver.findElement(By.partialLinkText("Sign in")).click()

  // Display the title in console
  console.log("Console: "+await driver.getTitle())

  let title = await driver.getTitle()
  
  if(title === `GitHub: Let’s build from here · GitHub`){
    console.log("Test #1 success")
  }
  else{
    console.log("Test #1 failed")
    return
  }

  // Try to input a username and password
  await driver.findElement(By.name("login")).sendKeys("OpriasaWeb")
  await driver.findElement(By.name("password")).sendKeys("**********", Key.RETURN)

  // If invalid username or password shows up
  if(await driver.findElement(By.className("flash-close js-flash-close")).isDisplayed()){
    console.log("Test #2 success")
  }

  setInterval(() => {
    driver.quit()
  }, 20000)

}

// Call the function
test_case()