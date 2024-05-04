const { By, until, Builder } = require('selenium-webdriver');

// Describe block
describe("Login page testing", async () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
  });

  beforeEach(async () => {
    await driver.get("https://the-internet.herokuapp.com/login"); // login page
  });

  // It block
  it("Check invalid input", async () => {
    // Username
    await driver.findElement(By.xpath("//input[@id='username']"))
      .sendKeys("smith");
    // Password
    await driver.findElement(By.xpath("//input[@id='password']"))
      .sendKeys("qweqwe");
    // Submit
    await driver.findElement(By.xpath("//button[@class='radius' and @type='submit']"))
      .click();

    let validationText = await driver.findElement(By.id("flash")).getText();
    const chai = await import('chai');
    const assert = chai.assert;
    assert.equal(validationText, "Your username is invalid!\n×");
  });

  it("Check valid input", async () => {
    // Username
    await driver.findElement(By.xpath("//input[@id='username']"))
      .sendKeys("tomsmith");
    // Password
    await driver.findElement(By.xpath("//input[@id='password']"))
      .sendKeys("SuperSecretPassword!");
    // Submit
    await driver.findElement(By.xpath("//button[@class='radius' and @type='submit']"))
      .click();

    // Check the logout
    await driver.wait(until.elementLocated(By.id("flash")), 5000);
    let validationText = await driver.findElement(By.id("flash")).getText();
    const chai = await import('chai');
    const assert = chai.assert;
    assert.equal(validationText, "You logged into a secure area!\n×");

    await driver.wait(until.elementLocated(By.className("radius")), 500)
    await driver.findElement(By.xpath("//a[@class='button secondary radius']")).click();


  });

});


  

  