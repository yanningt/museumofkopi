$(document).ready(function () {
    // HTML element to write selection feedback into
    let confirmElement = $("#selection-confirm");

    // Hide the .game.result div initially
    $("#gameresult").hide();

    // Bind to form Submit
    $("#select-coffee").on("submit", function (event) {
        // Prevent default form submit behavior (page reload)
        event.preventDefault();

        // Get the selected values from the form
        var formValues = $(this).serializeArray();
        var milkSelection = formValues.find(item => item.name === 'milk').value;
        var strengthSelection = formValues.find(item => item.name === 'strength').value;
        var sugarSelection = parseInt(formValues.find(item => item.name === 'sugar').value);
        var iceSelection = formValues.find(item => item.name === 'iced').value;

        // Translation logic
        var kopiType = "Kopi"; // Initialize with base word

        // Show the pop-up box if forbidden kopi is ordered
        if (sugarSelection === 0 && milkSelection === 'condensed') {
            showPopup();
            $("#gamequiz").show();
            $("#gameresult").hide();

        } else {
            // Milk selection
            if (milkSelection === 'none') {
                kopiType += " O";
            } else if (milkSelection === 'evaporated') {
                kopiType += " C";
            }

            // Strength selection
            if (strengthSelection === 'weak') {
                kopiType += " Po";
            } else if (strengthSelection === 'strong') {
                kopiType += " Gao";
            }

            // Sugar selection
            if (sugarSelection === 0) {
                kopiType += " Kosong";
            } else if (sugarSelection === 50) {
                kopiType += " Siew Dai";
            } else if (sugarSelection === 150) {
                kopiType += " Ga Dai";
            }

            // Ice selection
            if (iceSelection === 'yes') {
                kopiType += " Peng";
            }

            // Write feedback into confirm element
            confirmElement.html("<result>" + kopiType + "</result>");

            // Display the .game.result div
            $("#gameresult").show();

            // Hide the .game div regardless of kopi selection
            $("#gamequiz").hide();


            // Display the appropriate image based on selections
            var imageUrl;

            if (milkSelection === 'none' && iceSelection === 'no') {
                imageUrl = "images/hotblack.gif";
            } else if (milkSelection === 'none' && iceSelection === 'yes') {
                imageUrl = "images/iceblack.gif";
            } else if ((milkSelection === 'evaporated' || milkSelection === 'condensed') && iceSelection === 'no') {
                imageUrl = "images/hotwhite.gif";
            } else if ((milkSelection === 'evaporated' || milkSelection === 'condensed') && iceSelection === 'yes') {
                imageUrl = "images/icewhite.gif";
            }
            

            // Select the container element where the image should be inserted
            var imageContainer = $("#gameresult .imageresult");

            // Update the content of the container element with the image tag
            imageContainer.html("<img src='" + imageUrl + "' alt='Kopi Image'>");


            // Define the confirmation message variable
            var confirmationMessage = "which is a... ";


            // Append selected options to the confirmation message
            confirmationMessage = "<p>" + confirmationMessage + strengthSelection.toLowerCase() + " coffee with " + sugarSelection + "% sugar" + ", and with " + milkSelection.toLowerCase() + " milk";

            if (iceSelection === "yes") {
                confirmationMessage += " and ice. </p>"
            } else {
                confirmationMessage += " and no ice. </p>"
            }

            confirmationMessage +=

                // Display the confirmation message
                $("#confirmation-message").html(confirmationMessage);


            // Show .textbox.goodchoice and .dabao
            $(".textbox.goodchoice, .dabao").show();



        }


    });

    // Function to show the pop-up box
    function showPopup() {
        document.getElementById("popup-container").style.display = "block";
    }

    // Function to hide the pop-up box
    function hidePopup() {
        document.getElementById("popup-container").style.display = "none";
    }

    // Bind the hidePopup function to the close button click event
    $("#close-popup-btn").on("click", function () {
        // Hide the pop-up box
        hidePopup();
        // Show the .game div
        $("#gamequiz").show();
    });

    // Click event handler for "Restart quiz" button
    $(".game.result button").click(function () {
        // Show the .game div
        $("#gamequiz").show();
        // Hide the .game.result div
        $("#gameresult").hide();
        // Hide the pop-up box
        hidePopup();
    });

    // Change event handler for radio buttons
    $('input[type="radio"]').change(function () {
        // Traverse up the DOM to find the parent fieldset
        var fieldset = this.closest('fieldset');

        // Remove 'selected' class from all labels within the same fieldset
        fieldset.querySelectorAll('label').forEach(function (label) {
            label.classList.remove('selected');
        });

        // Add 'selected' class to the label associated with the selected radio button
        var labelElement = document.querySelector('label[for="' + this.id + '"]');
        labelElement.classList.add('selected');
    });
});
