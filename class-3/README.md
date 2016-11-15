# Front end Web Q2 - Class 3

## Objectives

- Research CSS Transform
- Use Transforms in practical ways
- Build animated transitions

## Schedule

| # | time    |    total | Activity   | Description |
|---|---------|----------|------------|-------------|
| 1 | 15 mins |  15 mins | Review     | Review student work from last week |
| 2 |  5 mins |  20 mins | TT         | Review selectors and forms |
| 3 | 10 mins |  30 mins | Work       | Apply :hover, :active, and :focus styles to your work |
| 4 |  5 mins |  35 mins | TT         | jQuery |
| 5 | 20 mins |  55 mins | work       | Handling forms with jQuery |
| - | 10 mins |  65 mins | break      | Relax and meditate |
| 6 |  5 mins |  75 mins | TT         | CSS Position |



### 1 - Review Login forms (15 mins)

Take a look at your form. Share your work with your neighbors and discuss what is 
working best and what is not working.

### 2 - Selectors and Forms (5 mins)

A few selectors apply directly to forms. 

- :hover (doesn't apply to mobile!)
- :focus 
- :active 

### 3 - Apply :hover, :active, and :focus styles to your work

Use the :hover, :active, and :focus classes to create interaction that 
improve your form. 

Remember you can animate any element with: transition. 

## 4 - jQuery

jQuery is a library that provides a set up helper and utility methods. 
jQuery is written entirely in JavaScript. It's real purpose is to 
make working with JavaScripts 
What can you do with jQuery? 

- Select elements
- Apply CSS styles to elements
- Add or remove class names from elements
- Get/set the position of an element
- Get/set the size of an element
- more...

What practical tasks can you accomplish?

- Validate forms on JS
- Create more complex UI
- Load data from a server
- more...

How does it work?

Select anything with:

`$("validCSSSelector")`

Call any method on your selector:

`$("p").anyJqueryMethod()`

## 5 - Handling forms with jQuery

jQuery provides several helper methods that work with forms. 
Each of these creates an "event" and you define a "handler"
to handle that event. 

- Use the submit event to handle form submission.
    - $("#a-form").submit(handler)
- Use the focus event to handle when an input receives focus.
    - $("#an-input").focus(handler)
- Use the blur event to handle when an input loses focus.    
    - $("#an-input").blur(handler)

Handle your form submission with jQuery. Check the email
and the password. 

- Use the isValidEmailAddress() method to validate your email.
- Challenge write a function to validate password.
    - To pass validation a password must 8 characters long.
    - Writing a function to check your password might be a good idea.
- Add a call valid to an input when it passes validation. 

## Challenges

- Make a Sign up screen
    - Create this in the same document in it's own div
- Set up the Signup link to Swap the Login and Sign up screens. 
    - Use absolute and relative position.
    - Use jQuery to add and remove a class that will trigger the transition.

### 6 - CSS Position

By default elements use Static position. In this mode layout it handled 
by the browser. There are two other position modes: 

- absolute
- relative

These modes allow for wider range of position options. When using absolute
and relative position elements respond to a new set of properties: 

- Position
    - left
    - top
    - right
    - bottom
- z-index

http://codepen.io/soggybag/pen/eBzRPJ?editors=1100

Slide show thing...

### Use absolute and relative position

Use the label as a placeholder.

http://codepen.io/soggybag/pen/NbrvxK?editors=1100

### Exercise apply these ideas to your own project

Take the ideas above and apply them to your form. Feel free to change 
different properties and experiment with new ideas. 

### 7 - Swapping Login for Sign up

Transform and position example...

### 8 - Challenge 

Swap the login for the sign up screen with an animated transition...

### CSS Transform

CSS transform applies translation, scale, rotation, and skew to an element. 

- translate
- rotate
- scale

http://codepen.io/soggybag/pen/BQzxze

### 3d

3d Transforms

- translate3d
- rotateX, Y, Z
- perspective



