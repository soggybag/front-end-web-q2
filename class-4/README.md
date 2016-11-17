# Front end Web Q2 - Class 4

## Objectives

- Build log in sign up system
- Analyse CSS transform
- Write JavaScript to handle logic

## Schedule

| # | time    |    total | Activity   | Description |
|---|---------|----------|------------|-------------|
| 1 |  5 mins |   5 mins | TT         | CSS position |
| 2 | 20 mins |  25 mins | Challenge  | Challenge |
| 3 |  5 mins |  30 mins | TT         | Creating a sliding transition between two views. |
| 4 | 20 mins |  50 mins | Challenge  | Set up transition between your Login and Sign up views. |
| 5 | 10 mins |  60 mins | Break      | Enjoy the day |
| 6 | 20 mins |  80 mins | Challenge  | Add the transition between your views. |
| 7 |  5 mins |  85 mins | TT         | JavaScript review. |
| 8 | 25 mins | 100 mins | Challenge  | Add JS to swap screens. |



# 1 - CSS position

Use the position property to provide greater control over the position of elements.

- https://codepen.io/soggybag/pen/eBzRPJ

Position has four values:

- static
- relative
- absolute
- fixed

## Static

The default value for position is `static`. When position is static the layout
engine in the browsers determines the size and location of an object. 

## Relative

Relative position offsets an object from where it would normally have eneded up. 

## Absolute 

Absolute position positions an object absolutely in its context. 

## Fixed 

When position is fixed elements do not scroll with the page! 

## Positioning objects

Set the top, right, bottom, and left properties to move and position elements. 

- https://codepen.io/soggybag/pen/eBzRPJ

## 2 - CSS Position challenge

Try to recreate challenegs 1 to 3. Open these in the browser and do your best to recreate them from scratch on your own. 

## 3 - Creating a sliding transition between two views

In a nutshell you'll want to create a single container that you will move with transition. This container will 
need to have position absolute.

This pen illustrates the idea:

- https://codepen.io/soggybag/pen/RooNwx

You can also refer to the examples in the examples folder. 

## 4 - Set up transition between your Login and Sign up views

Challenge, create sliding transition between the login and sign up views. Follow these steps:

- Make sure Login and Sign up each have a top level containing div with a class or id. 
- Add a dive that contains both the login and sign up divs. Give this an id name.
- Add CSS styles to make the container div large enough to hold both Login and Sign up. 
- Use CSS to position the Login and Sign up side by side. This might be as simple using float left. 

## 5 - Take a break

Enjoy the day...

## 6 - Add the transition between your views

Now you'll want to animate between te views. All of the motion can be handled with a CSS transition. 
You can trigger the transition by adding a class that changes the position of the container. 

The examples contain comments you can follow for more info. Below is a general set of steps you might follow: 

- Add a transition to the container style.
- Choose a class name that will trigger the transition. Something like: show-sign-up
    - Keep in mind you will adding this class to the container!
- Define a rule that will create the transition. 
    - If your container has an id of #container the rule might look like:
    - #container.show-sign-up
    
## 7 - JavaScript review 

we need a couple simple lines of JavaScript to finish this project. You will need to write code
to do the folloowing: 

- Make references to the login and sign up buttons/links.
- Write handlers for click events for both the login and sign up button/links.
    - The login handler will need to add your show-sign-up class to container. 
    - The signup handler will need to remove show-sign-up class from container. 

You can refer to the sample code for hints. 



## ? - CSS Transform

The transform property translates, rotates, scales, and skews an element. 

- translate(x, y)
- rotate(angle) deg, rad
- scale(multiplier) no unit
- skewX(angle) or skewY(angle)

This property works differently. You will set translate, rotate, scale, and skew all together!

`transform: translate(100px, 44px) rotate(45deg) scale(0.5) skewX(15deg);`

### translate


### rotate


### scale 


### Try transform

Try out CSS transform with this code pen example: 

- https://codepen.io/soggybag/pen/BQzxze

### 3d!





