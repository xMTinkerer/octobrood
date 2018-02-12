const doStuff = () => {
  let sum = 0;
  while( true ) {
     sum ++;
  }
  return sum;
};

process.on('message', (msg) => {
  const sum = doStuff();
  
});
