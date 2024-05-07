const {By, Builder} = require("selenium-webdriver")
const assert = require("assert")

describe("Test 1: Check disable inputs, empty forms, and unselected radio", () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    await driver.get("https://www.selenium.dev/selenium/web/ajaxy_page.html")
  })

  // Test cases in automation

  it("Check disabled inputs after clicking add label button", async () => {
    await driver.manage().setTimeouts({implicit: 500});
    
    // Click the add label button
    await driver.findElement(By.name("submit")).click()

    // Get all input elements
    let inputs = await driver.findElements(By.tagName("input"))

    // Get the current status message
    let statusMessage = await driver.findElement(By.id("update_butter")).getText()

    // Assert the status message after clicking the button is updating.
    assert.equal("Updating.", statusMessage)

    let pushInputs = []

    // Check if any input is disabled
    let anyDisabled = false; // flag variable
    for (let input of inputs) {
        if (!(await input.isEnabled())) {
            // If there is enable during loading of result, push to array true
            anyDisabled = true;
            pushInputs.push(anyDisabled)
        }
    }

    // If at least one of the element in array is true, then throw an error thru deepEqual assert
    let enableAfterSubmit = false // flag variable
    for(let i = 0; i < pushInputs.length; i++){
      if(pushInputs[i] != true){
        enableAfterSubmit = true
        break;
      }
    }
    assert.deepEqual(false, enableAfterSubmit)
  })

  it("Check empty label text", async () => {
    await driver.manage().setTimeouts({implicit: 500});

    // Click the add label button
    await driver.findElement(By.name("submit")).click()

    let typer = await driver.findElement(By.name("typer")).getText()
    assert.equal('', typer)
  })

  it("Check unselect label color", async () => {
    await driver.manage().setTimeouts({implicit: 500});

    // Click the add label button
    await driver.findElement(By.name("submit")).click()

    let radioInputs = await driver.findElements(By.xpath("//input[@type='radio']"))

    let anySelected = false // flag variable
    for(let radioInput of radioInputs){
      if(await radioInput.isSelected()){
        anySelected = true
        break
      }
    }

    assert.strictEqual(false, anySelected)
  })

})