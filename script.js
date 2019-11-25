// SCRIPTS STARTS HERE

// Generate restaurantApp namespace
const cuisineApp = {};

cuisineApp.key = '2a1fee6e3fbe95cb3651bb670e95b77e';

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

// Cuisine Button Event Function controls what restaurants to search for based on cuisine button clicked
cuisineApp.buttonEvent = function() {
    
    const $loginButton = $('#login');
    const $signUpButton = $('#signUp');
    const $signOutButton = $('#signOut');
    const $closeModal = $('.close');
    const $signUpModal = $('#signUpModal');
    const $loginModal = $('#loginModal');

<<<<<<< Updated upstream
    $signOutButton.on('click', function() {
        firebase.auth().signOut().then(function() {
=======
    $signOutButton.on('click', function () {
        firebase.auth().signOut().then(function () {
>>>>>>> Stashed changes
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
            .then(function() {
                const provider = new firebase.auth.GoogleAuthProvider();
              // In memory persistence will be applied to the signed in Google user
              // even though the persistence was set to 'none' and a page redirect
              // occurred.
                return firebase.auth().signInWithRedirect(provider);
            })
            .catch(function(error) {
              // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    });

    $signUpButton.on('click', function(){
        const $signUpForm = $('#signUpForm');
        const $signUpEmailAddress = $('#signUpEmailAddress');
        const $signUpPassword = $('#signUpPassword');
        const $confirmPassword = $('#confirmPassword');

        $loginModal.removeClass('showLoginModal');
        $signUpModal.toggleClass('showSignUpModal');
        $closeModal.on('click', function(){
            $signUpModal.removeClass('showSignUpModal');
        });

        $signUpForm.on('submit', function(event){
            event.preventDefault();
            if ((($signUpEmailAddress.val() !== "") && ($signUpPassword.val() !== "") && ($confirmPassword.val() !== "")) && ($signUpPassword.val() === $confirmPassword.val())){

                let email = $signUpEmailAddress.val();
                let password = $signUpPassword.val();

                firebase.auth().createUserWithEmailAndPassword(email, password)
<<<<<<< Updated upstream
                .catch(function(error) {
                  // Handle Errors here.
                    const signUpErrorCode = error.code;
                    const signUpErrorMessage = error.message;
                    console.log(`${signUpErrorCode} ${signUpErrorMessage}`)
                  // ...
                });
                // const user = firebase.auth().currentUser;

                // if (user) {
                //     console.log('signed in');
                //     $signOutButton.css('display', 'block');
                //     $signUpButton.css('display', 'none');
                //     $loginButton.css('display', 'none');
                //     $signUpModal.removeClass('showSignUpModal');
                //     // User is signed in.
                // }

                firebase.auth().onAuthStateChanged(function(user) {
=======
                    .catch(function (error) {
                        // Handle Errors here.
                        const signUpErrorCode = error.code;
                        const signUpErrorMessage = error.message;
                        console.log(`${signUpErrorCode} ${signUpErrorMessage}`)
                        // ...
                    });
                firebase.auth().onAuthStateChanged(function (user) {
>>>>>>> Stashed changes
                    if (user) {
                        console.log('signed in');
                        $signOutButton.css('display', 'block');
                        $signUpButton.css('display', 'none');
                        $loginButton.css('display', 'none');
                        $signUpModal.removeClass('showSignUpModal');
                    // User is signed in.
                    }
                    else {
                        console.log('signed out');
                    }
                });
            }
            else if ($signUpPassword.val() !== $confirmPassword.val()){
                alert('Error, your passwords do not match!');
            }
            else if (($signUpEmailAddress.val() === "") || ($signUpPassword.val() === "") || ($confirmPassword.val() === "")){
                alert('Error, you are missing an input field!');
            }
        });
    });

    $loginButton.on('click', function(){

        const $loginForm = $('#loginForm');
        let $loginEmailAddress = $('#loginEmailAddress');
        let $loginPassword = $('#loginPassword');

        $signUpModal.removeClass('showSignUpModal');
        $loginModal.toggleClass('showLoginModal');
        $closeModal.on('click', function(){
            $loginModal.removeClass('showLoginModal');
        });

        $loginForm.on('submit', function(event){
            event.preventDefault();
            if (($loginEmailAddress.val() !== "") && ($loginPassword.val() !== "")) {
                
                let email = $loginEmailAddress.val();
                let password = $loginPassword.val();
                
                firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    const loginErrorCode = error.code;
                    const loginErrorMessage = error.message;
                    // ...
                    console.log(`${loginErrorCode} ${loginErrorMessage}`);
                }); 

                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        cuisineApp.bookmarkAjaxRequest();
                        console.log('signed in');
                        $signOutButton.css('display', 'block');
                        $loginButton.css('display', 'none');
                        $signUpButton.css('display', 'none');
                        $loginModal.removeClass('showLoginModal');
                        // User is signed out.
                    }
                    else {
                        console.log('signed out');
                    } 
                });
<<<<<<< Updated upstream

                // const formData = {
                //     email: $emailAddress.val(),
                //     password: $password.val(),
                // }
                // usersRef.once('value', (data) => {
                    // const userData = data.val();
                    // if ((userData.email === formData.email) && (userData.password === formData.password)) {
                    //     alert('Success');
                    // }
                    // else if ((userData.email === formData.email) && (userData.password !== formData.password)) {
                    //     alert('Incorrect password');
                    // }
                    // else {
                    //     usersRef.push(formData);
                    //     // alert('Unsuccessful');
                    // }
                // });
=======
>>>>>>> Stashed changes
            }
            else if (($loginEmailAddress.val() === "") || ($loginPassword.val() === "")){
                alert('Error, you have entered an incorrect email address or password!');
            }
        });
    });

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
<<<<<<< Updated upstream
=======

// SELECTING CUISINE VIA FORM ELEMENT
cuisineApp.selectEvent = function () {

    // Generate variable to store cuisine id 
    const cuisineForm = Array.from($('form').find('select'));
    const cuisineSelection = Array.from($('form').find('option'));
    // console.log(cuisineSelection);

    $(cuisineForm).on('change', function () {
        const option = $(this).children(':selected').attr('id');
        $('.preloader').toggle();
        cuisineSelection.forEach(function () {
            if ($('#displayedRestaurants li').length >= 1) {
                $('#displayedRestaurants').empty();
                const cuisineID = option;
                // console.log(cuisineID)
                cuisineApp.ajaxRequest(cuisineID);
            }
            else {
                const cuisineID = option;
                cuisineApp.ajaxRequest(cuisineID);
            }
        });
    });
}


>>>>>>> Stashed changes
// AJAX Request Function determines what to search for based on user’s choice for cuisine
cuisineApp.ajaxRequest = function(cID) {
    
    // AJAX Function will get info from URL based on argument passed
<<<<<<< Updated upstream
    $.ajax({ 
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
            cuisineApp.bookmarkRestaurants();
        }).catch((error) => {
            console.log(error);
        });
    }
    
=======
    $.ajax({
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
        cuisineApp.bookmarkRestaurants();
    }).catch((error) => {
        // console.log(error);
    });
}

cuisineApp.bookmarkAjaxRequest = function() {

    const dbRef = firebase.database().ref();
    
    // AJAX Function will get info from URL based on argument passed
    function getRestaurant(restaurantID){
        return $.ajax({
            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantID}`,
            method: 'GET',
            dataType: 'json',
            headers: {
                'user-key': cuisineApp.key
            }
        })
    }

    dbRef.on('value', (data) => {
        const bookmarkData = data.val();
        // console.log(bookmarkData);

        const savedBookmarkList = [];

        bookmarkData.bookmarks.forEach((item) => {
            savedBookmarkList.push(getRestaurant(item));
        });

        $.when(...savedBookmarkList)
        .then((...bookmarkedRestaurant) => {
          const restaurantDetail = bookmarkedRestaurant.map( (result) => {
            return result[0];
          });
    
          restaurantDetail.forEach( (item) => {
            // console.log(restaurantDetail);
            cuisineApp.displayBookmarkedRestaurants(item);
          });
        });
    });
}

cuisineApp.displayBookmarkedRestaurants = function(restaurant)  {
    
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
    const $displayedBookmarks = $('#displayedBookmarks');
    const $bookmarkSection = $('#bookmarkSection');

    // 	Append the DOM with the variables in containers
    const restaurantDescription = `
        <li>
            <div class="itemDetails">
                <a href="${url}"><img src="${featuredImage}"></a>
                <div class="bookmark" id="${id}">
                    <i class="fas fa-bookmark saved"></i>
                    <i class="fas fa-star"></i>
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
    $bookmarkSection.css('display', 'block');
    $displayedBookmarks.append(restaurantDescription);


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
}
>>>>>>> Stashed changes

// Display Restaurants Function collected from AJAX request
cuisineApp.displayRestaurants = function(item) {
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
                        <p>${phoneNumber}</p>
                        <p>Price: ${priceRange} | ${reviewCount} Reviews</p>
                    </div>
                </div>
            </li>
<<<<<<< Updated upstream
        `;    
        $displayedRestaurants.append(restaurantDescription);         
    });
}
cuisineApp.bookmarkRestaurants = function() {
    
    const bookmarks = Array.from($('.bookmark'));
    // returns an array of objects
    
    let saved = [];
    
=======
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
cuisineApp.bookmarkRestaurants = function () {

    const dbRef = firebase.database().ref();

    let saved = [];
    const bookmarkList = {
        bookmarks: saved,
    }

    const bookmarks = Array.from(document.querySelectorAll('.bookmark'));
    // returns an array of objects
    // console.log(bookmarks);

>>>>>>> Stashed changes
    bookmarks.forEach(function (bookmark) {
        $(bookmark).on('click', function () {
            dbRef.remove();
            if ($(this).hasClass('saved')) {
                $(this).removeClass('saved');
                saved = saved.filter(function(value) {
                    return value !== $(bookmark).attr('id');
                });
<<<<<<< Updated upstream
            }
=======
                console.log(saved);
            } 
>>>>>>> Stashed changes
            else {
                $(this).addClass('saved');
                saved.push($(this).attr('id'));
                console.log(saved);
            }
            dbRef.set(bookmarkList);
        })
    });
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
}


// Start init app by calling cuisine button event function
cuisineApp.init = function() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    cuisineApp.buttonEvent();
}

// Create document ready to call app init function
$(function() {
    cuisineApp.init();
});
// SCRIPTS ENDS HERE