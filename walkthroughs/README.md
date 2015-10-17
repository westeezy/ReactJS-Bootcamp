## Walkthrough

*Each day contains:*

* a README with instructions to following if you're performing the walkthrough on your own. 
* a PDF of the slides used during the presentation.
* presenter notes for whoever may choose to give the presentation.

* The first few days will be discussion about core concepts followed by how to start setting up our FakeFlix Movie app. As the days progress, application code and concepts will start blending together and we can more quickly build up our application.



## Single Day Walkthrough
* Talking about Build Tools + ES6 - 1 hour
	* webpack as a bundler + build system (code splitting AND static assets)
	
	* babel (Transpile ES6 into ES5)
	  * Show an example of es6 file transpiled into es5.
	  	-> ./babel example.js -o example-compiled.js
	  * webpack babel loader
	  * feed in a javascript entry point and webpack will traverse through each file linked via
		  "import" statements, transpile and bundle into a singular file

  * var vs. let, const
  	* example of "hoisting" with var?
  	* use 'let' when you expect the value to be change while in scope
  	* otherwise use 'const'
	
	* Arrow Functions
		* function hello () { return "hello"; }
			console.log(hello());   			// "hello"
		* const hello = () => "hello";
			console.log(hello());   			// "hello"
		* const square = num => num * num;
			console.log(square(2)); 			// 4
		* const multiply = (x, y) => { x * y };
		  console.log(multiply(3, 4)); 	// 12
	  * Link: http://www.es6fiddle.net/iftwlz04/

	* Class declaration
		* class B { ... }
			* constructor()
			* super()
			* get / set
			* static
			* class B extends A { ... }
	
	* Destructuring	
		* const dict = { one: "one", two: "two", three: "three" };
		  let { one, two, three } = dict;
		* const list = [ "eggs", "bread", "milk" ];
		  let [ eggs, bread, milk ] = list;
	
	* export / import 
		* export default class A { ... }; 			// singular export
		* import A from "A";										// singular import
		* class B extends A { ... };						// example usage
		* import A as ModuleA from "A";   			// singular import with name change
		* class ModuleB extends ModuleA { ... }	// example usage
		  
		* export class B { ... }; 												
		  export class C { ... }; 												// mutiple export
		* import { B, C } from "A";												// multiple import
		* class X extends B { ... };											// example usage
		* import { B as ModuleB, C as ModuleC } from "A"; // multiple import with name change.
	  * class ModuleY extends ModuleC { ... };					// example usage

		* export const URL_A = "modules/a";   
		  export const URL_B = "modules/b";					// multiple export
		* import * as Constants from "constants";		// multiple import under namespace, "Constants"
	  * request(Constants.URL_A, (error, response, body) => { ... }); // example usage

  * [ES6 Katas][ES6 Katas] - 30 mins
  	* http://tddbin.com/#?kata=es6/language/class/creation
  	* http://tddbin.com/#?kata=es6/language/class/static
  	* http://tddbin.com/#?kata=es6/language/class/accessors
  	* http://tddbin.com/#?kata=es6/language/class/extends

* Intro to React as a view layer - 30min
  * [React View Kata][React View Kata] - 30min
* Intro to React Props/State


##Ideas of stuff to buil in interim
* simple login form that just posts a success
[ES6 Katas]: http://codepen.io/westeezy/pen/EVvJQJ?editors=001
[React View Kata]: http://codepen.io/westeezy/pen/RWLoPp?editors=001
