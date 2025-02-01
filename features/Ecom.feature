Feature: Checkout and Order Verification

  @EndToEndValidation
  Scenario Outline: Verify order creation and details on the order page
    Given I am logged into the application with email "<email_id>" and password "<password>"
    When I search for a product and add to cart "<product_name>"
    And I navigate to the cart page
    And I verify "<product_name>" click on the checkout button
    And I select the country "<country_name>"
    And I click on the place order button
    Then I should get the order ID
    And I verify the order ID on the order page

    Examples:
      | email_id           | password     | product_name    | country_name |
      | SC@gmail.com | Selenium@123  | Banarsi Saree          |  India          |
