const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo')
    }, 300);
  });
  
  promise1.then((value) => {
    console.log(value)
    // expected output: "foo"
  });
  
  console.log(promise1)

  async function f() {
    return Promise.resolve(3);
  }
  
  //f().then(alert); // 1