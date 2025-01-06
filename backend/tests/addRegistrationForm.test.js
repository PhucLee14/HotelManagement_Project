const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");

async function login(driver) {
    await driver.get("http://localhost:3000/admin/login");
    await driver.wait(until.elementLocated(By.id("username")), 10000); // Wait for username field
    let usernameField = await driver.findElement(By.id("username"));
    await usernameField.sendKeys("TK001");

    await driver.wait(until.elementLocated(By.id("password")), 10000); // Wait for password field
    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("tk001");

    let loginButton = await driver.findElement(By.id("submit"));
    await loginButton.click();

    // Wait for the next page to load completely
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
    checkoutDate,
    room
) {
    console.log("Filling in the registration form...");

    // Enter Check-in date
    await driver.wait(until.elementLocated(By.id("checkin")), 10000);
    await driver.findElement(By.id("checkin")).clear();
    await driver.findElement(By.id("checkin")).sendKeys(checkinDate);

    // Enter Check-out date
    await driver.wait(until.elementLocated(By.id("checkout")), 10000);
    await driver.findElement(By.id("checkout")).clear();
    await driver.findElement(By.id("checkout")).sendKeys(checkoutDate);

    // Enter Phone Number
    await driver.wait(until.elementLocated(By.id("phoneNumber")), 10000);
    const phoneNumberElement = await driver.findElement(By.id("phoneNumber"));
    if (
        (await phoneNumberElement.isEnabled()) &&
        (await phoneNumberElement.isDisplayed())
    ) {
        await driver.executeScript(
            "arguments[0].value = '';",
            phoneNumberElement
        ); // Sử dụng JavaScript để xóa giá trị
        await phoneNumberElement.sendKeys(phoneNumber);
    } else {
        console.error("Phone number element is not enabled or not displayed");
    }

    await driver.sleep(3000);

    // Continue with other form fields as before
    await driver.wait(until.elementLocated(By.id("roomBooking")), 10000);
    await driver.findElement(By.id("roomBooking")).click();

    await driver.wait(until.elementLocated(By.id("roomType-Superior")), 10000);
    await driver.findElement(By.id("roomType-Superior")).click();

    await driver.wait(until.elementLocated(By.id(room)), 10000);
    await driver.findElement(By.id(room)).click();

    await driver.wait(until.elementLocated(By.id("clientQuantity")), 10000);
    await driver
        .findElement(By.css('#clientQuantity option[value="2"]'))
        .click();

    await driver.sleep(3000);

    await driver.wait(until.elementLocated(By.id("submit-form")), 10000);
    await driver.findElement(By.id("submit-form")).click();

    await driver.sleep(1000);

    await driver.findElement(By.id("create")).click();

    await driver.sleep(5000);

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
            "07-01-2025",
            "08-01-2025",
            "room-601"
        );
        // Test 2: Fill the form with the second set of data
        await fillRegistrationForm(
            driver,
            "0352621828",
            "07-01-2025",
            "08-01-2025",
            "room-602"
        );

        console.log("All tests passed successfully!");
    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await driver.quit();
    }
})();
