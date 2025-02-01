Feature: Verify the login functionality

@LoginErrorValidation
Scenario: Verify Login Error Message Validation
    Given I am logged into the application with email "SC@gmail.com" and password "wrongPasskey"
    Then Error Message " Incorrect email or password. " Should be displayed
    