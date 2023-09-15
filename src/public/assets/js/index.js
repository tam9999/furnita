const loading = '<div style="width: 100%; margin-top: 20px" class="text-center">Loading...</div>'

$('.tab-link').click(function () {
  const category = $(this).attr('data-category')
  $.ajax({
    url: `/product/get-data-category/${category}`,
    type: 'GET',
    dataType: 'json',
    data: { category },
    beforeSend: function () {
      $('.tab-content').html(loading)
    },
    success: (products) => {
      const selector = '.tab-content'
      let html = '<div><div class="row row-fix">'

      if (products.length > 0) {
        for (const product of products) {
          html += `
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-fix">
              <div class="variants product-action">
                <div class="product-thumbnail">
                  <a class="image_thumb" href="/product/details/${product.id}">
                    <img
                      width="234"
                      height="234"
                      class="lazyload"
                      src="/assets/lazy.png"
                      data-src="${product.images[0]}" />
                  </a>

                  <div class="action">
                    <a title="Quick view" data-id="${product.id}" class="quick-view btn-views">
                      <svg class="icon">
                        <use
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xlink:href="#icon-quickview"></use>
                      </svg>
                    </a>
                  </div>
                </div>

                <div class="product-info">
                  <h3 class="product-name">
                    <a class="line-clamp line-clamp-2" href="/product/${product.id}">
                      ${product.title}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            `
        }

        function awe_lazyloadImage() {
          var ll = new LazyLoad({
            elements_selector: '.lazyload',
            load_delay: 100,
            threshold: 0,
          })
        }
        window.awe_lazyloadImage = awe_lazyloadImage

        function clear() {
          $('.text2line').empty()
          $('.quickview-id').empty()
          $('.quickview-info').empty()
          $('.product-summary').empty()
          $('.product-description').empty()
        }

        html += '</div></div>'

        const content = $(html)
        setTimeout(function () {
          $(selector).html(content.html())
          awe_lazyloadImage()

          $(document).on('click', '#thumblist_quickview li', function () {
            changeImageQuickView(
              $(this).find('img:first-child'),
              '.product-featured-image-quickview'
            )
            $('#thumblist_quickview li').removeClass('active')
            $(this).addClass('active')
          })
          $(document).on('click', '.quick-view', function (e) {
            if ($(window).width() > 1025) {
              e.preventDefault()
            }
          })

          $(document).on(
            'click',
            '.quickview-close, #quick-view-product .quickview-overlay, .fancybox-overlay',
            function (e) {
              $('#quick-view-product').fadeOut(0)
              clear()
              awe_hidePopup()
            }
          )

          var modal = $('.quickview-product')
          var span = $('.quickview-close')

          $('.quick-view').click(function () {
            const id = $(this).attr('data-id')
            $.ajax({
              url: `/product/quick-view/${id}`,
              type: 'GET',
              dataType: 'json',
              data: {},
            }).done((product) => {
              $('.img-1').attr('src', product.images[0])
              $('.img-2').attr('src', product.images[1])
              $('.img-3').attr('src', product.images[2])
              $('.img-4').attr('src', product.images[3])
              $('.text2line').text(product.title)
              $('.quickview-id').append(`<p><strong>Product code: </strong>${product.id}</p>`)
              $('.quickview-info').append(`<p><strong>Material: </strong>${product.material}</p>`)
              $('.product-summary').append(`<p><strong>Size: </strong>${product.size}</p>`)
              $('.product-description').append(
                `<p><strong>Description: </strong>${product.description}</p>`
              )
              modal.show()
            })
          })

          span.click(function () {
            clear()
            modal.hide()
          })

          $(window).on('click', function (e) {
            if ($(e.target).is('.modal')) {
              clear()
              modal.hide()
            }
          })
        }, 300)
      }
    },
  })
})
