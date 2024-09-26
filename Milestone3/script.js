// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumedisplayElement = document.getElementById('resume-display');
// Handle form submission
form.addEventListener("submit", function (event) {
    var _a, _b;
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var pictureInput = document.getElementById('profile-picture');
    // Get the career objective
    var careerObjective = ((_a = document.querySelector('#objective p')) === null || _a === void 0 ? void 0 : _a.textContent) || 'Seeking a challenging position in an organization where I can use my talents and skills to grow and expand an organization as well as myself.';
    // Handle image file
    var file = (_b = pictureInput.files) === null || _b === void 0 ? void 0 : _b[0];
    var imageUrl = './image.jpg';
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume();
        };
        reader.readAsDataURL(file);
    }
    else {
        generateResume();
    }
    function generateResume() {
        // Generate the resume content dynamically
        var resumeHTML = "\n        <div class=\"resume-container\">\n            <div class=\"left-section\">\n                ".concat(imageUrl ? "<img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\" class=\"profile-picture\" style=\"width: 100px; height: 100px;\">") : '', "\n                <h4>Career Objective</h4>\n                <p>").concat(careerObjective, "</p>\n            </div>\n            <div class=\"right-section\">\n                <h2><b>").concat(name, "'s Resume</b></h2>\n                <h4>Personal Information</h4>\n                <p><b>Name:</b> ").concat(name, "</p>\n                <p><b>Address:</b> ").concat(address, "</p>\n                <p><b>Phone:</b> ").concat(phone, "</p>\n                <p><b>Email:</b> ").concat(email, "</p>\n    \n                <h4>Education</h4>\n                <p>").concat(education, "</p>\n    \n                <h4>Experience</h4>\n                <p>").concat(experience, "</p>\n    \n                <h4>Skills</h4>\n                <p>").concat(skills, "</p>\n            </div>\n        </div>\n        ");
        // Display the generated resume
        if (resumedisplayElement) {
            resumedisplayElement.innerHTML = resumeHTML;
        }
        else {
            console.error('The resume display element is missing');
        }
    }
});
