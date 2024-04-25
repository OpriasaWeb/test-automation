const {By, until, Builder, Browser} = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
require("chromedriver")

async function bookCatalog(){
  let driver
  let shouldQuit = false // flag to control when to quit the driver
  try{
    driver = await new Builder().forBrowser("chrome").build()

    // Get and display my book catalog project (CRUD)
    await driver.get("http://localhost/bookcatalog/views/bookcatalog.php")

    await driver.findElement(By.css(".addbook")).click()

    // NOTE: Test to fill-up inputs in the add modal
    try{
      await driver.findElement({id: 'title'}).sendKeys("Let Me Know")
      await driver.findElement({id: 'isbn'}).sendKeys("111213")
      await driver.findElement({id: 'author'}).sendKeys("Lany only")
      await driver.findElement({id: 'publisher'}).sendKeys("Album: While Driving")

      // To select the category
      const selectElement = await driver.findElement({id: 'category'})
      // Wrap the select element with the Select class
      const select = new Select(selectElement)
      await select.selectByValue("1")

      try{
        // Click the add button
        const addButton = await driver.findElement({ id: 'addbook' })
        await addButton.click()
        console.log("Successfully add new book")
        // Modal after successfully add new book
        try{
          // Wait until the button with the id: okMessageSuccess shows up
          const okSuccessModal = await driver.findElement({ id: 'okMessageSuccess' })
          await driver.wait(until.elementIsVisible(okSuccessModal));
          await okSuccessModal.click()
          console.log("Refresh the table")
        }
        catch(err){
          console.log("Error occured while handling success modal: ", err)
        }
      }
      catch(err){
        console.log("An error occur while adding new book: ", err)
      }

    }
    catch(err){
      console.log("Error occured while fill up the forms: ", err)
    }

    // Cntrl + C to quit the session of automation
    while(!shouldQuit){
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 1 second before checking again
    }
  }
  catch(e){
    console.log(e)
  }
  finally{
    if(driver){
      await driver.quit()
    }
  }
}

bookCatalog()
