# Front end Web Q2 - Class 2

## Objectives

- Study the box model
- Apply CSS Styles
- Investigate Interaction Patterns

## Schedule

| # | time    |    total | Activity   | Description |
|---|---------|----------|------------|-------------|
| 1 |  5 mins |   5 mins | TT         | Marking up your Login form |
| 2 | 15 mins |  20 mins | Explore    | Forms and form elements in HTML |
| 3 |  5 mins |  25 mins | I do We do | The Box Model |
| 4 | 20 mins |  45 mins | Explore    | Style Inputs and buttons |
| 5 | 10 mins |  55 mins | Break      | Meditate on CSS |
| 6 | 30 mins |  85 mins | Explore    | Translate your design into code |
| 7 | 25 mins | 110 mins | Explore    | Use :focus, :hover, and transition |

### 1 - Marking up your Login form (Talk 5 min)

HTML provides the For marking up forms. Forms are collections of form elements.
Form elements are things like input fields, radio buttons, check boxes.

Your login form will probably have two inputs: username, and password, and
a button to submit the form.

You may also have a link to a Sign up form.

### 2 - Forms and form elements in HTML (15 mins)

Take a look at this article for some info on getting started with a login.

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form

Use the sample code in this article as a starting place for your login.
Be sure that your login includes the following elements:

- Input username/email
- Input password
- Submit button
- Sign up link or button

Notes:

- Be sure all of your inputs and buttons are labeled well!
- Use the label tag, take a look at it's "for" attribute.
- Look into the attributes of the input tag.
  - email
  - password
  - text
- The input, label, and button display inline by default. You may want to
place these inside of block element like a p or div.

### 3 - The box model (5 mins)

Every element in HTML is a box. Think of each box as a rectangle.
The box model describes the space a rectangle fills.

- content width/height
- padding
- border
- margin

Use the box model to design an input field using the CSS properties above.

- http://codepen.io/soggybag/pen/bBNgmR

### 4 - Style Inputs and buttons (20 mins)

Style your form. Start by using the box model to layout and style input Elements
and buttons.

### 5 - Meditate on CSS (10 mins)

Break...

### 6 - Translate your design into code (30 mins)

Your design may use any one of the following:

- CSS Gradients
- Background Images

### Investigate and apply - :focus

The :focus pseudo class selects a form element when that element
has focus. Use this to change the appearance of a form element to show that it
is the current focus of input.

- Review your selectors: https://flukeout.github.io
- https://developer.mozilla.org/en-US/docs/Web/CSS/:focus

Try the following:

- Change the background color of the input on :focus
- Change the border color

## Challenges

- Continue working and improving your Login form.
    - Think about animation and user interaction that might be apart of your form.
- Create another form. Yes, really do it all again! The best way to learn and expand your skill is practice.
    - Apply styles to a form you created for a project you are working on.
- Create a Sign Up form. Similar to the Login a Sign Up form will have some differences.
    - Mock up the new Sign Up form with Sketch first!
    - Imagine the Login and Sign Up form and how it will display and how your app will transition to it from the Login.
- Find some Login and Sign Up forms on Pinterest that you like try and recreate one of these.

## Resources

- https://www.pinterest.com/search/pins/?q=login%2C%20screen
- https://medium.freecodecamp.com/leveling-up-css-44b5045a2667#.m8j62vs60
- https://medium.com/@WebdesignerDepot/20-essential-css-tricks-every-designer-should-know-bccf0ca81b1c#.z8r8az65e
- http://tympanus.net/codrops/2012/10/16/custom-login-form-styling/
