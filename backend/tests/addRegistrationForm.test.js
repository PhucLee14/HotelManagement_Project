const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
require('chromedriver');

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
    let registrationPageButton = await driver.findElement(By.id("registration_page"));
    await registrationPageButton.click();

    await driver.wait(until.elementLocated(By.id("add_registration")), 5000);
    let addRegistrationButton = await driver.findElement(By.id("add_registration"));
    await addRegistrationButton.click();

    console.log("Navigated to Add Registration Form page!");
}

(async function addRegistrationFormTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Perform login
        await login(driver);

        // Navigate to the registration form page
        await navigateToAddRegistrationFormPage(driver);

        // Wait for the Check-in date field to be present
        console.log('Waiting for the Check-in date field...');
        await driver.wait(until.elementLocated(By.id('checkin')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('checkin')).sendKeys('2023-10-01');

        // Wait for the Check-out date field to be present
        console.log('Waiting for the Check-out date field...');
        await driver.wait(until.elementLocated(By.id('checkout')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('checkout')).sendKeys('2023-10-10');

        // Wait for the customer phone number field to be present
        console.log('Waiting for the customer phone number field...');
        await driver.wait(until.elementLocated(By.id('phoneNumber')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('phoneNumber')).sendKeys('0123456789');

        // Select a room booking
        console.log('Selecting a room booking...');
        await driver.wait(until.elementLocated(By.id('roomBooking')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('roomBooking')).click();

        // Select room type
        console.log('Selecting room type...');
        await driver.wait(until.elementLocated(By.id('roomType')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('roomType')).click();
        await driver.sleep(1000); // Add delay

        // Log available options for debugging
        let roomTypeOptions = await driver.findElements(By.css('#roomType option'));
        for (let option of roomTypeOptions) {
            let value = await option.getAttribute('value');
            console.log(`Room type option value: ${value}`);
        }

        // Select the room type option
        await driver.findElement(By.css('#roomType option[value="Superior"]')).click(); // Adjust the value as per your room type options

        // Select room
        console.log('Selecting room...');
        await driver.wait(until.elementLocated(By.id('room')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('room')).click();
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.css('#room option[value="604"]')).click(); // Adjust the value as per your room options

        // Select client quantity
        console.log('Selecting client quantity...');
        await driver.wait(until.elementLocated(By.id('clientQuantity')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('clientQuantity')).click();
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.css('#clientQuantity option[value="2"]')).click(); // Adjust the value as per your client quantity options

        await driver.sleep(5000); // Add delay before submitting the form
        // Submit the form
        console.log('Submitting the form...');
        await driver.wait(until.elementLocated(By.id('submit')), 10000);
        await driver.sleep(1000); // Add delay
        await driver.findElement(By.id('submit')).click();

        // Wait for the success message or redirection
        console.log('Waiting for the success message...');
        await driver.wait(until.elementLocated(By.id('successMessage')), 10000);

        // Verify the success message
        let successMessage = await driver.findElement(By.id('successMessage')).getText();
        assert.strictEqual(successMessage, 'Booking successful');

        console.log('Test passed: Room booking form submitted successfully');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
})();