const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");

async function login(driver) {
    await driver.get("http://localhost:3000/admin/login");
    let usernameField = await driver.findElement(By.id("username"));
    await usernameField.sendKeys("TK001");

    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("tk001");

    let loginButton = await driver.findElement(By.id("submit"));
    await loginButton.click();

    await driver.sleep(5000);

    console.log("Login successful!");
}

async function navigateToAddRegistrationFormPage(driver) {
    let registrationPageButton = await driver.findElement(
        By.id("registration_page")
    );
    await registrationPageButton.click();

    await driver.wait(until.elementLocated(By.id("add_registration")), 5000);
    let addRegistrationButton = await driver.findElement(
        By.id("add_registration")
    );
    await addRegistrationButton.click();

    console.log("Navigated to Add Registration Form page!");
}

async function fillRegistrationForm(
    driver,
    phoneNumber,
    checkinDate,
    checkoutDate
) {
    console.log("Filling in the registration form...");

    // Enter Check-in date
    await driver.wait(until.elementLocated(By.id("checkin")), 10000);
    await driver.findElement(By.id("checkin")).sendKeys(checkinDate);

    // Enter Check-out date
    await driver.wait(until.elementLocated(By.id("checkout")), 10000);
    await driver.findElement(By.id("checkout")).sendKeys(checkoutDate);

    // Enter Phone Number
    await driver.wait(until.elementLocated(By.id("phoneNumber")), 10000);
    await driver.findElement(By.id("phoneNumber")).sendKeys(phoneNumber);

    // Continue with other form fields as before
    await driver.wait(until.elementLocated(By.id("roomBooking")), 10000);
    await driver.findElement(By.id("roomBooking")).click();

    await driver.wait(until.elementLocated(By.id("roomType-Superior")), 10000);
    await driver.findElement(By.id("roomType-Superior")).click();

    await driver.wait(until.elementLocated(By.id("room-602")), 10000);
    await driver.findElement(By.id("room-602")).click();

    await driver.wait(until.elementLocated(By.id("clientQuantity")), 10000);
    await driver
        .findElement(By.css('#clientQuantity option[value="2"]'))
        .click();

    await driver.wait(until.elementLocated(By.id("submit-form")), 10000);
    await driver.findElement(By.id("submit-form")).click();

    console.log(
        "Registration form submitted with phone number:",
        phoneNumber,
        "Check-in:",
        checkinDate,
        "Check-out:",
        checkoutDate
    );
}

(async function runTestsSequentially() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        // Test 1: Fill the form with the first set of data
        await login(driver);
        await navigateToAddRegistrationFormPage(driver);
        await fillRegistrationForm(
            driver,
            "0123456789",
            "01-10-2023",
            "10-10-2023"
        );

        // Test 2: Fill the form with the second set of data
        await login(driver); // Re-login if needed
        await navigateToAddRegistrationFormPage(driver);
        await fillRegistrationForm(
            driver,
            "0352621828",
            "15-10-2023",
            "20-10-2023"
        );

        // Test 2: Fill the form with the third set of data
        await login(driver); // Re-login if needed
        await navigateToAddRegistrationFormPage(driver);
        await fillRegistrationForm(
            driver,
            "0352621828",
            "07-01-2025",
            "09-01-2025"
        );

        console.log("All tests passed successfully!");
    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await driver.quit();
    }
})();
