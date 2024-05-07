const {By, Builder, until} = require("selenium-webdriver")
const assert = require("assert")

describe("Test 2: Check filled forms, selected radio, and result", async () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    await driver.get("https://www.selenium.dev/selenium/web/ajaxy_page.html")
  })

  it("Check fill label text", async () => {
    // Set an implicit wait timeout
    await driver.manage().setTimeouts({ implicit: 500 });

    // Type "test" into the input field
    await driver.findElement(By.name("typer")).sendKeys("test");

    // Click the submit button
    await driver.findElement(By.name("submit")).click();

    // Wait for the label to appear
    await driver.wait(until.elementLocated(By.css(".label")), 5000);

    // Get the text of the label
    let textLabel = await driver.findElement(By.css(".label")).getText();

    // Assert that the label text is "test"
    assert.equal("test", textLabel);
  });

  it("Check the select radio", async () => {
    await driver.manage().setTimeouts({ implicit: 500 });

    let radioInputs = await driver.findElements(By.xpath("//input[@type='radio']"))
    
    await radioInputs.click();

    let anySelected = false // flag variable
    for(let radioInput of radioInputs){
      if(await radioInput.isSelected()){
        anySelected = true
        break
      }
    }

    if(anySelected != false){
      // Get the background color style
      let backgroundColor = await element.getCssValue('background-color');
      assert.equal("background-color", backgroundColor)
    }

  })



})
