// Function to enable dark mode
const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    updateIcons("dark");
};

// Function to disable dark mode
const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
    updateIcons("light");
};

// List of icons to exclude from the theme switch
const excludedIcons = ["profile-pic.png", "about-pic.png","project-1.png","project-2.png"];  // Add your exceptions here

// Function to update all PNG icons based on the theme
const updateIcons = (mode) => {
    const icons = document.querySelectorAll('img[src$=".png"]'); // Select all PNG icons
    icons.forEach((icon) => {
        const currentSrc = icon.src;

        // Check if the icon is in the excluded list
        const isExcluded = excludedIcons.some(excludedIcon => currentSrc.includes(excludedIcon));
        if (isExcluded) {
            return; // Skip this icon if it's in the excluded list
        }

        // If the icon is in the default mode (light), swap it to dark mode version
        if (mode === "dark") {
            // Check if the icon has a '-dark' version or just the default one
            if (currentSrc.includes("-dark.png")) return; // Skip if it's already the dark version
            icon.src = currentSrc.replace(".png", "-dark.png");
        } else {
            // Revert to the default light mode version (without '-dark')
            if (!currentSrc.includes("-dark.png")) return; // Skip if it's already the default version
            icon.src = currentSrc.replace("-dark.png", ".png");
        }
    });
};


// Function to check if dark mode is already enabled
let darkmode = localStorage.getItem("darkmode");
if (darkmode === "active") {
    enableDarkmode(); // Apply dark mode if active
}

// Theme switch logic
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
