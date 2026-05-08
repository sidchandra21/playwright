Feature: Ecommerce validations
@Validations
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify the error message
  Examples:
      | username              | password     |
      | rahulshetty@gmail.com | Learning21   |
      | zinkazama21@gmail.com | Learning321  |