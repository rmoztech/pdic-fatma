$(document).ready(function () {
    $('.searching').click(function () {
        $('.body-overlay, .serach-box').show();
        $('.serach-box, .body-overlay').animate({
            opacity: '1',
        }, 500)
    })
    $('.body-overlay').click(function () {
        $('.body-overlay, .serach-box').hide(100);

        $('.serach-box, .body-overlay').animate({
            opacity: '1',
        })
    })
    $(function () {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof (settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof (settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    });

    $(function () {
        // custom formatting example
        $('.count-number').data('countToOptions', {
            formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
        });

        // start all the timers
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    })

    $('.owl-members').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        rtl: true,
        dots: false,
        items: 5,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        navContainer: '.member-custom-nav',
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('.owl-enterprise-news').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        rtl: true,
        dots: false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        navContainer: '.news-custom-nav',
    });
    $("input[type=file]").change(function (e) {
        $(".filename").text(e.target.files[0].name);
    });

    $(".form-body").hide();
    $(".sorry").hide();
    $(".for-subscribers").hide();
    $(".subscribers-names").hide();

    $('input[name="account"]').change(function () {
        if ($(this).val() == 'personnel') {
            $(".sorry").hide();
            $(".for-company").hide();
            $(".form-body").show();
            $(".for-company-select").show();
            $(".account-name").text("حسابات الأفراد");
            $(".for-personal").show();

            $("select.account-type").change(function () {
                var selectedAccount = $(this).children("option:selected").val();
                if (selectedAccount == 'partenter') {
                    $(".for-subscribers").show();
                    $(".subscribers-names").show();
                    $('#subscribers-number').change(function () {
                        var subscribersNumber = $(this).val();
                        var divOwners = $('.subscribers-names');
                        divOwners.empty();
                        for (var i = 0; i < subscribersNumber; i++) {
                            divOwners.append(`<div class="mb-4">
                            <label class="  mb-3">
                            اسم المالك
                            ${i + 1}
                            </label>
                            <input type="text" class="form-control" id="owner-name">
                            </div>`)
                        }
                        subscribersNumber = 0
                    })
                }
                else {
                    $(".for-subscribers").hide();
                    $(".subscribers-names").hide();

                }
            });
        } else if ($(this).val() == 'companies') {
            $(".sorry").hide();
            $(".for-subscribers").hide();
            $(".for-personal").hide();
            $(".for-company-select").hide();
            $(".subscribers-names").hide();
            $(".account-name").text("حسابات الشركات");
            $(".form-body").show();
            $(".for-company").show();
            $("select.company-type").change(function () {
                var selectedCompany = $(this).children("option:selected").val();
                if (selectedCompany == 'other') {
                    $(".for-company-select").show();
                    $(".sorry").hide();
                }
                else {
                    $(".for-company-select").hide();
                    $(".sorry").show();
                }
            });
        }
        else if ($(this).val() == 'governmental') {
            $(".form-body").hide();
            $(".account-name").text("حسابات حكومية");
            $(".sorry").show();
        }
        else {
            $(".form-body").hide();

            $(".account-name").text("حسابات ذوي الصله");
            $(".sorry").show();
        }
    });

    $(".refresh").click(function () {
        location.reload(true);
    })
    $(".reset").click(function () {
        $(".add-info-form").find("input, select").val("");
    });

    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
       }, "Value must not equal arg.");


    $(".add-info-form").validate({
        rules: {
            accountName: {
                required: true,
                minlength: 3
            },
            outstandingLoan: {
                number: true,
                max: $("#loan-given").val()
            },
            accountType: { valueNotEquals: "choose" }
        },

        messages: {
            accountName: {
                required: "يرجى ادخال اسم تعريفي للحساب",
                minlength: "يجب ان يتضمن ثلالة احرف فأكثر"
            } ,
            outstandingLoan: {
                max: "الرجاء اضافة رصيد القرض القائم أقل من أو يساوي قيمة القرض الممنوح",
            },
            accountType:{ valueNotEquals: "يرجى اختيار نوع للحساب" }
        }
    });
    $('.add-info-form').on('submit', function(e){
        e.preventDefault();
        if($(".add-info-form").valid()){
            $('#collapseTwo').collapse();
        }
    });
});

