import React, { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    generateNumbers();
  }, []); // El segundo argumento [] asegura que este efecto solo se ejecute una vez al montar el componente

  const generateNumbers = () => {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10));
    }
    setNumbers(randomNumbers);
  };

  const changeOrder = () => {
    setAscendingOrder(!ascendingOrder);
  };

  const bubbleSort = (ascending) => {
    const sortedNumbersCopy = [...numbers];
    let startTime = performance.now();

    // Implementación del Bubble Sort
    const len = sortedNumbersCopy.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (
          ascending
            ? sortedNumbersCopy[j] > sortedNumbersCopy[j + 1]
            : sortedNumbersCopy[j] < sortedNumbersCopy[j + 1]
        ) {
          const temp = sortedNumbersCopy[j];
          sortedNumbersCopy[j] = sortedNumbersCopy[j + 1];
          sortedNumbersCopy[j + 1] = temp;
        }
      }
    }

    // Retrasar la actualización del estado y el cálculo del tiempo
    setTimeout(() => {
      const endTime = performance.now();
      setSortedNumbers(sortedNumbersCopy);
      setTimeTaken(endTime - startTime);
    }, 0);
  };

  const selectionSort = (ascending) => {
    const sortedNumbersCopy = [...numbers];
    let startTime = performance.now();

    // Implementación del Selection Sort
    const len = sortedNumbersCopy.length;
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (
          ascending
            ? sortedNumbersCopy[j] < sortedNumbersCopy[minIndex]
            : sortedNumbersCopy[j] > sortedNumbersCopy[minIndex]
        ) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = sortedNumbersCopy[i];
        sortedNumbersCopy[i] = sortedNumbersCopy[minIndex];
        sortedNumbersCopy[minIndex] = temp;
      }
    }

    // Retrasar la actualización del estado y el cálculo del tiempo
    setTimeout(() => {
      const endTime = performance.now();
      setSortedNumbers(sortedNumbersCopy);
      setTimeTaken(endTime - startTime);
    }, 0);
  };

  const insertionSort = (ascending) => {
    const sortedNumbersCopy = [...numbers];
    let startTime = performance.now();

    // Implementación del Insertion Sort
    const len = sortedNumbersCopy.length;
    for (let i = 1; i < len; i++) {
      const key = sortedNumbersCopy[i];
      let j = i - 1;
      while (
        j >= 0 &&
        (ascending ? sortedNumbersCopy[j] > key : sortedNumbersCopy[j] < key)
      ) {
        sortedNumbersCopy[j + 1] = sortedNumbersCopy[j];
        j--;
      }
      sortedNumbersCopy[j + 1] = key;
    }

    // Retrasar la actualización del estado y el cálculo del tiempo
    setTimeout(() => {
      const endTime = performance.now();
      setSortedNumbers(sortedNumbersCopy);
      setTimeTaken(endTime - startTime);
    }, 0);
  };

  const mergeSort = (ascending) => {
    let sortedNumbersCopy = [...numbers];
    let startTime = performance.now();

    // Implementación del Merge Sort
    const merge = (left, right) => {
      let result = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (ascending ? left[i] < right[j] : left[i] > right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        result.push(left[i]);
        i++;
      }

      while (j < right.length) {
        result.push(right[j]);
        j++;
      }

      return result;
    };

    const mergeSortRecursive = (array) => {
      if (array.length <= 1) {
        return array;
      }

      const mid = Math.floor(array.length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid);

      return merge(mergeSortRecursive(left), mergeSortRecursive(right));
    };

    sortedNumbersCopy = mergeSortRecursive(sortedNumbersCopy);

    // Retrasar la actualización del estado y el cálculo del tiempo
    setTimeout(() => {
      const endTime = performance.now();
      setSortedNumbers(sortedNumbersCopy);
      setTimeTaken(endTime - startTime);
    }, 0);
  };

  const quickSort = (ascending) => {
    const sortedNumbersCopy = [...numbers];
    let startTime = performance.now();

    // Implementación del Quick Sort
    const partition = (array, low, high) => {
      const pivot = array[high];
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        if (ascending ? array[j] < pivot : array[j] > pivot) {
          i++;
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }

      const temp = array[i + 1];
      array[i + 1] = array[high];
      array[high] = temp;

      return i + 1;
    };

    const quickSortRecursive = (array, low, high) => {
      if (low < high) {
        const pi = partition(array, low, high);

        quickSortRecursive(array, low, pi - 1);
        quickSortRecursive(array, pi + 1, high);
      }
    };

    quickSortRecursive(sortedNumbersCopy, 0, sortedNumbersCopy.length - 1);

    // Retrasar la actualización del estado y el cálculo del tiempo
    setTimeout(() => {
      const endTime = performance.now();
      setSortedNumbers(sortedNumbersCopy);
      setTimeTaken(endTime - startTime);
    }, 0);
  };

  const renderNumbers = () => {
    return numbers.map((number, index) => <span key={index}>{number}</span>);
  };

  const renderSortedNumbers = () => {
    return sortedNumbers.map((number, index) => (
      <span key={index}>{number}</span>
    ));
  };

  const heapSort = (ascending) => {
    const sortedNumbersCopy = [...numbers];
    let startTime = performance.now();

    // Implementación del Heap Sort
    const heapify = (array, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (
        left < n &&
        (ascending
          ? array[left] > array[largest]
          : array[left] < array[largest])
      ) {
        largest = left;
      }

      if (
        right < n &&
        (ascending
          ? array[right] > array[largest]
          : array[right] < array[largest])
      ) {
        largest = right;
      }

      if (largest !== i) {
        const temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        heapify(array, n, largest);
      }
    };

    const buildHeap = (array) => {
      const n = array.length;

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
      }
    };

    const heapSortRecursive = (array) => {
      const n = array.length;

      buildHeap(array);

      for (let i = n - 1; i > 0; i--) {
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, i, 0);
      }
    };

    heapSortRecursive(sortedNumbersCopy);

    // Retrasar la actualización del estado y el cálculo del tiempo
    setTimeout(() => {
      const endTime = performance.now();
      setSortedNumbers(sortedNumbersCopy);
      setTimeTaken(endTime - startTime);
    }, 0);
  };

  return (
    <div>
      <h1>Algoritmos de ordenamiento</h1>
      <p>Orden de números:</p>
      <div id="numbers">{renderNumbers()}</div>

      <button onClick={() => bubbleSort(ascendingOrder)}>Bubble Sort</button>
      <button onClick={() => selectionSort(ascendingOrder)}>
        Selection Sort
      </button>
      <button onClick={() => insertionSort(ascendingOrder)}>
        Insertion Sort
      </button>
      <button onClick={() => mergeSort(ascendingOrder)}>Merge Sort</button>
      <button onClick={() => quickSort(ascendingOrder)}>Quick Sort</button>
      <button onClick={() => heapSort(ascendingOrder)}>Heap Sort</button>

      <p>Ordenados:</p>
      <div id="sortedNumbers">{renderSortedNumbers()}</div>

      <p>Tiempo transcurrido: {timeTaken} milisegundos</p>

      <button
        id="changeOrderBtn"
        onClick={changeOrder}
        style={{
          marginTop: "20px",
          fontSize: "18px",
          padding: "10px 20px",
          backgroundColor: ascendingOrder ? "green" : "red",
        }}
      >
        Cambiar Orden
      </button>
    </div>
  );
}

export default App;
