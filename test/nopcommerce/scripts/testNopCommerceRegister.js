const { By, Builder, until, Key } = require("selenium-webdriver")
const { Select } = require("selenium-webdriver/lib/select")
const assert = require("assert")

// describe block
describe("Verify register functionalities of Nop Commerce", async () => {
  // Set global timeout for all it block executions
  // this.timeouts(30000)

  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    await driver.get("https://demo.nopcommerce.com/")
  })

  after(async () => {
    await driver.quit()
  })

  // it block
  it("Verify register with required empty credentials", async () => {
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

  it("Assert email first validation message", async () => {
    // Set an implicit wait timeout
    await driver.manage().setTimeouts({ implicit: 500 })

    // async function emailSendKeys(email){
    //   let emailField = await driver.findElement(By.id('Email'));
    //   await emailField.clear(); // Ensure the field is clear before sending keys
    //   await emailField.sendKeys(email, Key.RETURN);
    // }

    let emailField = await driver.findElement(By.id('Email'));
    await emailField.sendKeys("first@gmail", Key.RETURN);

    let emailErrorOne = await driver.wait(until.elementLocated(By.id("Email-error")), 5000)
    await driver.wait(until.elementIsVisible(emailErrorOne), 5000)

    let emailErrorMsg = await emailErrorOne.getText()
    assert.strictEqual(emailErrorMsg, "Wrong email")
  })

  it("Assert email second validation message", async () => {
    // Set an implicit wait timeout
    await driver.manage().setTimeouts({ implicit: 500 })

    let emailField = await driver.findElement(By.id('Email'));
    await emailField.clear(); // Ensure the field is clear before sending keys
    await emailField.sendKeys("second@gmail.", Key.RETURN);

    let emailErrorTwo = await driver.wait(until.elementLocated(By.id("Email-error")), 5000) // Locate the element
    await driver.wait(until.elementIsVisible(emailErrorTwo), 5000)

    let emailErrorMsgTwo = await emailErrorTwo.getText()
    assert.strictEqual(emailErrorMsgTwo, "Please enter a valid email address.")
  })

  // Successful registration
  it("Verify correct credentials upon registration", async () => {
    await driver.manage().setTimeouts({ implicit: 500 })

    // Personal details
    await driver.findElement(By.xpath("//input[@type='radio' and @id='gender-male']")).click()
    await driver.findElement(By.id("FirstName")).sendKeys("Jeremy")
    await driver.findElement(By.id("LastName")).sendKeys("Asairpo")

    // Date of birth - day
    const day = await driver.findElement(By.name("DateOfBirthDay"))
    const selectDay = new Select(day)
    selectDay.selectByValue("14")

    // Date of birth - month
    const month = await driver.findElement(By.name("DateOfBirthMonth"))
    const selectMonth = new Select(month)
    selectMonth.selectByValue("1")

    // Date of birth - year
    const year = await driver.findElement(By.name("DateOfBirthYear"))
    const selectYear = new Select(year)
    selectYear.selectByValue("1933")

    // Email
    await driver.findElement(By.xpath("//input[@type='email' and @id='Email']")).clear() // clear the email
    await driver.findElement(By.xpath("//input[@type='email' and @id='Email']")).sendKeys("asairpojbbb@gmail.com")

    // Company details
    await driver.findElement(By.id("Company")).sendKeys("iixxss")

    // Password
    await driver.findElement(By.id("Password")).sendKeys("testtesttest")
    await driver.findElement(By.id("ConfirmPassword")).sendKeys("testtesttest")

    // Submit
    await driver.findElement(By.name("register-button")).click()

    // Assertions section
    const result = await driver.findElement(By.className("result")).getText()
    assert.strictEqual(result, "Your registration completed", "Successfully register an account!")

    const headerLinks = await driver.findElement(By.className("header-links"))

    // Find the My account link
    const myAccountLink = await headerLinks.findElement(By.className("ico-account"))
    const logoutLink = await headerLinks.findElement(By.className("ico-logout"))

    assert.strictEqual(await myAccountLink.getText(), "MY ACCOUNT")
    assert.strictEqual(await logoutLink.getText(), "LOG OUT")
    // Assertions section
  })

})