Feature: Ecommerce validations
@Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "zinkazama21@gmail.com" and "Learning21"
    When Add "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and Place the Order
    Then Verify order is present in History