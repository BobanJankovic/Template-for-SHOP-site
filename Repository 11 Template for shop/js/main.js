$(document).ready(function () {


    var template = $("#template").html();
    var regEx = new RegExp("{{title}}", "g");
    var collections = $("[data-collection]");
   
    window.onload =function(){
        $.ajax({
            url: "shop.json",
            method: "get",
            dataType: "json"
        })
        .done(function (res) {
            displayCollections(res);
            $(collections).on("click", function () {
                    displayCollections.call(this,res);

                });

            
         })

    }; 
    



    $(".back-to-top").click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 2000);
    });



    // Modernizer functions
    $(window).on('load resize', function () {
        order();
    });


    var backtotop = $('.back-to-top');
    var footerbottom = $('.footer-bottom');

    function order() {
        var isMobile = Modernizr.mq('(min-width: 1200px)');
        if (isMobile) {
            //move header info from top to side menu
            backtotop.detach();
            footerbottom.append(backtotop);
            //////////////////////
        } else {
            $('.footer-top').prepend(backtotop);
        }
    }

   

    function displayCollections(res) {
        event.preventDefault();
        var col = $(this).data("collection");
        console.log(this);
        $("#mainRow").html(" ");
        


       
                if (col === "male" || col === "female") {
                    var colFilter = res.filter(function (el) {
                        return el.colection === col;
                    })
                    console.log(colFilter);
                    displayProduct(colFilter);
                } else if (col === "newCol" || col === "popular" || col === "action") {
                    var colFilter = res.filter(function (el) {
                        return el[col];
                    })
                    console.log(colFilter);
                    displayProduct(colFilter);

                } else {
                    displayProduct(res)
                }


           


    }

    function displayProduct(filter) {
        var text = " ";
        filter.forEach(function (e) {
            text = template.replace("{{imgSrc}}", e.imgSrc)
                .replace(regEx, e.productTitle)
                .replace("{{model}}", e.model)
                .replace("{{price}}", e.price);

            $("#mainRow").append(text);
        });

    }










});