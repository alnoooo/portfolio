JS

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");
const countDisplay = document.getElementById("project-count");

function updateCount() {
    const visibleProjects = [...projects].filter(
        project => project.style.display !== "none"
    );

    countDisplay.textContent =
        `Showing ${visibleProjects.length} Projects`;
}

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach(project => {

            const category =
                project.dataset.category;

            if(filter === "all" ||
               category === filter){

                project.classList.remove("hide");

                setTimeout(() => {
                    project.style.display = "block";
                },100);

            }else{

                project.classList.add("hide");

                setTimeout(() => {
                    project.style.display = "none";
                },300);
            }
        });

        setTimeout(updateCount,350);

    });

});

updateCount();

async function loadGithubProjects() {

    const response =
    await fetch('projects.json');

    const githubProjects =
    await response.json();

    const container =
    document.getElementById('github-projects');

    githubProjects.forEach(project => {

        const card =
        document.createElement('div');

        card.className = 'project-card';
        card.dataset.category = 'code';

        card.innerHTML = `
            <h3>${project.title}</h3>

            <p>
                ${project.description}
            </p>

            <a href="${project.github}"
               target="_blank"
               class="project-link">
               View Repository →
            </a>
        `;

        container.appendChild(card);

    });

}

loadGithubProjects();