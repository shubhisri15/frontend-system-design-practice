// i write and test all the code here before adding to readme

const myView = document.body;
console.log("script loaded");

myView.style.position = 'relative'; // important: so children can be positioned inside

myView.addEventListener('click', (event) => {
  console.log('clicked');
  const circle = document.createElement('div');

  const size = (Math.random() + 1) * 100;

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.borderRadius = '50%';
  circle.style.backgroundColor = 'lightblue';
  circle.style.position = 'absolute'; // allows x/y placement

  // place circle so its center is at click point
  circle.style.left = `${event.clientX - size / 2}px`;
  circle.style.top = `${event.clientY - size / 2}px`;

  myView.appendChild(circle);
});


function getPath(obj, path) {
    const keys = Array.isArray(path) ? path : path.split('.')
    let current = obj

    for (let key of keys) {
        if (current && current.hasOwnProperty(key)) {
            current = current[key]
        } else {
            return
        }
    }

    return current
}

function recursiveFlatten(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                recursiveFlatten(obj[key], newKey, result)
            } else {
                result[newKey] = obj[key]
            }
        }
    }

    return result
}