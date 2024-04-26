const {By, until, Builder, Browser} = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
const chai = require("assert")
require("chromedriver")

async function editBook(){
  let driver
  let shouldQuit = false // flag to control when to quit the driver

  try {
    // Create driver
    driver = await new Builder().forBrowser("MicrosoftEdge").build()

    // Get and display book catalog project (CRUD)
    await driver.get("http://localhost/bookcatalog/views/bookcatalog.php")

    // Since we are going to update some info, we will be using xpath to locate specific book available
    const editButton = await driver.findElement(By.xpath("//button[@id='edit' and @value='44']"))

    // Click the edit button
    editButton.click()
    console.log("Test 1: Click the edit button")

    // Cancel the update
    try {
      // Wait for edit back button to become present in the DOM, in this case, wait for the modal to shows up
      if(await driver.wait(until.elementLocated(By.id("backedit")), 5000)){
        try {
          console.log("Test 2: Edit modal shows up")
          const backEdit = await driver.findElement(By.id("backedit"))
          await backEdit.click()
          console.log("Test 3: Click the back edit button")
        } catch (err) {
          console.log("Error 2: No backedit id found - ", err)
        }
      }
    } catch (err) {
      console.log("Error 1: An error occur while clicking the back edit button - ", err)
    }

    editButton.click()
    console.log("Test 4: Reclick the edit button to test nothing was changed response")

    // Click update button without changing any details
    if(await driver.wait(until.elementLocated(By.id("updatebook")), 5000)){
      try {
        const submitEdit = await driver.findElement(By.id("updatebook"))
        await submitEdit.click()
        console.log("Test 5: Click the submit edit button")

        // Nothing was changed successfully shows up
        if(await driver.findElement(By.id("editSuccessOk"))){
          console.log("Test 6: Nothing was changed shows up")

          // Click the ok button of nothing was changed modal
          try {
            await driver.findElement(By.id("editSuccessOk")).click()
          } catch (err) {
            console.log("Error 4: An error occur while clicking the ok button in modal - ", err)
          }

          console.log("Test 7: Clicked the ok button of nothing was changed modal")
        }

      } catch (err) {
        console.log("Error 3: No updatebook id found - ", err)
      }
    }

    // Empty the value and click the update
    editButton.click()
    console.log("Test 8: Reclick the edit button to test update with an empty form/s")

    // Evaluate if the IDs of forms and buttons is existing
    if(
      await driver.wait(until.elementLocated(By.id("updatebook")), 5000) && 
      await driver.wait(until.elementLocated(By.id("title")), 5000)
      ){
      try {
        const titleInput = await driver.findElement({ id: 'title' });
        await titleInput.clear();
        await titleInput.sendKeys("");
        // await driver.findElement({ id: 'title' }).clear()
        // await driver.findElement({ id: 'title' }).sendKeys("")
        // await driver.findElement({id: 'isbn'}).sendKeys("")
        // await driver.findElement({id: 'author'}).sendKeys("")
        // await driver.findElement({id: 'publisher'}).sendKeys("")

        // const submitEdit = await driver.findElement(By.id("updatebook"))
        // await submitEdit.click()
        console.log("Test 9: Click the submit edit button with at least one empty form/s")

        // editErrOk

      } catch (err) {
        console.log("Error 4: No updatebook id found - ", err)
      }
    }
      // If so, then create variables to store the existed forms IDs
    // Click the ok button to go back to update modal, kind of loop here
    

    // Change the details and try to update

    if(!shouldQuit){
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  } catch (err) {
    console.log("General error: ", err)
  } finally{
    if(driver){
      await driver.quit()
    }
  }


}

// Call the function to run
editBook()