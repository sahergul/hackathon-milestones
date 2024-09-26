// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumedisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
// Handle form submission
form.addEventListener("submit", function (event) {
    var _a, _b;
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
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
        // Save form data in local storage with username as the key 
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            education: education,
            experience: experience,
            skills: skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
        // Generate the resume content dynamically, Editable & shareable
        var resumeHTML = "\n        <div class=\"resume-container\">\n            <div class=\"left-section\">\n                ".concat(imageUrl ? "<img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\" class=\"profile-picture\" style=\"width: 100px; height: 100px;\">") : '', "\n                <h4>Career Objective</h4>\n                <p>").concat(careerObjective, "</p>\n            </div>\n            <div class=\"right-section\">\n                <h2><b>Editable Resume</b></h2>\n                <h4>Personal Information</h4>\n                <p><b>Name:</b><span contenteditable=\"true\"> ").concat(name, "</span></p>\n                <p><b>Address:</b><span contenteditable=\"true\"> ").concat(address, "</span></p>\n                <p><b>Phone:</b><span contenteditable=\"true\"> ").concat(phone, "</span></p>\n                <p><b>Email:</b><span contenteditable=\"true\"> ").concat(email, "</span></p>\n    \n                <h4>Education</h4>\n                <p contenteditable=\"true\">").concat(education, "</p>\n    \n                <h4>Experience</h4>\n                <p contenteditable=\"true\">").concat(experience, "</p>\n    \n                <h4>Skills</h4>\n                <p contenteditable=\"true\">").concat(skills, "</p>\n            </div>\n        </div>\n        ");
        // Display the generated resume
        resumedisplayElement.innerHTML = resumeHTML;
        // Generate a shareable URL with the username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
        // Handle PDF download
        downloadPdfButton.addEventListener('click', function () {
            window.print(); // This will open the print dialog and allow the user to save as PDF
        });
        // Prefill the form based on the username in the URL
        window.addEventListener('DOMContentLoaded', function () {
            var urlParams = new URLSearchParams(window.location.search);
            var username = urlParams.get('username');
            if (username) {
                // Autofill form if data is found in localStorage
                var savedResumeData = localStorage.getItem(username);
                if (savedResumeData) {
                    var resumeData_1 = JSON.parse(savedResumeData);
                    document.getElementById('username').value = username;
                    document.getElementById('name').value = resumeData_1.name;
                    document.getElementById('email').value = resumeData_1.email;
                    document.getElementById('phone').value = resumeData_1.phone;
                    document.getElementById('address').value = resumeData_1.address;
                    document.getElementById('education').value = resumeData_1.education;
                    document.getElementById('experience').value = resumeData_1.experience;
                    document.getElementById('skills').value = resumeData_1.skills;
                }
            }
        });
    }
    ;
});