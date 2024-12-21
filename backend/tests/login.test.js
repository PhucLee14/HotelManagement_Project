const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function loginFail(driver) {
    await driver.get("http://localhost:3000/admin/login");
    let usernameField = await driver.findElement(By.id("username"));
    await usernameField.sendKeys("TK001");

    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("tk000");

    let loginButton = await driver.findElement(By.id("submit"));
    await loginButton.click();

    await driver.sleep(5000);

    console.log("Login successful!");
}

async function loginSuccess(driver) {
    await driver.get("http://localhost:3000/admin/login");
    let usernameField = await driver.findElement(By.id("username"));
    await usernameField.sendKeys("TK000");

    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("tk000");
    await driver.sleep(3000);

    let loginButton = await driver.findElement(By.id("submit"));
    await loginButton.click();

    await driver.sleep(5000);

    console.log("Login successful!");
}

(async function testForm() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await loginFail(driver);
        await loginSuccess(driver);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await driver.quit();
    }
})();
