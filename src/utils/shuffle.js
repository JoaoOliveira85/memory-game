export const generateRandomArray = (minValue, maxValue) => {
    if ((minValue >= maxValue) || (typeof minValue != "number" || typeof maxValue != "number")) {
        console.error("Invalid arguments!")
        console.info("Usage: generateRandomArray(minValue, maxValue)\nminValue must be a number smaller than maxValue which must also be a number.")
        return 1
    }

    const arraySize = maxValue - minValue + 1;
    let numberArray = new Array(arraySize);
    let outputArray = new Array(arraySize);

    for (let i = 0; i < arraySize; i++) {
        numberArray[i] = i + minValue;
    }
    for (let i = 0; i < arraySize; i++){
        outputArray[i] = numberArray.splice(Math.floor(Math.random() * (numberArray.length)), 1).pop();
    }
    return outputArray
}



export const shuffleArray = function(arrayToShuffle) {
    const arraySize = arrayToShuffle.length;
    const outputArray = new Array(arraySize);
    for (let i = 0; i < arraySize; i++){
        outputArray[i] = arrayToShuffle.splice(Math.floor(Math.random() * (arrayToShuffle.length)), 1).pop();
    }

    return outputArray
}
