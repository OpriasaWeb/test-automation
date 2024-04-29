const {By, until, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert"); // assert using node js assertion

// Describe block
describe("Test the validations of edit", async () => {

  let driver
  // let shouldQuit = false // flag to control when to quit the driver

  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });
  
  beforeEach(async ()=> {
    await driver.get('http://localhost/bookcatalog/views/bookcatalog.php');
  })

  // It blocks: 
  // Test back button after clicking the edit button in table
  it("Check if back button is working", async () => {
    try {
      // Since we are going to update some info, we will be using xpath to locate specific book available
      if(await driver.wait(until.elementLocated(By.xpath("//button[@id='edit' and @value='45']")), 5000)){
        const editButton = await driver.findElement(By.xpath("//button[@id='edit' and @value='45']"))

        // Click the edit button
        await editButton.click()
        console.log("Test 1: Click the edit button")
  
        // Scenario 1: Click the edit, show the modal, and cancel the edit
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
        else{
          console.log("Error 1: Back edit button in the modal not existing.")
        }
      }

    } catch (err) {
      console.log("General error of back button: ", err)
    } 
  })

  
  // Test update button without changing details from inputs
  it("Check if 'Nothing was changed' modal would pop out", async () => {
    try {

      // Since we are going to update some info, we will be using xpath to locate specific book available
      if(await driver.wait(until.elementLocated(By.xpath("//button[@id='edit' and @value='45']")), 5000)){
        const editButton = await driver.findElement(By.xpath("//button[@id='edit' and @value='45']"))

        // Click the edit button
        await editButton.click()
        console.log("Test 4: Click the edit button")

        // Scenario 1: Click the edit, show the modal, and cancel the edit
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
        else{
          console.log("Error 1: Back edit button in the modal not existing.")
        }
      }
      

    } catch (err) {
      console.log("General error of nothing was changed: ", err)
    } 
  })

  // Check if ok button is clickable in the 'Nothing was change' modal
  // it("Click ok button in modal", async () => {
  //   // Scenario 2: Click the edit, show the modal, click the update immediately, and expect the "Nothing was changed" modal
  //   if(await driver.wait(until.elementLocated(By.id("updatebook")), 5000)){
  //     try {
  //       console.log("Test 5: Edit modal shows up")

  //       const updateBook = await driver.findElement(By.id("updatebook"))
  //       await updateBook.click()
  //       console.log("Test 6: Click the update to test the 'Nothing was changed.' ")

  //       // Click the ok button when modal nothing was changed successfully show up
  //       if(await driver.wait(until.elementLocated(By.id("editSuccessOk")), 5000)){
  //         try {
  //           const okNthngwschngd = await driver.findElement(By.id("editSuccessOk"))

  //           let booktitle = await driver.findElement(By.id("edittitle")).getAttribute(value)
  //           console.log(booktitle)

  //           const nothingWasChangedText = await driver.findElement(By.id("editsuccessmessage")).getText().then((value) => {
  //             return value
  //           });
  //           await okNthngwschngd.click()

  //           // NOTE: Assertion part of testing below

  //           // assert using nodejs assert
  //           assert.strictEqual(nothingWasChangedText, "Nothing was changed.")

  //           // NOTE: Assertion part of testing above

  //           console.log("Test 7: Click the ok button of nothing was changed modal.")
  //         } catch (err) {
  //           console.log("Error 6: No editSuccessOk id found - ", err)
  //         }
  //       }
  //       else{
  //         console.log("Error 5: Ok button in nothing was changed modal not exist.")
  //       }

  //     } catch (err) {
  //       console.log("Error 4: No updatebook id found - ", err)
  //     }
  //   }
  //   else{
  //     console.log("Error 3: Update edit button in the modal not existing.")
  //   }
  // })

  // Cntrl + C to quit the session of automation
  while(!shouldQuit){
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
  }

  if(driver){
    await driver.quit()
  }

})

