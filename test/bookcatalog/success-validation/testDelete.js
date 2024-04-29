const {By, until, Builder, Browser} = require('selenium-webdriver');
require("chromedriver")


async function deleteBook(){
  let driver
  let shouldQuit = false // flag to control when to quit the driver

  try{

    // Create driver
    driver = await new Builder().forBrowser(`MicrosoftEdge`).build()

    // Get and display my book catalog project (CRUD)
    await driver.get("http://localhost/bookcatalog/views/bookcatalog.php")

    const deleteButton = await driver.findElement(By.xpath("//button[@id='delete' and @value='44']")) // Please change the value id as you move forward with your testing, specially when delete test successful or else it will produce an error due to no existing xpath

    // Click the delete button
    deleteButton.click()

    // For cancel or back delete button
    try{
      console.log("Test 1: Cancel the delete")
      // Wait for the cancel button to become present in the DOM
      await driver.wait(until.elementLocated(By.id('canceldelete')), 5000);

      // Find the cancel button and click it
      const cancelDeleteButton = await driver.findElement(By.id('canceldelete'));
      await cancelDeleteButton.click();
      console.log("Test 2: Cancel button clicked successfully.");

    }
    catch(err){
      console.log("Clicking delete back button occured an error: ", err)
    }

    // Reclick the delete button
    deleteButton.click()

    // For delete submit button
    try{
      // Wait for the cancel button to become present in the DOM, kind of respecting the load
      await driver.wait(until.elementLocated(By.id('deletebook')), 5000);

      // Find the cancel button and click it
      const buttonDeleteBook = await driver.findElement(By.id('deletebook'));
      await buttonDeleteBook.click();
      console.log("Test 3: Click the delete to submit it for testing")

      // Button whether delete button successful or failed
      try{  
        console.log("Test 4: Delete book successfully.");

        // Wait for the cancel button to become present in the DOM, kind of respecting the load
        const okButton = await driver.findElement(By.id('okdelete'))

        if(await driver.wait(until.elementIsVisible(okButton), 5000)){
          try{
            await okButton.click()
            console.log("Test 5: Click the ok and refresh the table")
          }
          catch(err){
            console.log("No ok button after delete exist: ", err)
          }
        }
        else{
          console.log("No ok button after delete exist.")
        }

        
      }
      catch(err){
        console.log("An error occured as we click the Ok button after performing delete: ", err)
      }

    }
    catch(err){
      console.log("An error occured while deleting the book: ", err)
    }


    while(!shouldQuit){
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before checking again
    }
  }
  catch(err){
    console.log("General error: ", err)
  }
  finally{
    if(driver){
      await driver.quit()
    }
  }

}

// Call the function to run
deleteBook()