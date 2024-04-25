const {By, until, Builder, Browser} = require('selenium-webdriver');
require("chromedriver")


async function deleteBook(){
  let driver
  let shouldQuit = false // flag to control when to quit the driver

  try{

    // Create driver
    driver = await new Builder().forBrowser(`chrome`).build()

    // Get and display my book catalog project (CRUD)
    await driver.get("http://localhost/bookcatalog/views/bookcatalog.php")

    await driver.findElement(By.xpath("//button[@id='delete' and @value='31']")).click()
    // const deleteButton = 
    // deleteButton.click()

    // For cancel or back delete button
    try{
      console.log("Click the delete to cancel it for testing")
      // Wait for the cancel button to become present in the DOM
      await driver.wait(until.elementLocated(By.id('canceldelete')), 5000);

      // Find the cancel button and click it
      const cancelDeleteButton = await driver.findElement(By.id('canceldelete'));
      await cancelDeleteButton.click();
      console.log("Cancel button clicked successfully.");

    }
    catch(err){
      console.log("Clicking delete back button occured an error: ", err)
    }


    // deleteButton.click()
    await driver.findElement(By.xpath("//button[@id='delete' and @value='31']")).click()
    // For delete submit button
    try{
      console.log("Click the delete to submit it for testing")

      // Wait for the cancel button to become present in the DOM
      await driver.wait(until.elementLocated(By.id('deletebook')), 5000);

      // Find the cancel button and click it
      const buttonDeleteBook = await driver.findElement(By.id('deletebook'));
      await buttonDeleteBook.click();
      console.log("Delete book successfully.");

      // // Button whether delete button successful or failed
      try{  
        
        await driver.wait(until.elementLocated(By.id('okdelete')), 5000)
        const okButton = await driver.findElement(By.id('okdelete'))
        await okButton.click()
        console.log("Click the ok and refresh the table")
      }
      catch(err){
        console.log("An error occured as we click the Ok button after performing delete: ", err)
      }

    }
    catch(err){
      console.log("An error occured while deleting the book: ", err)
    }

    

    if(!shouldQuit){
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