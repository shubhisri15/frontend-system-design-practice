// Given a parent and a child node from a DOM tree verify whether the child actually has the given parent.

{/* <div id="parent">
  <p id="child">Hello World</p>
</div> */}

const parent = document.getElementById('parent')
const child = document.getElementById('child')

// parent is ancestor of child
if (parent.contains(child)) {
    console.log('child inside parent')
}

// parent is parent of child
if (child.parentNode === parent) {
    console.log('child is direct child of parent')
}

// parent is ancestor of child
if (child.closest('#parent')) {
    console.log('#parent is somewhere above child')
}