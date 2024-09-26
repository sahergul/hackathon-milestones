// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumedisplayElement = document.getElementById('resume-display') as HTMLDivElement;

// Handle form submission
form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
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
        // Generate the resume content dynamically
        const resumeHTML = `
        <div class="resume-container">
            <div class="left-section">
                ${imageUrl ? `<img src="${imageUrl}" alt="Profile Picture" class="profile-picture" style="width: 100px; height: 100px;">` : ''}
                <h4>Career Objective</h4>
                <p>${careerObjective}</p>
            </div>
            <div class="right-section">
                <h2><b>${name}'s Resume</b></h2>
                <h4>Personal Information</h4>
                <p><b>Name:</b> ${name}</p>
                <p><b>Address:</b> ${address}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Email:</b> ${email}</p>
    
                <h4>Education</h4>
                <p>${education}</p>
    
                <h4>Experience</h4>
                <p>${experience}</p>
    
                <h4>Skills</h4>
                <p>${skills}</p>
            </div>
        </div>
        `;
    
        // Display the generated resume
        if (resumedisplayElement) {
            resumedisplayElement.innerHTML = resumeHTML;
        } else {
            console.error('The resume display element is missing');
        }
    }
    });
