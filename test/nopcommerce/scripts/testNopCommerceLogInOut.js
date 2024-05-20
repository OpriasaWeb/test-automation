const { By, Builder, until, Key } = require("selenium-webdriver")
const assert = require("assert")

describe("Verify log in and log out functionalities of Nop Commerce", async () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    await driver.get("https://demo.nopcommerce.com/")
  })

  after(async () => {
    await driver.quit()
  })

  it("Verify the URL after clicking the log in link", async () => {

  })

  it("Verify the login functionality with empty credentails", async () => {

  })

  it("Verify the login functionality with wrong credentails", async () => {
    
  })

  it("Verify the login functionality with correct credentails", async () => {
    
  })
})

