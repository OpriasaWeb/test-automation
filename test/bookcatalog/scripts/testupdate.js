const {By, until, Builder, Browser} = require('selenium-webdriver');
const { suite, test } = require('selenium-webdriver/testing');
const assert = require("assert"); // assert using node js assertion

// Describe block
describe("Test the validations of edit", async () => {

  let driver
  let shouldQuit = false // flag to control when to quit the driver

  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });
  
  beforeEach(async ()=> {
    await driver.get('http://localhost/bookcatalog/views/bookcatalog.php');
  })

  after(async () => {
    driver.quit()
  })

  // It blocks: 
  // Test back button after clicking the edit button in table
  it("Verify if back button is working", async () => {
    try {
      // Since we are going to update some info, we will be using xpath to locate specific book available
      if(await driver.wait(until.elementLocated(By.xpath("//button[@id='edit' and @value='45']")), 5000)){
        const editButton = await driver.findElement(By.xpath("//button[@id='edit' and @value='45']"))

        // Click the edit button
        await editButton.click()
  
        // Scenario 1: Click the edit, show the modal, and cancel the edit
        if(await driver.wait(until.elementLocated(By.id("backedit")), 5000)){
          try {
            const backEdit = await driver.findElement(By.id("backedit"))
            await backEdit.click()
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
  it("Verify if 'Nothing was changed' modal would pop out", async () => {
    try {

      // Since we are going to update some info, we will be using xpath to locate specific book available
      if(await driver.wait(until.elementLocated(By.xpath("//button[@id='edit' and @value='45']")), 5000)){
        const editButton = await driver.findElement(By.xpath("//button[@id='edit' and @value='45']"))

        // Click the edit button
        await editButton.click()

        // Scenario 1: Click the edit, show the modal, and cancel the edit
        if(await driver.wait(until.elementLocated(By.id("updatebook")), 5000)){
          try {
            const updateButton = await driver.findElement(By.id("updatebook"))
            assert.equal("Update", await updateButton.getText())
            await updateButton.click()

            if(await driver.wait(until.elementLocated(By.id("editSuccessOk")), 5000)){
              const okButton = await driver.findElement(By.id("editSuccessOk"))
              assert.equal("Ok", await okButton.getText())

              const validationMessage = await driver.findElement(By.id("editsuccessmessage")).getText()
              assert.equal("Nothing was changed.", validationMessage)

              await okButton.click()
            }
            else{
              console.log("Error 6: Nothing was changed modal does not exist.")
            }

          } catch (err) {
            console.log("Error 5: No updatebook id found - ", err)
          }
        }
        else{
          console.log("Error 4: Back edit button in the modal not existing.")
        }
      }
      else{
        console.log("Error 3: No edit button and value found")
      }
      

    } catch (err) {
      console.log("General error of nothing was changed: ", err)
    } 
  })

  // Cntrl + C to quit the session of automation
  // while(!shouldQuit){
  //   await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
  // }

  // if(driver){
  //   await driver.quit()
  // }

})

