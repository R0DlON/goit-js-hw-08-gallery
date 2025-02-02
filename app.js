const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону
const placeForItems = document.querySelector(".js-gallery");
const galleryMarkup = createGalleryItems(galleryItems);

function createGalleryItems(event) {
  return event
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

placeForItems.insertAdjacentHTML("afterbegin", galleryMarkup);

// Rеализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// +
// Открытие модального окна по клику на элементе галереи
placeForItems.addEventListener("click", addClassToModal);

const modal = document.querySelector(".js-lightbox");

function addClassToModal(event) {
  event.preventDefault();

  if (modal.classList.contains("lightbox")) {
    modal.classList.add("is-open");
  }
  window.addEventListener("keydown", closeModalOnKey);
  takeUrlOfTarget(event);
  takeAltOfTarget(event);

  getUrl(event);
  getAlt(event);
}
function takeUrlOfTarget(event) {
  let urlOftarget = event.target.dataset.source;
  console.log(urlOftarget);
  return urlOftarget;
}
function takeAltOfTarget(event) {
  let altOftarget = event.target.alt;
  console.log(altOftarget);
  return altOftarget;
}

// Подмена значения атрибута src элемента img.lightbox__image.
const placeForReplace = document.querySelector(".lightbox__image");

function getUrl(event) {
  placeForReplace.src = takeUrlOfTarget(event);
  // console.log(placeForReplace);
}
function getAlt(event) {
  placeForReplace.alt = takeAltOfTarget(event);
  // console.log(placeForReplace);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
const closeButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);

closeButton.addEventListener("click", closeModalOnButton);
console.log(closeButton);

function closeModalOnButton(event) {
  if (modal.classList.contains("is-open")) {
    removeClassOfModal();
  }
  cleaningSrc();
  cleaningAlt();
}

function removeClassOfModal() {
  window.removeEventListener("keydown", closeModalOnKey);
  modal.classList.remove("is-open");
}
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
function cleaningSrc() {
  placeForReplace.src = "";
}
function cleaningAlt() {
  placeForReplace.alt = "";
}
// Закрытие модального окна по клику на div.lightbox__overlay.

const overlay = document.querySelector(".lightbox__overlay");

overlay.addEventListener("click", closeModalOnBackground);

function closeModalOnBackground(event) {
  if (overlay) {
    removeClassOfModal();
  }
  cleaningSrc();
  cleaningAlt();
}

// Закрытие модального окна по нажатию клавиши ESC.
// window.addEventListener("keydown", closeModalOnKey);

function closeModalOnKey(event) {
  console.log(event.key);
  if (event.code === "Escape") {
    removeClassOfModal();
    cleaningSrc();
    cleaningAlt();
  }
}
