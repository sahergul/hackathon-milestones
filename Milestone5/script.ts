// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumedisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const shareableLinkContainer=document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement=document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton=document.getElementById("download-pdf") as HTMLButtonElement;

// Handle form submission
form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLTextAreaElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const pictureInput = document.getElementById('profile-picture') as HTMLInputElement;

    // Get the career objective
    const careerObjective = document.querySelector('#objective p')?.textContent || 'Seeking a challenging position in an organization where I can use my talents and skills to grow and expand an organization as well as myself.';

    // Handle image file
    const file = pictureInput.files?.[0];
    let imageUrl = './image.jpg';

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target?.result as string;
            generateResume();
        };
        reader.readAsDataURL(file);
    } else {
        generateResume();
    }
    function generateResume() {
      
        // Save form data in local storage with username as the key 
        const resumeData ={
            name,
            email,
            phone,
            address,
            education,
            experience,
            skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
              
       
        // Generate the resume content dynamically, Editable & shareable
        const resumeHTML = `
        <div class="resume-container">
            <div class="left-section">
                ${imageUrl ? `<img src="${imageUrl}" alt="Profile Picture" class="profile-picture" style="width: 100px; height: 100px;">` : ''}
                <h4>Career Objective</h4>
                <p>${careerObjective}</p>
            </div>
            <div class="right-section">
                <h2><b>Editable Resume</b></h2>
                <h4>Personal Information</h4>
                <p><b>Name:</b><span contenteditable="true"> ${name}</span></p>
                <p><b>Address:</b><span contenteditable="true"> ${address}</span></p>
                <p><b>Phone:</b><span contenteditable="true"> ${phone}</span></p>
                <p><b>Email:</b><span contenteditable="true"> ${email}</span></p>
    
                <h4>Education</h4>
                <p contenteditable="true">${education}</p>
    
                <h4>Experience</h4>
                <p contenteditable="true">${experience}</p>
    
                <h4>Skills</h4>
                <p contenteditable="true">${skills}</p>
            </div>
        </div>
        `;
    
        // Display the generated resume
    resumedisplayElement.innerHTML = resumeHTML;
        // Generate a shareable URL with the username only
    const shareableURL =`${window.location.origin}?username=${encodeURIComponent(username)}`;
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;

        // Handle PDF download
        downloadPdfButton.addEventListener('click', () => {
        window.print(); // This will open the print dialog and allow the user to save as PDF
        });

        // Prefill the form based on the username in the URL
    
    window.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');  
        if (username){
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
        const resumeData = JSON.parse(savedResumeData);
        (document.getElementById('username') as HTMLInputElement).value = username;
        (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
        (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
        (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
        (document.getElementById('address') as HTMLInputElement).value = resumeData.address;
        (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
        (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
        (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
    }
    }
});
};
});  