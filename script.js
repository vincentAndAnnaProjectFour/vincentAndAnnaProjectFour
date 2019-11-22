// SCRIPTS STARTS HERE

// Generate restaurantApp namespace
const cuisineApp = {};

cuisineApp.key = '2a1fee6e3fbe95cb3651bb670e95b77e';

// Cuisine Button Event Function controls what restaurants to search for based on cuisine button clicked
cuisineApp.cuisineButtonEvent = function() {
    
    // Generate variable to store cuisine id 
    const cuisineButtons = Array.from($('#cuisineButtonsList').find('a'));
    console.log(cuisineButtons);

    cuisineButtons.forEach(function(button) {
        $(button).on('click', function(){
            if($('#displayedRestaurants li').length >= 1) {
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
// AJAX Request Function determines what to search for based on user’s choice for cuisine
cuisineApp.ajaxRequest = function(cID) {
    
    // AJAX Function will get info from URL based on argument passed
    cuisineApp.restaurantOptions =  $.ajax({ 
            url: `https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&cuisines=${cID}`, 
            method: 'GET', 
            dataType: 'json', 
            headers: {
                'user-key': cuisineApp.key
            }
        }).then((result) => {
            const { restaurants } = result;
            cuisineApp.displayRestaurants(restaurants);
                // Then store result in the variable generated
                // console.log(`Name: ${restaurant.name} Url: ${restaurant.url} Address: ${restaurant.location.address} Average Price: ${restaurant.average_cost_for_two} Price Range: ${restaurant.price_range} User rating: ${restaurant.user_rating.aggregate_rating} Review Count: ${restaurant.all_reviews_count} Featured Image: ${restaurant.featured_image} Phone: ${restaurant.phone_numbers }`);
                // Call Display Restaurants Function passing the result variable as an argument
        });
    }
    

// Display Restaurants Function collected from AJAX request
cuisineApp.displayRestaurants = function(item) {
    item.forEach(option => {
        const { restaurant } = option;
        // Pull keys from object for image, address, avg cost, phone number
        const {
            name,
            url,
            location,
            average_cost_for_two: averageCostForTwo,
            price_range: priceRange,
            user_rating,
            all_reviews_count: reviewCount,
            featured_image: featuredImage,
            phone_numbers: phoneNumber
        } = restaurant;

        const rating = user_rating.aggregate_rating;
        const address = location.address;

        // 	Append the DOM with the variables in containers
        // console.log(name,
        // url,
        // address,
        // average_cost_for_two,
        // price_range,
        // rating,
        // all_reviews_count,
        // featured_image,
        // phone_numbers);
        // const $displayedRestaurantItems = $('#displayedRestaurants li');
        const $displayedRestaurants = $('#displayedRestaurants');
        const restaurantDescription = `
        <li>
            <div class="itemDetails">
                <a href="${url}"><img src="${featuredImage}"></a>
                <h3>${name}</h3>
                <div class="starRating">
                    <p>${rating}</p>
                    <i class="fas fa-star"></i>
                </div>
                <div class="description">
                    <p>${reviewCount} Reviews</p>
                    <p>Average Cost (For Two): ${averageCostForTwo} </p> 
                    <p>Price: ${priceRange}</p>
                    <p>${address}</p>
                    <p>${phoneNumber}</p>
                </div>
            </div>
        </li>
        `;    
        $displayedRestaurants.append(restaurantDescription);
    });
}
// Start init app by calling cuisine button event function
cuisineApp.init = function() {
    cuisineApp.cuisineButtonEvent();
}

// Create document ready to call app init function
$(function() {
    cuisineApp.init();
});
// SCRIPTS ENDS HERE