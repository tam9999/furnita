function appendProductToCart(product) {
  const productElement = `
    <div class="ajaxcart__product cart_product" data-id="${product.id}">
      <a href="/product/details/${product.id}" class="ajaxcart__product-image cart_image" title="${product.title}">
        <img width="80" height="80" style="border-radius:6px" src="${product.images[0]}" alt="${product.title}" />
      </a>
      <div class="grid__item cart_info">
        <div class="ajaxcart__product-name-wrapper cart_name">
          <a href="/product/details/${product.id}" class="ajaxcart__product-name h4" title="${product.title}">${product.title}</a>
          <a class="cart__btn-remove remove-item-cart ajaxifyCart-remove" href="javascript:;" data-id="${product.id}">Delete</a>
        </div>
      </div>
    </div>
  `
  $('.ajaxcart__row').append(productElement)
}

function addToCart(id, product) {
  const cartCookie = $.cookie('add-to-cart')
  const cartItems = cartCookie ? JSON.parse(cartCookie) : []
  const itemExistsInCart = cartItems.some((item) => item.id === id)

  if (!itemExistsInCart) {
    cartItems.push(id)
    $('.cartheader').show()
    $('.cart--empty-message').hide()
    appendProductToCart(product)
  }
  $.cookie('add-to-cart', JSON.stringify(cartItems))
  $('.count_item_pr').text(cartItems.length)
}

function showCartItems(cartItems) {
  if (cartItems.length > 0) {
    cartItems.forEach((id) => {
      $.ajax({
        url: `/product/quick-view/${id}`,
        type: 'GET',
        dataType: 'json',
        data: {},
      }).done(appendProductToCart)
    })
    $('.header-cart .count_item_pr').text(cartItems.length)
    $('.cartheader').show()
    $('.cart--empty-message').hide()
  } else {
    $('.cartheader').hide()
    $('.header-cart .count_item_pr').text('0')
    $('.cart--empty-message').show()
  }
}

function updateProductDetails(product) {
  $('.product-title').text(product.title)
  $('.product-new-price b').text(product.price)
  $('.thumb-1x1 img').attr('src', product.images[0]).css('border-radius', '6px')
}

function showCartPopup() {
  $('.popup-cart-mobile, .backdrop__body-backdrop___1rvky').addClass('active')
}

function removeCartItem($this) {
  const cartCookie = $.cookie('add-to-cart')
  let cartItems = cartCookie ? JSON.parse(cartCookie) : []
  const id = $this.data('id')
  cartItems = cartItems.filter((item) => item !== id)
  $('.header-cart .count_item_pr').text(cartItems.length)
  $.cookie('add-to-cart', JSON.stringify(cartItems))
  $(`.ajaxcart__product[data-id=${id}]`).remove()
  $(`.add_to_cart[data-id=${id}]`).removeClass('active')
  $(`.add_to_cart[data-id=${id}]`).attr('title', 'Add to wish')
  $(`.add_to_cart[data-id=${id}] .icon use`).attr('xlink:href', '#icon-wishlist')
  if (cartItems.length === 0) {
    $('.cartheader').hide()
    $('.cart--empty-message').show()
  }
}

$('.add_to_cart').click(function (e) {
  e.preventDefault()
  if (!$(this).hasClass('active')) {
    const id = $(this).data('id')
    $.ajax({
      url: `/product/quick-view/${id}`,
      type: 'GET',
      dataType: 'json',
      data: {},
    }).done((product) => {
      $(`.add_to_cart[data-id=${id}]`).addClass('active')
      $(`.add_to_cart[data-id=${id}]`).attr('title', 'Remove from wishlist')
      $(`.add_to_cart[data-id=${id}] .icon use`).attr('xlink:href', '#icon-wishlist-active')
      addToCart(id, product)
      updateProductDetails(product)
      showCartPopup()
    })
  } else {
    removeCartItem($(this))
  }
})

$(document).on('click', '.ajaxifyCart-remove', function (e) {
  e.preventDefault()
  removeCartItem($(this))
})

const cartCookie = $.cookie('add-to-cart')
const cartItems = cartCookie ? JSON.parse(cartCookie) : []

cartItems?.forEach((id) => {
  $(`.add_to_cart[data-id=${id}]`).addClass('active')
  $(`.add_to_cart[data-id=${id}]`).attr('title', 'Remove from wishlist')
  $(`.add_to_cart[data-id=${id}] .icon use`).attr('xlink:href', '#icon-wishlist-active')
})

showCartItems(cartItems)
