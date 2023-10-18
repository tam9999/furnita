let isloadIdex = 0
$(window).on('scroll  mousemove touchstart', function () {
  try {
    if (!isloadIdex) {
      isloadIdex = 1
      ;(function ($) {
        'user strict'
        $.fn.Dqdt_CountDown = function (options) {
          return this.each(function () {
            new $.Dqdt_CountDown(this, options)
          })
        }
        $.Dqdt_CountDown = function (obj, options) {
          this.options = $.extend(
            {
              autoStart: true,
              LeadingZero: true,
              DisplayFormat:
                '<div><span>%%D%%</span> Days</div><div><span>%%H%%</span> Hours</div><div><span>%%M%%</span> Mins</div><div><span>%%S%%</span> Secs</div>',
              FinishMessage: 'hết hạn',
              CountActive: true,
              TargetDate: null,
            },
            options || {}
          )
          if (this.options.TargetDate == null || this.options.TargetDate == '') {
            return
          }
          this.timer = null
          this.element = obj
          this.CountStepper = -1
          this.CountStepper = Math.ceil(this.CountStepper)
          this.SetTimeOutPeriod = (Math.abs(this.CountStepper) - 1) * 1000 + 990
          var dthen = new Date(this.options.TargetDate)
          var dnow = new Date()
          if (this.CountStepper > 0) {
            ddiff = new Date(dnow - dthen)
          } else {
            ddiff = new Date(dthen - dnow)
          }
          gsecs = Math.floor(ddiff.valueOf() / 1000)
          this.CountBack(gsecs, this)
        }
        $.Dqdt_CountDown.fn = $.Dqdt_CountDown.prototype
        $.Dqdt_CountDown.fn.extend = $.Dqdt_CountDown.extend = $.extend
        $.Dqdt_CountDown.fn.extend({
          calculateDate: function (secs, num1, num2) {
            var s = (Math.floor(secs / num1) % num2).toString()
            if (this.options.LeadingZero && s.length < 2) {
              s = '0' + s
            }
            return '<b>' + s + '</b>'
          },
          CountBack: function (secs, self) {
            if (secs < 0) {
              self.element.innerHTML =
                '<div class="lof-labelexpired"> ' + self.options.FinishMessage + '</div>'
              return
            }
            clearInterval(self.timer)
            DisplayStr = self.options.DisplayFormat.replace(
              /%%D%%/g,
              self.calculateDate(secs, 86400, 365)
            )
            DisplayStr = DisplayStr.replace(/%%H%%/g, self.calculateDate(secs, 3600, 24))
            DisplayStr = DisplayStr.replace(/%%M%%/g, self.calculateDate(secs, 60, 60))
            DisplayStr = DisplayStr.replace(/%%S%%/g, self.calculateDate(secs, 1, 60))
            self.element.innerHTML = DisplayStr
            if (self.options.CountActive) {
              self.timer = null
              self.timer = setTimeout(function () {
                self.CountBack(secs + self.CountStepper, self)
              }, self.SetTimeOutPeriod)
            }
          },
        })
        $(document).ready(function () {
          $('[data-countdown="countdown"]').each(function (index, el) {
            var $this = $(this)
            var $date = $this.data('date').split('-')
            $this.Dqdt_CountDown({
              TargetDate:
                $date[0] +
                '/' +
                $date[1] +
                '/' +
                $date[2] +
                ' ' +
                $date[3] +
                ':' +
                $date[4] +
                ':' +
                $date[5],
              DisplayFormat:
                '<div class="block-timer"><p>%%D%%Ngày</p></div><span>:</span><div class="block-timer"><p>%%H%%Giờ</p></div><span class="mobile">:</span><div class="block-timer"><p>%%M%%Phút</p></div><span>:</span><div class="block-timer"><p>%%S%%Giây</p></div>',
              FinishMessage: 'Chương trình đã kết thúc, hẹn gặp lại trong thời gian sớm nhất!',
            })
          })
        })
      })(jQuery)

      var swiperflash = new Swiper('.product-flash-swiper', {
        slidesPerView: 3,
        loop: false,
        grabCursor: true,
        roundLengths: true,
        slideToClickedSlide: false,
        spaceBetween: 20,

        autoplay: false,
        navigation: {
          nextEl: '.section-flashsale-next',
          prevEl: '.section-flashsale-prev',
        },

        breakpoints: {
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      })
      var swipernoibat = new Swiper('.product-noibat-swiper', {
        slidesPerView: 3,
        loop: false,
        grabCursor: true,
        roundLengths: true,
        slideToClickedSlide: false,
        spaceBetween: 20,
        slidesPerColumn: 2,
        autoplay: false,
        navigation: {
          nextEl: '.section-noibat-next',
          prevEl: '.section-noibat-prev',
        },

        breakpoints: {
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      })

      var swiperquatang = new Swiper('.product-quatang-swiper', {
        slidesPerView: 3,
        loop: false,
        grabCursor: true,
        roundLengths: true,
        slideToClickedSlide: false,
        spaceBetween: 20,
        slidesPerColumn: 2,
        autoplay: false,
        navigation: {
          nextEl: '.section-quatang-next',
          prevEl: '.section-quatang-prev',
        },

        breakpoints: {
          300: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      })
      var swiperins = new Swiper('.instagram-swiper', {
        spaceBetween: 20,
        centeredSlides: true,
        freeMode: false,
        loop: true,
        on: {
          init: function () {
            $(this.$el).find('img').removeAttr('data-was-processed')
            awe_lazyloadImage()
          },
        },
        navigation: {
          nextEl: '.section-quatang-next',
          prevEl: '.section-quatang-prev',
        },

        breakpoints: {
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        },
      })

      $('.not-dqtab').each(function (e) {
        var $this1 = $(this)
        var datasection = $this1.closest('.not-dqtab').attr('data-section')
        $this1.find('.tabs-title li:first-child').addClass('current')
        var view = $this1.closest('.not-dqtab').attr('data-view')
        $this1.find('.tab-content').first().addClass('current')
        var droptab = $(this).find('.tab-desktop')
        $this1.find('.tabs-title.ajax li').click(function () {
          var $this2 = $(this),
            tab_id = $this2.attr('data-tab'),
            url = $this2.attr('data-url'),
            img = $this2.attr('data-image'),
            title = $this2.attr('data-title')
          var etabs = $this2.closest('.e-tabs')
          $('.image-tab img').attr('src', img)
          $('.image-tab').attr('href', img)
          $('.image-tab').attr('title', title)
          etabs.find('.tab-viewall').attr('href', url)
          etabs.find('.tabs-title li').removeClass('current')
          etabs.find('.tab-content').removeClass('current')
          $this2.addClass('current')
          etabs.find('.' + tab_id).addClass('current')
          if (!$this2.hasClass('has-content')) {
            $this2.addClass('has-content')
            getContentTab(url, '.' + datasection + ' .' + tab_id, view)
          }
        })
      })

      function getContentTab(url, selector) {
        var loading =
          '<div style="width: 100%; margin-top: 20px" class="text-center">Loading...</div>'
      }
    }
  } catch (e) {
    console.log(e)
  }
})
