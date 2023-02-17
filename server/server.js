const express = require("express");
const data = require("./data");

const app = express();

app.use(express.json());
app.get("/api/products", (req, res) => {
  res.status(200).send(data.products);
});

app.get("/api/products/product/:slug", (req, res) => {
  // console.log(req.params.slug);

  const product = data.products.find(
    (product) => product.slug === req.params.slug
  );
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
  // console.log(product);
  res.send(product);
});
app.get("/api/products/:id", (req, res) => {
  // console.log(req.params.slug);

  const product = data.products.find(
    (product) => product._id === req.params.id
  );
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
  // console.log(product);
  res.send(product);
});

// console.log(data);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
