// SCRIPTS STARTS HERE

// Generate restaurantApp namespace
const cuisineApp = {};

cuisineApp.apiKey = '2a1fee6e3fbe95cb3651bb670e95b77e';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEs06ke1TV-dqwy1My_UuP848nVnJcAk0",
    authDomain: "vince-and-anna-project-four.firebaseapp.com",
    databaseURL: "https://vince-and-anna-project-four.firebaseio.com",
    projectId: "vince-and-anna-project-four",
    storageBucket: "vince-and-anna-project-four.appspot.com",
    messagingSenderId: "451681928751",
    appId: "1:451681928751:web:14bc6204b28039fb8468da"
};

// Handle Errors function.
cuisineApp.errorAlert = function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    swal.fire(
        `${errorCode} Error`,
        `${errorMessage}`,
        "error");
}

// Cuisine Button Event Function controls what restaurants to search for based on cuisine button clicked
cuisineApp.buttonEvent = function () {

    // Button Event Variables
    const $loginButton = $('#login');
    const $signUpButton = $('#signUp');
    const $signOutButton = $('#signOut');
    const $closeModal = $('.close');
    const $signUpModal = $('#signUpModal');
    const $loginModal = $('#loginModal');
    
    // Sign out current user function
    $signOutButton.on('click', function () {
        firebase.auth().signOut().then(function () {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
                .then(function () {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    // In memory persistence will be applied to the signed in Google user
                    // even though the persistence was set to 'none' and a page redirect
                    // occurred.
                    return firebase.auth().signInWithRedirect(provider);
                })
                .catch(function (error) {
                    // Handle Errors here.
                    cuisineApp.errorAlert(error);
                });
            // Sign-out successful.
        }).catch(function (error) {
            // Handle Errors here.
            cuisineApp.errorAlert(error);
        });
    });

    // Sign Up function allows user to create an account
    $signUpButton.on('click', function () {

        // Button Event Variables
        const $signUpForm = $('#signUpForm');
        const $signUpEmailAddress = $('#signUpEmailAddress');
        const $signUpPassword = $('#signUpPassword');
        const $confirmPassword = $('#confirmPassword');
        
        // Everytime the sign up button is clicked, do not show login modal
        $loginModal.removeClass('showLoginModal');
        $signUpModal.toggleClass('showSignUpModal');
        
        // Closes sign up modal on close
        $closeModal.on('click', function () {
            $signUpModal.removeClass('showSignUpModal');
        });

        // When user submits sign up information, create account for user
        $signUpForm.on('submit', function (event) {
            event.preventDefault();
            if ((($signUpEmailAddress.val() !== "") && ($signUpPassword.val() !== "") && ($confirmPassword.val() !== "")) && ($signUpPassword.val() === $confirmPassword.val())) {
                let email = $signUpEmailAddress.val();
                let password = $signUpPassword.val();
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        // Handle Errors here.
                        cuisineApp.errorAlert(error);
                    });
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in.
                        $signOutButton.css('display', 'block');
                        $signUpButton.css('display', 'none');
                        $loginButton.css('display', 'none');
                        $signUpModal.removeClass('showSignUpModal');
                        swal.fire(
                            "Success",
                            "You have successfully signed up!",
                            "success");
                    }
                });
            }
            else if ($signUpPassword.val() !== $confirmPassword.val()) {
                swal.fire(
                    "Error",
                    "Your passwords do not match!",
                    "error");
            }
            else if (($signUpEmailAddress.val() === "") || ($signUpPassword.val() === "") || ($confirmPassword.val() === "")) {
                swal.fire(
                    "Error",
                    "You are missing an input field!",
                    "error");
            }
        });
    });

    // Login function allows user to log into an existing account
    $loginButton.on('click', function () {

        // Button Event Variables
        const $loginForm = $('#loginForm');
        let $loginEmailAddress = $('#loginEmailAddress');
        let $loginPassword = $('#loginPassword');
        
        // Everytime the login button is clicked, do not show sign up modal
        $signUpModal.removeClass('showSignUpModal');
        $loginModal.toggleClass('showLoginModal');
        
        // Closes sign up modal on close
        $closeModal.on('click', function () {
            $loginModal.removeClass('showLoginModal');
        });

        // When user logs in with correct credentials function
        $loginForm.on('submit', function (event) {
            event.preventDefault();
            if (($loginEmailAddress.val() !== "") && ($loginPassword.val() !== "")) {
                let email = $loginEmailAddress.val();
                let password = $loginPassword.val();
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        // Handle Errors here.
                        cuisineApp.errorAlert(error);
                    });
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in
                        cuisineApp.bookmarkAjaxRequest();
                        $signOutButton.css('display', 'block');
                        $loginButton.css('display', 'none');
                        $signUpButton.css('display', 'none');
                        $loginModal.removeClass('showLoginModal');
                        swal.fire(
                            "Success",
                            "You have successfully signed in!",
                            "success");
                    }
                });
            }
            else if (($loginEmailAddress.val() === "") || ($loginPassword.val() === "")) {
                swal.fire(
                    "Error",
                    "You have entered an incorrect email address or password.",
                    "error");
            }
        });
    });

    // Generate variable to store cuisine id 
    const cuisineButtons = Array.from($('#cuisineButtonsList').find('a'));
    const $displayedRestaurantsTitle = $('#displayedRestaurantsTitle');

    // On click of each cuisine button, display the clicked cuisine
    cuisineButtons.forEach(function (button) {
        $(button).on('click', function () {
            $('.preloader').toggle();
            if ($('#displayedRestaurants li').length >= 1) {
                $('#displayedRestaurants').empty();
                const cuisineID = $(button).attr('id');
                cuisineApp.ajaxRequest(cuisineID);
                $('#displayedRestaurantsTitle').html(`Top 20 Results for ${$(button).siblings().text()}`);
            }
            else {
                const cuisineID = $(button).attr('id');
                cuisineApp.ajaxRequest(cuisineID);
                $('#displayedRestaurantsTitle').html(`Top 20 Results for ${$(button).siblings().text()}`);
            }
            $displayedRestaurantsTitle.css('display', 'block');
        });
    });
}

// SELECTING CUISINE VIA FORM ELEMENT FOR MOBILE VERSION
cuisineApp.selectEvent = function () {

    // Generate variable to store cuisine id 
    const cuisineForm = Array.from($('form').find('select'));
    const cuisineSelection = Array.from($('form').find('option'));
    const $displayedRestaurantsTitle = $('#displayedRestaurantsTitle');

    // On click of each cuisine select option, display the clicked cuisine
    $(cuisineForm).on('change', function () {
        const option = $(this).children(':selected').attr('id');
        $('.preloader').toggle();
        cuisineSelection.forEach(function () {
            if ($('#displayedRestaurants li').length >= 1) {
                $('#displayedRestaurants').empty();
                const cuisineID = option;
                cuisineApp.ajaxRequest(cuisineID);
                $('#displayedRestaurantsTitle').html(`Top 20 Results for ${$('#options option:selected').text()}`);
            }
            else {
                const cuisineID = option;
                cuisineApp.ajaxRequest(cuisineID);
                $('#displayedRestaurantsTitle').html(`Top 20 Results for ${$('#options option:selected').text()}`);
            }
            $displayedRestaurantsTitle.css('display', 'block');
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
            'user-key': cuisineApp.apiKey
        }
    }).then(function (result) {
        // Then store result in the variable generated
        const { restaurants } = result;
        // Call Display Restaurants Function passing the result variable as an argument
        cuisineApp.displayRestaurants(restaurants);
        cuisineApp.bookmarkRestaurants();
    }).catch(function (error) {
        // Handle Errors here.
        cuisineApp.errorAlert(error);
    });
}

// Bookmark AJAX Request Function calls the user's bookmarked restaurants
cuisineApp.bookmarkAjaxRequest = function () {
    const userID = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref('users').child(userID);
    // AJAX Function will get info from URL based on argument passed
    function getRestaurant(restaurantID) {
        return $.ajax({
            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantID}`,
            method: 'GET',
            dataType: 'json',
            headers: {
                'user-key': cuisineApp.apiKey
            }
        })
    }
    // if (userID === userRef) {
        userRef.once('value', (data) => {

            const bookmarkData = data.val().bookmarks;
            const savedBookmarkList = [];

            bookmarkData.forEach((item) => {
                savedBookmarkList.push(getRestaurant(item));
            });
            $.when(...savedBookmarkList)
                .then((...bookmarkedRestaurant) => {
                    const restaurantDetail = bookmarkedRestaurant.map((result) => {
                        return result[0];
                    });

                    restaurantDetail.forEach((item) => {
                        cuisineApp.displayBookmarkedRestaurants(item);
                        const $bookmarkIcon = $('.fa-bookmark');
                        const $savedBookmark = $('.bookmark.saved');
                        $bookmarkIcon.addClass('saved');
                        $savedBookmark.append('<i class="fas fa-star"></i>');
                    });
                });
        });
    // }
}

cuisineApp.generateRestaurantContainer = function (restaurant) {
    // Restaurant Variables
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

    // Append the DOM with the variables in containers
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
    // Function to represent price in dollar signs instead of number
    const prices = $('.price');
    const dollarSigns = '$'
    prices.map(function () {
        const priceInNumbers = parseInt($(this).text());
        $(this).replaceWith(`<span>${dollarSigns.repeat(priceInNumbers)}</span>`);
    })

    // Shorten phone number
    const phoneNumbers = $('.phoneNumber');
    phoneNumbers.map(function () {
        const newString = $(this).text().replace('+1 ', '');
        $(this).replaceWith(`<p>${newString}</p>`);
    })

    return restaurantDescription;
}

cuisineApp.displayBookmarkedRestaurants = function (restaurant) {
    const restaurantDescription = cuisineApp.generateRestaurantContainer(restaurant);
    const $bookmarkSection = $('#bookmarkSection');
    const $displayedBookmarks = $('#displayedBookmarks');
    $bookmarkSection.css('display', 'block');
    $displayedBookmarks.append(restaurantDescription);
}

// Display Restaurants Function collected from AJAX request
cuisineApp.displayRestaurants = function (item) {
    item.forEach(option => {
        const { restaurant } = option;
        const restaurantDescription = cuisineApp.generateRestaurantContainer(restaurant);
        const $displayedRestaurants = $('#displayedRestaurants');
        $displayedRestaurants.append(restaurantDescription);

    });
}
cuisineApp.bookmarkRestaurants = function () {

    // Returns an array of objects
    const bookmarks = Array.from(document.querySelectorAll('.bookmark'));
    const userID = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref('users').child(userID);

    let saved = [];

    const bookmarkList = {};

    function checkUserID() {
        if (userRef === userID) {
            userRef.update(bookmarkList);
        }
        else {
            userRef.set(bookmarkList);
        }
    }

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
            bookmarkList.bookmarks = saved;
            checkUserID();
            cuisineApp.bookmarkAjaxRequest();
        })
    })
}

// Click event to scroll to top
$('.scrollToTop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

// Function to display scroll to top
$(window).scroll(function () {
    if ($(this).scrollTop() > 1300) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
});

// Start init app by calling cuisine button event function
cuisineApp.init = function () {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    cuisineApp.buttonEvent();
    cuisineApp.selectEvent();
}

// Create document ready to call app init function
$(function () {
    cuisineApp.init();
});
// SCRIPTS ENDS HERE