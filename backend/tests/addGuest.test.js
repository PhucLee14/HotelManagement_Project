const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function login(driver) {
    await driver.get("http://localhost:3000/admin/login");
    let usernameField = await driver.findElement(By.id("username"));
    await usernameField.sendKeys("TK000");

    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("tk000");

    let loginButton = await driver.findElement(By.id("submit"));
    await loginButton.click();

    await driver.sleep(5000);

    console.log("Login successful!");
}

async function navigateToAddGuestPage(driver) {
    let guestPageButton = await driver.findElement(By.id("guest_page"));
    await guestPageButton.click();

    await driver.wait(until.elementLocated(By.id("add_guest")), 5000);
    let addGuestButton = await driver.findElement(By.id("add_guest"));
    await addGuestButton.click();
    await driver.wait(until.elementLocated(By.id("guest_id")), 5000);
    console.log("Navigated to Add Guest page!");
}

async function addGuestWithExistedPhone(driver) {
    let idField = await driver.findElement(By.id("guest_id"));
    await idField.sendKeys("012345678933");

    let nameField = await driver.findElement(By.id("guest_name"));
    await nameField.sendKeys("Nguyễn Thanh Tùng");

    let birthField = await driver.findElement(By.id("guest_birth"));
    await birthField.sendKeys("07-05-1994");

    let phoneField = await driver.findElement(By.id("guest_phonenumber"));
    await phoneField.sendKeys("0988777666");

    let submitButton = await driver.findElement(By.id("submit"));
    await submitButton.click();

    await driver.sleep(5000);
    console.log("Submitted form without name!");
}

async function addGuestWithoutName(driver) {
    let idField = await driver.findElement(By.id("guest_id"));
    await idField.sendKeys("012345678933");

    let birthField = await driver.findElement(By.id("guest_birth"));
    await birthField.sendKeys("07-05-1994");

    let phoneField = await driver.findElement(By.id("guest_phonenumber"));
    await phoneField.sendKeys("0988777666");

    let submitButton = await driver.findElement(By.id("submit"));
    await submitButton.click();

    await driver.sleep(5000);
    console.log("Submitted form without name!");
}

async function addGuestWithoutPhone(driver) {
    let idField = await driver.findElement(By.id("guest_id"));
    await idField.sendKeys("012345678933");

    let nameField = await driver.findElement(By.id("guest_name"));
    await nameField.sendKeys("Nguyễn Thanh Tùng");

    let birthField = await driver.findElement(By.id("guest_birth"));
    await birthField.sendKeys("07-05-1994");

    let submitButton = await driver.findElement(By.id("submit"));
    await submitButton.click();

    await driver.sleep(5000);
    console.log("Submitted form without phone number!");
}

async function addGuestWithoutBirthDate(driver) {
    let idField = await driver.findElement(By.id("guest_id"));
    await idField.sendKeys("012345678933");

    let nameField = await driver.findElement(By.id("guest_name"));
    await nameField.sendKeys("Nguyễn Thanh Tùng");

    let phoneField = await driver.findElement(By.id("guest_phonenumber"));
    await phoneField.sendKeys("0988777666");

    let submitButton = await driver.findElement(By.id("submit"));
    await submitButton.click();

    await driver.sleep(5000);
    console.log("Submitted form without birth date!");
}

(async function testForm() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await login(driver);
        await navigateToAddGuestPage(driver);

        await addGuestWithExistedPhone(driver);
        await navigateToAddGuestPage(driver);

        await addGuestWithoutName(driver);
        await navigateToAddGuestPage(driver);

        await addGuestWithoutPhone(driver);
        await navigateToAddGuestPage(driver);

        await addGuestWithoutBirthDate(driver);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await driver.quit();
    }
})();
