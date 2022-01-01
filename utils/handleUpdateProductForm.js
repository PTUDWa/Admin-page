const form = document.getElementById("updateProductForm");
const thumbnailInput = document.getElementById("thumbnail");
const imageInput = document.getElementById("image");
const avatarPreview = document.getElementById("avatarPreview");
const imagePreview = document.getElementById("imagePreview");
const nameError = document.getElementById("nameError");
const priceError = document.getElementById("priceError");
const stockError = document.getElementById("stockError");
const summaryError = document.getElementById("summaryError");
const descriptioError = document.getElementById("descriptionError");
const categoryError = document.getElementById("categoryError");
const avatarError = document.getElementById("avatarError");
const imageError = document.getElementById("imageError");
const nameInput = document.getElementById("product_name");
const priceInput = document.getElementById("product_price");
const stockInput = document.getElementById("product_stock");
const summaryInput = document.getElementById("product_summary");
const descriptionInput = document.getElementById("product_description");
const idInput = document.getElementById("product_id");
const messageError = document.getElementById("message-error");
const spinner = document.querySelector(".spinner-border");
spinner.style.display = "none";

const avatar = {};
const image = [];

thumbnailInput.addEventListener("change", (e) => {
  const fileReader = new FileReader();
  const file = e.target.files[0];
  const { name, size, type } = file;
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("load", (event) => {
    console.log(name, size, type);
    const img = event.target.result;
    avatarPreview.style.display = "block";
    avatarPreview.src = img;

    avatar.src = img;
    avatar.name = name;
    avatar.size = size;
    avatar.type = type;
  });
});

imageInput.addEventListener("change", (e) => {
  const fileReader = new FileReader();
  const file = e.target.files[0];
  const { name, size, type } = file;
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("load", (event) => {
    console.log(name, size, type);
    const img = event.target.result;
    const imgElement = document.createElement("img");
    imgElement.src = img;
    imgElement.className = "imagePreview";
    imagePreview.appendChild(imgElement);

    image.push({
      src: img,
      name,
      size,
      type,
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const category = document.querySelectorAll("input[name='category']:checked");
  const name = nameInput.value;
  const price = priceInput.value;
  const stock = stockInput.value;
  const summary = summaryInput.value;
  const description = descriptionInput.value;
  const id = idInput.value;

  let hasError = false;

  if (name) {
    nameError.innerText = "";
  } else {
    hasError = true;
    nameError.innerText = "Required";
  }

  if (price && price > 0) {
    priceError.innerText = "";
  } else {
    hasError = true;
    priceError.innerText = "Required";
  }

  if (stock && stock > 0) {
    stockError.innerText = "";
  } else {
    hasError = true;
    stockError.innerText = "Required";
  }

  if (summary) {
    summaryError.innerText = "";
  } else {
    hasError = true;
    summaryError.innerText = "Required";
  }
  if (description) {
    descriptioError.innerText = "";
  } else {
    hasError = true;
    descriptioError.innerText = "Required";
  }
  if (category.length) {
    categoryError.innerText = "";
  } else {
    hasError = true;
    categoryError.innerText = "Required";
  }
  if (Object.keys(avatar).length) {
    avatarError.innerText = "";
  } else {
    hasError = true;
    avatarError.innerText = "Required";
  }
  if (image.length) {
    imageError.innerText = "";
  } else {
    hasError = true;
    imageError.innerText = "Required";
  }

  const data = {
    name,
    price,
    summary,
    description,
    category: [...category].map((item) => item.value),
    avatar,
    image,
    id,
    stock,
  };

  if (!hasError) {
    spinner.style.display = "block";
    fetch("/product/update", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400) return res.json();
        else window.location = "/product";
      })
      .then((data) => {
        if (data) messageError.innerText = data.message;
        spinner.style.display = "none";
      })
      .catch((err) => console.log({ err }));
  }
});
