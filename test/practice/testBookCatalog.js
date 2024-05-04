const {By, until, Builder, Browser} = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
require("chromedriver")
// require("edgedriver")

async function bookCatalog(){
  let driver
  let shouldQuit = false // flag to control when to quit the driver
  try{
    driver = await new Builder().forBrowser("MicrosoftEdge").build()

    // Get and display my book catalog project (CRUD)
    await driver.get("http://localhost/bookcatalog/views/bookcatalog.php")

    await driver.findElement(By.css(".addbook")).click()

    // NOTE: Test to fill-up inputs in the add modal
    try{
      await driver.findElement({id: 'title'}).sendKeys("Nyare guys")
      await driver.findElement({id: 'isbn'}).sendKeys("123123")
      await driver.findElement({id: 'author'}).sendKeys("Bruh")
      await driver.findElement({id: 'publisher'}).sendKeys("Album: While Searching")

      // To select the category
      const selectElement = await driver.findElement({id: 'category'})

      // Wrap the select element with the Select class
      const select = new Select(selectElement)
      await select.selectByValue("3")

      try{
        // Click the add button
        const addButton = await driver.findElement({ id: 'addbook' })
        await addButton.click()
        console.log("Test 1: Successfully add new book")

        // Modal after successfully add new book
        try{
          const okSuccessModal = await driver.findElement({ id: 'okMessageSuccess' })

          // Wait until the button with the id: okMessageSuccess shows up
          await driver.wait(until.elementIsVisible(okSuccessModal));
          await okSuccessModal.click()
          console.log("Test 2: Refresh the table")
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

    // NOTE: Test back button after clicking add button
    try {
      // Click again the add button
      await driver.findElement(By.css(".addbook")).click()
      
      const backButton = await driver.findElement({ id: 'backadd' });

      // Element found, do something with it
      await backButton.click()
      console.log("Test 3: Back add button clicked!")
    } catch (error) {
      // Element not found, handle the error
      console.log("Back button not found:", error);
    }

    // Cntrl + C to quit the session of automation
    while(!shouldQuit){
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
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
