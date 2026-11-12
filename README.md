npm ci
node analyser.js
node Warmup.js

1) My prediction was undefined, 99 1, 3, and syntax error, and after correcting the last line to console.log(0 == '0', 0 === '0'), the output was undefined, 99 1, 3, and true false. JavaScript sets up declarations before executing statements in a scope. var starts with undefined, and let and const are still not initialised until their declarations execute. This is called the TDZ so output is undfined and throws a ReferenceError.

2) fs.readFile() starts reading the file asynchronously so JavaScript continues running the loop without waiting. Node.js uses libuv’s worker pool and the operating system to handle the file reading. The callback runs after the file read and the current synchronous code have finished, so Loop finished prints first.

3) The returned function remembers spent and limit because of a closure even after createBudgetTracker() has finished. Every time I call the same tracker, it adds the new amount to the same spent variabl

4) The ^ allows compatible updates—for example, ^4.17.21 allows versions from 4.17.21 up to, but not including, 5.0.0.