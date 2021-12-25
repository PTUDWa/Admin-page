const form = document.getElementById("addProductForm");
const thumbnailInput = document.getElementById("thumbnail");
const imageInput = document.getElementById("image");
const avatarPreview = document.getElementById("avatarPreview");
const imagePreview = document.getElementById("imagePreview");
const nameError = document.getElementById("nameError");
const priceError = document.getElementById("priceError");
const summaryError = document.getElementById("summaryError");
const descriptioError = document.getElementById("descriptionError");
const categoryError = document.getElementById("categoryError");
const avatarError = document.getElementById("avatarError");
const imageError = document.getElementById("imageError");
const nameInput = document.getElementById("product_name");
const priceInput = document.getElementById("product_price");
const summaryInput = document.getElementById("product_summary");
const descriptionInput = document.getElementById("product_description");

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
  const category = document.querySelectorAll("input[name='category']:checked");
  const name = nameInput.value;
  const price = priceInput.value;
  const summary = summaryInput.value;
  const description = descriptionInput.value;

  nameError.innerText = name ? "" : "Required";
  priceError.innerText = price && price > 0 ? "" : "Invalid";
  summaryError.innerText = summary ? "" : "Required";
  descriptioError.innerText = description ? "" : "Required";
  categoryError.innerText = category.length ? "" : "Required";
  avatarError.innerText = Object.keys(avatar).length ? "" : "Required";
  imageError.innerText = image.length ? "" : "Required";

  console.log(name, price, summary, description);
  console.log(category);
  event.preventDefault();
});
