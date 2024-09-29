function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}

function updateActiveNavOnScroll() {
  const sections = $("section");
  const scrollPos = $(document).scrollTop();

  sections.each(function () {
    const top = $(this).offset().top - 100;
    const bottom = top + $(this).outerHeight();

    if (scrollPos >= top && scrollPos <= bottom) {
      const sectionId = $(this).attr("id");

      $("#navbarSupportedContent ul li").removeClass("active");
      $("#navbarSupportedContent ul li a[href='#" + sectionId + "']")
        .parent()
        .addClass("active");

      test();
    }
  });
}

$(document).ready(function () {
  setTimeout(function () {
    test();
  });

  $('.carousel-item img').on('click', function() {
    const imgSrc = $(this).attr('src');
    $('#modalImage').attr('src', imgSrc); 
    $('#imageModal').modal('show'); 
  });

  $(window).on("scroll", function () {
    updateActiveNavOnScroll();
  });

  $(window).on("resize", function () {
    setTimeout(function () {
      test();
    }, 500);
  });

  $(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function () {
      test();
    });
  });

  var hash = window.location.hash || "#home";
  function setActiveNavLink() {
    $("#navbarSupportedContent ul li").removeClass("active");
    $("#navbarSupportedContent ul li a[href='" + hash + "']")
      .parent()
      .addClass("active");
    test();
  }
  setActiveNavLink();

  $(window).on("hashchange", function () {
    hash = window.location.hash || "#home";
    setActiveNavLink();
  });

  if (hash) {
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800
    );
  }
});

// Lightbox Gallery Functionality
const imageGrid = document.querySelector(".image-grid");
const links = imageGrid.querySelectorAll("a");
const imgs = imageGrid.querySelectorAll("img");
const lightboxModal = document.getElementById("lightbox-modal");
const bsModal = new bootstrap.Modal(lightboxModal);
const modalBody = document.querySelector(".modal-body .container-fluid");

for (const link of links) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const currentImg = link.querySelector("img");
    const lightboxCarousel = document.getElementById("lightboxCarousel");
    if (lightboxCarousel) {
      const parentCol = link.parentElement.parentElement;
      const index = [...parentCol.parentElement.children].indexOf(parentCol);
      const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
      bsCarousel.to(index);
    } else {
      createCarousel(currentImg);
    }
    bsModal.show();
  });
}

function createCarousel(img) {
  const markup = `
    <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false">
      <div class="carousel-inner">
        ${createSlides(img)}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  modalBody.innerHTML = markup;
}

function createSlides(img) {
  let markup = "";
  const currentImgSrc = img.getAttribute("src");

  for (const img of imgs) {
    const imgSrc = img.getAttribute("src");
    const imgAlt = img.getAttribute("alt");
    const imgCaption = img.getAttribute("data-caption");

    markup += `
      <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
        <img src=${imgSrc} alt=${imgAlt}>
        ${imgCaption ? createCaption(imgCaption) : ""}
      </div>
    `;
  }

  return markup;
}

function createCaption(caption) {
  return `<div class="carousel-caption"><p class="m-0">${caption}</p></div>`;
}

// Show clicked carousel image in modal
function showImageInModal(img) {
  const imageSrc = img.src;

  // Find all images from the about carousel
  const carouselItems = document.querySelectorAll('#carouselExampleAutoplaying .carousel-item img');

  let modalInnerHTML = `<div id="modalCarousel" class="carousel slide" data-ride="carousel">
                          <div class="carousel-inner">`;

  // Dynamically create carousel items for the modal
  carouselItems.forEach((carouselImg, index) => {
    const isActive = (carouselImg.src === imageSrc) ? 'active' : '';
    modalInnerHTML += `<div class="carousel-item ${isActive}">
                         <img src="${carouselImg.src}" class="d-block w-100" alt="${carouselImg.alt}">
                       </div>`;
  });

  modalInnerHTML += `</div>
                     <a class="carousel-control-prev" href="#modalCarousel" role="button" data-slide="prev">
                       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                       <span class="sr-only">Previous</span>
                     </a>
                     <a class="carousel-control-next" href="#modalCarousel" role="button" data-slide="next">
                       <span class="carousel-control-next-icon" aria-hidden="true"></span>
                       <span class="sr-only">Next</span>
                     </a>
                   </div>`;

  // Insert generated carousel into modal body
  document.querySelector('#imageModal .modal-body').innerHTML = modalInnerHTML;

  // Show the modal
  $('#imageModal').modal('show');
}