function showSection(sectionId) {
    document.querySelectorAll(".info-section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}

