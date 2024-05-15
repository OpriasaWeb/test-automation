const { By, Builder, until, Key } = require("selenium-webdriver")
const { Select } = require("selenium-webdriver/lib/select")
const assert = require("assert")

// describe block
describe("Verify register functionalities of Nop Commerce", async () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    await driver.get("https://demo.nopcommerce.com/")
  })

  // it block
  it("Verify register with required empty details", async () => {
    await driver.findElement(By.css(".ico-register")).click()
    let registerTitle = await driver.getTitle()
    assert.strictEqual(registerTitle, "nopCommerce demo store. Register")

    // Set an implicit wait timeout
    await driver.manage().setTimeouts({ implicit: 500 });

    await driver.findElement(By.name("register-button")).click()

    // Wait until the error message is visible - firstname
    let fnameErrElement = await driver.wait(until.elementLocated(By.id("FirstName-error")), 5000)
    await driver.wait(until.elementIsVisible(fnameErrElement), 5000)
    let firstNameErr = await fnameErrElement.getText()
    assert.equal(firstNameErr, "First name is required.")

    // NOTE: Since the loading is done on automation, meaning all the invisible element is now visible

    // Last name
    let lnameErrElement = await driver.findElement(By.id("LastName-error"))
    let lastNameErr = await lnameErrElement.getText()
    assert.equal(lastNameErr, "Last name is required.")

    // Email
    let emailErrElement = await driver.findElement(By.id("Email-error"))
    let emailErr = await emailErrElement.getText()
    assert.equal(emailErr, "Email is required.")

    // Password
    let passErrElement = await driver.findElement(By.id("ConfirmPassword-error"))
    let passErr = await passErrElement.getText()
    assert.equal(passErr, "Password is required.")
  })

  // it("Assert email validation messages", async () => {

  //   async function emailSendKeys(email){
  //     let emailField = await driver.findElement(By.id('Email'));
  //     await emailField.clear(); // Ensure the field is clear before sending keys
  //     await emailField.sendKeys(email, Key.RETURN);
  //   }

  //   // Verify wrong email validation error
  //   emailSendKeys("first@gmail")
  //   let emailErrorOne = await driver.wait(until.elementLocated(By.id("Email-error")), 5000)
  //   await driver.wait(until.elementIsVisible(emailErrorOne), 5000)

  //   let emailErrorMsg = await emailErrorOne.getText()
  //   assert.strictEqual(emailErrorMsg, "Wrong email")

  //   // Set an implicit wait timeout
  //   await driver.manage().setTimeouts({ implicit: 500 })

  //   // Verify enter a valid email address validation error
  //   emailSendKeys("second@gmail.")
  //   let emailErrorTwo = await driver.wait(until.elementLocated(By.id("Email-error")), 10000) // Re-locate the element
  //   await driver.wait(until.elementIsVisible(emailErrorTwo), 10000)

  //   let emailErrorMsgTwo = await emailErrorTwo.getText()
  //   assert.strictEqual(emailErrorMsgTwo, "Please enter a valid email address.")

  // })

  // result id
  it("Verify ", async () => {

  })

})