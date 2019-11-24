// SCRIPTS STARTS HERE

// Generate restaurantApp namespace
const cuisineApp = {};

cuisineApp.key = '2a1fee6e3fbe95cb3651bb670e95b77e';

// Cuisine Button Event Function controls what restaurants to search for based on cuisine button clicked
cuisineApp.cuisineButtonEvent = function () {

    // Generate variable to store cuisine id 
    const cuisineButtons = Array.from($('#cuisineButtonsList').find('a'));
    // console.log(cuisineButtons);

    cuisineButtons.forEach(function (button) {
        $(button).on('click', function () {
            $('.preloader').toggle();
            if ($('#displayedRestaurants li').length >= 1) {
                $('#displayedRestaurants').empty();
                const cuisineID = $(button).attr('id');
                cuisineApp.ajaxRequest(cuisineID);
            }
            else {
                const cuisineID = $(button).attr('id');
                cuisineApp.ajaxRequest(cuisineID);
            }
        });
    });
}

// SELECTING CUISINE VIA FORM ELEMENT
cuisineApp.cuisineSelectEvent = function () {

    // Generate variable to store cuisine id 
    const cuisineForm = Array.from($('form').find('select'));
    const cuisineSelection = Array.from($('form').find('option'));
    // console.log(cuisineSelection);

    $(cuisineForm).on('change', function () {
        const option = $(this).children(':selected').attr('id');
        $('.preloader').toggle();
        cuisineSelection.forEach(function (selection) {
            if ($('#displayedRestaurants li').length >= 1) {
                $('#displayedRestaurants').empty();
                const cuisineID = option;
                // console.log(cuisineID)
                cuisineApp.ajaxRequest(cuisineID);
            }
            else {
                const cuisineID = option;
                // console.log(cuisineID)
                cuisineApp.ajaxRequest(cuisineID);
            }
        });
    });
}


// AJAX Request Function determines what to search for based on user’s choice for cuisine
cuisineApp.ajaxRequest = function (cID) {

    // AJAX Function will get info from URL based on argument passed
    cuisineApp.restaurantOptions = $.ajax({
        url: `https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&cuisines=${cID}`,
        method: 'GET',
        dataType: 'json',
        headers: {
            'user-key': cuisineApp.key
        }
    }).then((result) => {
        // Then store result in the variable generated
        const { restaurants } = result;
        // Call Display Restaurants Function passing the result variable as an argument
        cuisineApp.displayRestaurants(restaurants);
        cuisineApp.bookmarkRestaurants(restaurants);
    }).catch((error) => {
        // console.log(error);
    });
}


// Display Restaurants Function collected from AJAX request
cuisineApp.displayRestaurants = function (item) {
    item.forEach(option => {
        const { restaurant } = option;
        // Pull keys from object for image, address, avg cost, phone number
        const {
            name,
            url,
            location,
            price_range: priceRange,
            user_rating,
            all_reviews_count: reviewCount,
            featured_image: featuredImage,
            phone_numbers: phoneNumber,
            id
        } = restaurant;

        const rating = user_rating.aggregate_rating;
        const address = location.address;
        const $displayedRestaurants = $('#displayedRestaurants');

        // 	Append the DOM with the variables in containers
        const restaurantDescription = `
            <li>
                <div class="itemDetails">
                    <a href="${url}"><img src="${featuredImage}"></a>
                    <div class="bookmark" id="${id}">
                        <i class="fas fa-bookmark"></i>
                    </div>
                    <div class="starRating">
                        <p>${rating}</p>
                    </div>
                    <div class="description">
                        <h3>${name}</h3>
                        <p class="address">${address}</p>
                        <p class="phoneNumber">${phoneNumber}</p>
                        <p class="priceAndReviews"><span class="price">${priceRange}</span> <span class="reviews">${reviewCount} Reviews</span></p>
                    </div>
                </div>
            </li>
        `;

        $('.preloader').fadeOut();
        $displayedRestaurants.append(restaurantDescription);


        //Function to replace represent price in dollar signs instead of number
        const prices = $('.price');
        const dollarSigns = '$'

        const priceInDollars = prices.map(function () {
            const priceInNumbers = parseInt($(this).text());
            $(this).replaceWith(`<span>${dollarSigns.repeat(priceInNumbers)}</span>`);
        }) 

        //Shorten phone number
        const phoneNumbers = $('.phoneNumber');
        
        const shortenedPhoneNumbers = phoneNumbers.map(function () {
            const newString = $(this).text().replace('+1 ','');
            $(this).replaceWith(`<p>${newString}</p>`);
        })

    });
}
cuisineApp.bookmarkRestaurants = function (item) {

    const bookmarks = Array.from(document.querySelectorAll('.bookmark'));
    // returns an array of objects
    // console.log(bookmarks);

    let saved = [];

    bookmarks.forEach(function (bookmark) {
        $(bookmark).on('click', function () {
            if ($(this).hasClass('saved')) {
                $(this).html(`<i class="fas fa-bookmark"></i>`);
                $(this).find('.fa-bookmark').css('transform', 'none');
                $(this).removeClass('saved');
                saved = saved.filter(function (value) {
                    return value !== $(bookmark).attr('id');
                });
            } else {
                $(this).addClass('saved');
                $(this).append(`<i class="fas fa-star"></i>`);
                $(this).find('.fa-bookmark').css('transform', 'scaleY(2)');
                saved.push($(this).attr('id'));
            }
        })
    })
}

//Click event to scroll to top
$('.scrollToTop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

//Function to display scroll to top
$(window).scroll(function () {
    if ($(this).scrollTop() > 1300) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
});


// Start init app by calling cuisine button event function
cuisineApp.init = function () {
    cuisineApp.cuisineButtonEvent();
    cuisineApp.cuisineSelectEvent();
}

// Create document ready to call app init function
$(function () {
    cuisineApp.init();
});
// SCRIPTS ENDS HERE