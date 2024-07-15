// contactForm.js

export function displayContactForm(targetElement) {
    const formHTML = `
        <div class="close absolute top-10 right-10 text-white">
            <button id="close-x" class="bg-yellow-600 rounded p-1 px-3 my-4 w-28">Close</button>
        </div>
        <section id="contact-form-container" class="py-1 bg-blueGray-50">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form id="contact-form">
                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" placeholder="Enter Your Full Name" name="fullName" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="email" placeholder="Enter Your Email" name="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" placeholder="Enter Your Phone Number" name="phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" placeholder="Enter Your Age" name="age" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="password" placeholder="Password" name="password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="password" placeholder="Re-enter Password" name="rePassword" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <button type="submit" class="bg-yellow-600 rounded p-1 px-3 my-4 w-28">Submit</button>
                            </div>
                            <hr class="mt-6 border-b-1 border-blueGray-300">
                        </form>
                    </div>
                </div>
            </div>
        </section>`;

    const bodyContainer = document.getElementById('body');

    if (bodyContainer) {
        bodyContainer.innerHTML = formHTML;

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('Form submitted!');
                // Handle form submission logic here (e.g., AJAX submission)
            });
        }
    } else {
        console.error('Element with id "body" not found.');
    }

    setupCloseButton();
}

function setupCloseButton() {
    const closeButton = document.getElementById('close-x');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked');
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.style.display = 'none';
                // Example redirection after closing the form
                window.location.href = 'http://127.0.0.1:5500/';
            }
        });
    }
}
