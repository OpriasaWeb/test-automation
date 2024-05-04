const {By, Builder} = require("selenium-webdriver")
const { Select } = require("selenium-webdriver/lib/select")
const assert = require("assert")

describe("Selenium test with Mocha", async () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html")
  })

  it("Check web forms", async () => {
    let title = await driver.getTitle()
    assert.equal("Web form", title)

    await driver.manage().setTimeouts({implicit: 500});

    // fill-in text box
    let text = await driver.findElement(By.name("my-text")).sendKeys("Jeremy")
    let password = await driver.findElement(By.name("my-password")).sendKeys("pass")
    let textarea = await driver.findElement(By.name("my-textarea")).sendKeys("JeremyJeremyJeremyJeremyJeremy")

    // submit by clicking the submit button
    await driver.findElement(By.xpath("//button[@type='submit']")).click()

    // Assert if the message was received
    let message = await driver.findElement(By.id("message")).getText()
    assert.equal("Received!", message)
  })

  it("Check dropdown select and datalist", async () => {
    await driver.manage().setTimeouts({implicit: 500});

    // dropdown select
    let selectCategory = await driver.findElement(By.name("my-select"))
    let selectElement = new Select(selectCategory)
    await selectElement.selectByValue("2")
    
    // For the dropdown select assert
    let selectedOption = await selectElement.getFirstSelectedOption();
    let selectedOptionText = await selectedOption.getText();
    assert.equal("Two", selectedOptionText);

    // dropdown datalist
    let datalistInput = await driver.findElement(By.name("my-datalist"))
    await datalistInput.sendKeys("New York");
    let datalistInputValue = await datalistInput.getAttribute("value");
    assert.equal("New York", datalistInputValue);

    // submit by clicking the submit button
    await driver.findElement(By.xpath("//button[@type='submit']")).click()

    // Assert if the message was received
    let message = await driver.findElement(By.id("message")).getText()
    assert.equal("Received!", message)

  })

  it("Check the upload input", async () => {
    await driver.manage().setTimeouts({implicit: 500});

    // upload file
    await driver.findElement(By.name("my-file")).sendKeys("D:\\PROGRAMMING_HABIT\\test-automation\\assets\\Castlevania1.png")

    // submit by clicking the submit button
    await driver.findElement(By.xpath("//button[@type='submit']")).click()

    // Assert if the message was received
    let message = await driver.findElement(By.id("message")).getText()
    assert.equal("Received!", message)
  })

  // Go back to previous page
  afterEach(async () => {
    // Go back to the previous page after each test case
    await driver.navigate().back();
  });

  // After all it blocks, quit the driver
  after(async () => {
    await driver.quit()
  })

})

