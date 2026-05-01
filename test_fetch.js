fetch("http://localhost:3000/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "ds@gmail.com", password: "123" })
}).then(res => res.text()).then(console.log).catch(console.error);
