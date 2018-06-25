'use strict'

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    //disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false
  });
  $('.open-popup-ajax').magnificPopup({
    type: 'ajax',
    midClick: true,
    showCloseBtn: false
  });
  $('.popup__close').on('click', function(){
    $.magnificPopup.close();
  });

  welcomeCarousel();
  stonesCarousel();
  sectionCarousel();
  mainQuestion();
  mainCarousel();
  mobileNavigation();
  faq();

  $('ol.list li').each(function(){
    $(this).prepend('<span class="span">' + ($(this).index() + 1) + '</span>');
  });

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form1');
  simpleForm('form.form2');
  simpleForm('form.form3');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function welcomeCarousel(){
  $('.welcome__carousel-top').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.welcome__carousel-bottom',
    // autoplay: true
  })
  $('.welcome__carousel-bottom').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.welcome__carousel-top'
  })
}

function stonesCarousel(){
  $('.stones__carousel-top').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    // autoplay: true
  })
}

function sectionCarousel(){
  $('.section__carousel-body--1').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  })
  $('.section__carousel-body--2').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
        }
      },
      {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
      }
    ]
  })
  $('.section__carousel-body--3').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
        }
      },
      {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
      }
    ]
  })
}

function mainQuestion(){
  $('.section__carousel-question').each(function(){
    var _this = $(this);
    _this.find('p').on('click', function(){
      $('.section__carousel-question').find('blockquote').hide();
      $('.section__carousel-question .show').removeClass('show');
      var _this = $(this);
      if (_this.next().next().hide()) {
        _this.next().next().show()
      } else {
        _this.next().next().hide()
      }
      $('.section__carousel-body--1').slick('refresh');
    });
  });
}

function mainCarousel(){
  $('.main-slider__carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    draggable: false,
    // autoplay: true,
    // autoplaySpeed: 5000
  });
}

function mobileNavigation(){
  var ul1 = $('.header__nav-desctop nav>ul');
  var ul2 = $('.header__nav-mobile nav');
  ul1.clone().appendTo(ul2);

  var btn1 = $('#header-mobile');
  btn1.on('click', function(e){
    e.stopPropagation();
    var _this = $(this);

    if (_this.parent().hasClass('is-active')) {
      _this.parent().removeClass('is-active')
    } else {
      _this.parent().addClass('is-active')
    }
  });

  ul2.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    if ($('.header__nav-mobile').hasClass('is-active')) {
      $('.header__nav-mobile').removeClass('is-active');
    }
  });

  var btn2 = $('#footer-mobile');
  btn2.on('click', function(e){
    e.stopPropagation();
    var _this = $(this);

    $('html, body').animate({
        scrollTop: $(".header").offset().top
    }, 1000, function(){
      $('.header__nav-mobile').removeClass('is-active');
      $('#header-mobile').trigger('click');
    });
  });
}

function faq(){
  var faqBlock = $('.faq__block'),
      faqBlockAnswer = $('.faq__block-answer'),
      faqBlockTitle = $('.faq__block-title');

  $(faqBlock).each(function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.find('.faq__block-answer').show();
    }
  });

  faqBlockTitle.on('click', function(e){
    e.preventDefault();
    var _this = $(this);

    faqBlock.removeClass('is-active');
    $('.faq__block-answer').stop().slideUp();

    _this.parents(faqBlock).addClass('is-active');
    _this.next(faqBlockAnswer).stop().slideDown();

  });
}
