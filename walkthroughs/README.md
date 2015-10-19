## Walkthrough

*Each day contains:*

* a README with instructions to following if you're performing the walkthrough on your own. 
* a PDF of the slides used during the presentation.
* presenter notes for whoever may choose to give the presentation.
 
The first few days will be a discussion about core concepts followed by how to start setting up our FakeFlix Movie app. As the days progress, application code and concepts will start blending together and we can more quickly build up our application.


## Single Day Walkthrough
#### Talking about Build Tools + ES6 - 1 hour

* webpack as a bundler + build system (code splitting AND static assets)
	
* babel (Transpile ES6 into ES5)
	* Show an example of es6 file transpiled into es5.  
 	`./babel example.js -o example-compiled.js`
* webpack babel loader
	* feed in a javascript entry point and webpack will traverse through each file linked via `import` statements, transpile and bundle into a singular file

* `var` vs. `let`, `const`
	* example of "hoisting" with `var`?
	* use `let` when you expect the value to be change while in scope
	* otherwise use `const`
	
* Arrow Functions  (http://www.es6fiddle.net/iftwlz04/)

```
function hello () { return "hello"; }
console.log(hello()); // "hello"
		
const hello = () => return "hello";
console.log(hello()); // "hello"
		
const square = num => return num * num;
console.log(square(2)); // 4
		
const multiply = (x, y) => { return x * y };
console.log(multiply(3, 4)); // 12
```

* Class declaration
	* `class B { ... }`
	* `constructor()`
	* `super()`
	* `get` / `set`
	* `static`
	* `class B extends A { ... }`
	
* Destructuring	 

```
const dict = { one: "one", two: "two", three: "three" };
let { one, two, three } = dict;
const list = [ "eggs", "bread", "milk" ];
let [ eggs, bread, milk ] = list;
```
	
* export / import 

```
export default class A { ... }; // singular export
import A from "A"; // singular import
class B extends A { ... };  // example usage
		
import A as ModuleA from "A"; // singular import with name change
class ModuleB extends ModuleA { ... } // example usage
  
export class B { ... }; 				
export class C { ... }; // mutiple export
import { B, C } from "A"; // multiple import
class X extends B { ... }; // example usage
		
import { B as ModuleB, C as ModuleC } from "A"; // multiple import with name change.
class ModuleY extends ModuleC { ... }; // example usage	

export const URL_A = "modules/a";   
export const URL_B = "modules/b"; // multiple export
import * as Constants from "constants"; // multiple import under namespace, "Constants"
request(Constants.URL_A, (error, response, body) => { ... }); // example usage
```

* Intro to React as a view layer - 30min
  * [React View Kata][React View Kata] - 30min
* Intro to React Props/State


##Ideas of stuff to buil in interim  

* simple login form that just posts a success

[ES6Katas]: http://codepen.io/westeezy/pen/EVvJQJ?editors=001
[React View Kata]: http://codepen.io/westeezy/pen/RWLoPp?editors=001

=======

Single Day Agenda
====================

Day 1
---------------------

| Time  | Topic  | Link | Take Aways |
| :------------ | :---------------| :-----| :--------------- |
| 10:30am-11:30am | ES6 and Build Tools | [Link][Day0] | Basics of ES6 (arrows, classes, let, destructoring), Concepts around Browserify & Webpack, and using Babel + Eslint |
| 11:30am-12:00am | ES6 Exercise | [ES6 Katas][ES6 Katas] | Run through a few exercises of writing ES6 code |
| 1:00pm-2:00pm | React as a View Layer | [React Basics][Day1] | How to use React as a view layer. How to render components into the DOM. What makes React appealing compared to other frameworks/libraries |
| 2:00pm-2:30pm | React View Exercise | [React View Kata][React View Kata] | Run through a few exercises of setting up basic React components to display data |
| 2:30pm-3:30pm | React State and Props | [Props][Day2] [State][Day3] | How to interact with React lifecyle methods and pass information between components. How to store data on teh internal state of a React component instance |
| 3:30pm-4:00pm | React State Exercise | [React State Kata][React State Kata] | Run through a few exercises of passing data to composed React components and storing data on state in a React component. |
| 4:00pm-5:00pm | Flux | [Flux][Day5] | How to write a Flux application using vanilla Facebook Flux implementation. What makes Flux appealing and also what sets it aside from MVC. |
| 5:00pm-6:00pm | High Order Components | [High Order Components ][Day6] | Composition vs Inheritance. How to write a High Order Component in React. Notes on Pure Functions. |
| Not Mentioned | Notes on Forms | [Forms][Day4] | Controlled vs Uncontrolled Inputs |

Day 2 
---------------------
| Time  | Topic  | Link |
| :------------ |:---------------:| -----:|
| All Day | Q and As | No Link |

* Can demo Simple TypeScript components [Link][TypeScript]

[ES6 Katas]: http://codepen.io/westeezy/pen/EVvJQJ?editors=001
[React View Kata]: http://codepen.io/westeezy/pen/RWLoPp?editors=001
[React State Kata]: http://codepen.io/westeezy/pen/Qjqddw

[Day0]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day0/
[Day1]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day1/
[Day2]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day2/
[Day3]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day3/
[Day4]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day4/
[Day5]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day5/
[Day6]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day6/
[TypeScript]: https://github.com/westeezy/ReactJS-Bootcamp/tree/typescript

