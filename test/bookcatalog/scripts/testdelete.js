const { By, Builder, until } = require("selenium-webdriver")
const assert = require("node:assert")

// Describe block
describe("Verify delete functionality of Book Catalog", async () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
  })

  beforeEach(async () => {
    await driver.get('http://localhost/bookcatalog/views/bookcatalog.php')
  })

  after(async () => {
    await driver.quit()
  })

  // It or test block
  it("Verify the text modal of delete functionality", async () => {
    try {
      const deleteButton = await driver.wait(until.elementLocated(By.xpath("//button[@id='delete' and @value='44']")), 5000)
      await deleteButton.click()

      // Wait for the modal to show up
      const deleteValidationElement = await driver.wait(until.elementLocated(By.id("delvalidationmssg")), 5000)
      await driver.wait(until.elementIsVisible(deleteValidationElement), 5000)
      const deleteValidationText = await deleteValidationElement.getText()

      console.log(deleteValidationText)
      assert.equal("Are you sure to delete this book?", deleteValidationText)

    } catch (err) {
      console.log("General error one: ", err)
    }
  })

  it("Verify back button of delete modal", async () => {

  })

  it("Verify deleting the one book of in the Book Catalog", async () => {

  })

})
