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
            const cuisineID = $(button).attr('id');
            cuisineApp.ajaxRequest(cuisineID);
        });
    });
}
// AJAX Request Function determines what to search for based on user’s choice for cuisine
cuisineApp.ajaxRequest = function(cID) {
    
    // AJAX Function will get info from URL based on argument passed
    $.ajax({ 
        url: `https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&cuisines=${cID}`, 
        method: 'GET', 
        dataType: 'json', 
        headers: {
            'user-key': cuisineApp.key
        }
    })
    .then(function(result){
        console.log(result);
    });
    // Then store result in the variable generated
    
    // Call Display Restaurants Function passing the result variable as an argument
}
// Display Restaurants Function collected from AJAX request
cuisineApp.displayRestaurants = function() {

    // Pull keys from object for image, address, avg cost, phone number
    // 	Append the DOM with the variables in containers
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