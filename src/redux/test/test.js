const newPro = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("okay 1");
  }, 1000);
});

newPro
  .then((val) => {
    return val + "!!!";
  })
  .then((val) => {
    console.log(val);
  });
