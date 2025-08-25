1. Implement this in Javascript$("button").addClass("change").css("background-color","yellow")

`
const btn = document.createElement('button')
btn.classList.add('change')
btn.style.backgroundColor  = 'yellow'
`

2. Implement this in Javascript: Print 100 buttons with nos. and click any button to alert the number.

`
const btnContainer = document.createElement('div')
document.body.appendChild(btnContainer)
for (let i = 0; i < 100; i++) {
    const newBtn = document.createElement('button')
    newBtn.textContent = i+1
    btnContainer.appendChild(newBtn)
}

btnContainer.addEventListener('click', (e) => {
    alert(`number is ${e.target.textContent}`)
})
`

3. Remove duplicates from array using ES6

`
function removeDuplicatesES6(arr) {
    const unique = new Set(arr)
    return Array.from(unique)
}
`

4. Implement function to read field inside a nested object.
`
function get(obj, path, defaultValue = undefined) {
  // If path is string, split into array
  const keys = Array.isArray(path) ? path : path.split(".");

  let current = obj;
  for (let key of keys) {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      return defaultValue; // if path breaks, return default
    }
  }
  return current;
}
`

5. Write a method sum which gives the following output sum(2)(3).

`
function sum(num) {
    return function (arg) {
        return num + arg
    }
}
`

6. Five HTTP response code used for: server error
7. PUT vs POST in REST: PUT is idempotent, creates if resource does not exist, updates the same resource if it exists. POST is not idempotent, new resource created everytime we fire a request.

8. 3 + 2 + '7' in JS: 57
9. OUTPUT BASED:

`(function(){    
  var a = b = 3;  
})();   

console.log("a defined? " + (typeof a !== 'undefined')); 
console.log("b defined? " + (typeof b !== 'undefined')); 
`
Output: 
false
true

Explanation: this is because the code inside IIFE is equivalent to:

`b=3
var a = b`

After the IIFE runs, a vanishes because it was local to the IIFE scope, while b is part of the global window object so it stays in memory

10. How would you prevent multiple actions on the same event?
- Scenario 1: adding the same event listener multiple times
  set {once: true}

- Scenario 2: Action spamming
  debounce / throttle

- Scenario 3: Multiple form submissions
  set form.dataset.submitted = "true"; after first submission, then check on click event

- Scenario 4: Stop event propogation (in case of bubbling) using e.stopPropagation()


11. Write a duplicate function (a method available to all arrays)
`
Array.prototype.duplicate = function () {
    return [...this, ...this]
}
`

12. Decodes the search string // url www.google.com/?searchString=Hello+G%C3%BCnter

`
const url = "www.google.com/?searchString=Hello+G%C3%BCnter";

// Extract query part (after ?)
const query = url.split("?")[1]; // "searchString=Hello+G%C3%BCnter"

// Extract the value after =
const value = query.split("=")[1]; // "Hello+G%C3%BCnter"

// Decode it
const decoded = decodeURIComponent(value);

console.log(decoded); // "Hello+Günter"
`
12. Resolve promise on button click

`
const btn = document.createElement('button')
btn.textContent = 'Click me to resolve'
btn.style.backgroundColor = 'green'

document.getElementsByTagName('body')[0].appendChild(btn)

let resolveMyPromise;

const myPromise = new Promise ((resolve, reject) => {
    btn.addEventListener('click', () => {
        resolve('Promise resolved')
    })
})

myPromise.then(res => console.log(res))
`

13. Implement a function that converts the first letter of words in a sentence to capital letter. s.capitalise1()

`
// Capitalize first letter of each word: "word" = starts after any non-alphanumeric
String.prototype.capitalize1 = function () {
  let out = '';
  let prevIsAlnum = false; // track if previous char was [0-9A-Za-z]

  for (let i = 0; i < this.length; i++) {
    let code = this.charCodeAt(i);

    // Determine if current is alphanumeric
    const isDigit    = code >= 48 && code <= 57;   // '0'-'9'
    const isUpper    = code >= 65 && code <= 90;   // 'A'-'Z'
    const isLower    = code >= 97 && code <= 122;  // 'a'-'z'
    const isAlnum    = isDigit || isUpper || isLower;

    // Capitalize if we're at the start of a word (prev not alnum) and current is lowercase
    if (!prevIsAlnum && isLower) {
      code -= 32; // convert 'a'-'z' to 'A'-'Z' (ASCII: -32)
    }

    out += String.fromCharCode(code);
    prevIsAlnum = isAlnum;
  }
  return out;
};

// optional alias to match your example typo
String.prototype.capitialize1 = String.prototype.capitalize1;

// Examples:
console.log("hello world".capitalize1());           // "Hello World"
console.log("  multiple   spaces".capitalize1());   // "  Multiple   Spaces"
console.log("foo-bar_baz".capitalize1());           // "Foo-Bar_Baz"
console.log("123abc xyz".capitalize1());            // "123Abc Xyz"

`

14. What are the 3 different types to create an object in JavaScript?

`
Object.assign({}, someObj)
const obj = { ...write something here }
const obj = new Object()

`

15. What is the difference between async and defer in javascript?

Async will download the JS file asynchronously while the HTML is being rendered on the DOM. As soon as the script is available it will execute it regardless of whether HTML rendering has finished or not.
Defer waits for the HTML to finish rendering before it executes the JS scripts.

16. Explain critical rendering path:

The Critical Rendering Path is the sequence of steps a browser takes to convert HTML, CSS, and JavaScript into pixels on the screen.
Step 1: Browser parses HTML top to bottom, turns tags into nodes which form a tree like structure called the DOM
Step 2: CSS is downloaded and parsed (CSSOM). Browser builds another tree which represents styles of each node
Step 3: Browser combines the DOM and CSSOM into the render tree which only contains visible nodes
Step 4: Positions and sizes are calculated for all nodes
Step 5: Painting- filling in colors, pixels, shadows, etc
Step 6: Composite layering- z-index, transforms etc

17. Why Redux? Is Redux synchronous or asynchronous?

✅ Why Redux?

Redux is a state management library for JavaScript apps (mostly React).
It helps when:

- Your app has shared state across many components.
- You want a predictable state flow (single source of truth, read-only state, changes via pure functions).

Debugging is hard → Redux gives time-travel debugging and predictable logs of state changes.

✅ Synchronous or Asynchronous?

Redux itself is synchronous by default: reducers are pure functions → input state + action → output new state.

To handle async operations (like API calls), you need middleware (e.g. redux-thunk, redux-saga, redux-observable).

Example: with redux-thunk, you can dispatch async actions (functions) that later dispatch sync actions.

18. What is inline and inline-block in CSS?

✅ Inline (display: inline)

- Element flows inside a line of text.
- Doesn’t start on a new line.
- Width & height cannot be set (only content size).
- Examples: <span>, <a>, <em> by default.

✅ Inline-block (display: inline-block)

- Behaves like inline (doesn’t break line flow).
- But you can set width/height, padding, margin.
- Useful for buttons, nav items, form inputs.

Comparison:

- Inline → can’t size it manually.
- Inline-block → inline positioning + block styling power.



