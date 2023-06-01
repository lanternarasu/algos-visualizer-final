let array = [];

function generateArray() {
  const arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';
  fetch('http://localhost:8085/api/sorting/random')
    .then(response => response.json())
    .then(data => {
      array = data;
      for (let i = 0; i < array.length; i++) {
        const arrayBar = document.createElement('div');
        arrayBar.className = 'array-bar';
        arrayBar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(arrayBar);
      }
    });
}
function generate()
{
	const arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';
  fetch('http://localhost:8085/api/sorting/default')
    .then(response => response.json())
    .then(data => {
      array = data;
      for (let i = 0; i < array.length; i++) {
        const arrayBar = document.createElement('div');
        arrayBar.className = 'array-bar';
        arrayBar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(arrayBar);
      }
    });
}

async function bubbleSort() {
  const arrayBars = document.querySelectorAll('.array-bar');
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1; i++) {
      const currentBar = arrayBars[i];
      const nextBar = arrayBars[i + 1];
      currentBar.style.backgroundColor = 'red';
      nextBar.style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 50));
      if (array[i] > array[i + 1]) {
        sorted = false;
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        currentBar.style.height = `${array[i]}px`;
        nextBar.style.height = `${array[i + 1]}px`;
      }
      currentBar.style.backgroundColor = '#007bff';
      nextBar.style.backgroundColor = '#007bff';
    }
  }
}

async function quickSort() {
  const arrayBars = document.querySelectorAll('.array-bar');
  await animateSorting(array, arrayBars); // Animate initial state

  async function animateSorting(array, arrayBars) {
    if (array.length <= 1) {
      return array;
    }

    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];
    const left = [];
    const right = [];

    for (let i = 0; i < array.length; i++) {
      if (i === pivotIndex) continue;
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    const sortedArray = [
      ...await animateSorting(left, arrayBars),
      pivot,
      ...await animateSorting(right, arrayBars)
    ];

    for (let i = 0; i < sortedArray.length; i++) {
      array[i] = sortedArray[i];
      arrayBars[i].style.height = `${sortedArray[i]}px`;
      arrayBars[i].style.backgroundColor = 'green';
      await new Promise(resolve => setTimeout(resolve, 50));
      arrayBars[i].style.backgroundColor = '#007bff';
    }

    return sortedArray;
  }

  await animateSorting(array, arrayBars); // Animate final state
}

async function heapSort() {
  const arrayBars = document.querySelectorAll('.array-bar');
  const array = Array.from(arrayBars).map(bar => parseInt(bar.style.height, 10));
  const n = array.length;

  async function heapify(array, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      swap(array, i, largest);
      await animateSwap(arrayBars, i, largest);
      await heapify(array, n, largest);
    }
  }

  async function heapSort(array) {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      swap(array, 0, i);
      await animateSwap(arrayBars, 0, i);
      await heapify(array, i, 0);
    }
  }

  async function animateSwap(arrayBars, i, j) {
    arrayBars[i].style.backgroundColor = 'red';
    arrayBars[j].style.backgroundColor = 'red';
    await new Promise(resolve => setTimeout(resolve, 50));
    swapHeight(arrayBars, i, j);
    arrayBars[i].style.backgroundColor = '#007bff';
    arrayBars[j].style.backgroundColor = '#007bff';
  }

  function swapHeight(arrayBars, i, j) {
    const temp = arrayBars[i].style.height;
    arrayBars[i].style.height = arrayBars[j].style.height;
    arrayBars[j].style.height = temp;
  }

  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  await heapSort(array);
} 
function pauseSorting() {
  sortingGenerator.return();
}
function resumeSorting() {
  const algorithm = document.querySelector('.active').id;
  switch (algorithm) {
    case 'bubble-sort':
      sortingGenerator = bubbleSort();
      break;
    case 'quick-sort':
      sortingGenerator = quickSort();
      break;
    case 'heap-sort':
      sortingGenerator = heapSort();
      break;
    default:
      break;
  }

  sortingGenerator.next();
}
document.getElementById('bubble-sort').addEventListener('click', () => {
  pauseSorting();
  sortingGenerator = bubbleSort();
  sortingGenerator.next();
});

document.getElementById('quick-sort').addEventListener('click', () => {
  pauseSorting();
  sortingGenerator = quickSort();
  sortingGenerator.next();
});

document.getElementById('heap-sort').addEventListener('click', () => {
  pauseSorting();
  sortingGenerator = heapSort();
  sortingGenerator.next();
});
document.getElementById('pause').addEventListener('click', () => {
  pauseSorting();
});

document.getElementById('resume').addEventListener('click', () => {
  resumeSorting();
});