function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name

    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const location = document.getElementById('profile.location')
    location.innerText = profileData.location

    const phone = document.getElementById('profile.phone')
    phone.innerText = profileData.phone
    phone.href = `tel:${profileData.phone}`

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email
    email.href = `mailto:${profileData.email}`

}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills')
    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('')
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills')
    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('')
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages')
    languages.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join('')
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profile.portfolio')
    portfolio.innerHTML = profileData.portfolio.map(project => {
        return `
            <li>
                <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
                <a href="${project.url}" target="_blank">${project.url}</a>
            </li>
        `
    }).join('')
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience')
    professionalExperience.innerHTML = profileData.professionalExperience.map(experience => {
        return `
            <li>
                <h3 class="title">${experience.name}</h3>
                <p class="period">${experience.period}</p>
                <p>${experience.description}</p>
            </li>
        `
    }).join('')
}

let certificadosData = [];
let currentCertificadoIndex = 0;
let certificadoElements = [];

function updateCertificados(profileData) {
    certificadosData = profileData.certificados;
    if (certificadosData.length > 0) {
        // Cria os elementos dos certificados
        const certificados = document.getElementById('profile.certificados');
        certificados.innerHTML = certificadosData.map(certificado => `
            <li>
                <h3>${certificado.name}</h3>
                <img src="${certificado.logo}" alt="Imagem do certificado" />
                <a href="${certificado.url}" target="_blank">Visualizar PDF</a>
            </li>
        `).join('');

        certificadoElements = certificados.querySelectorAll('li');
        showCertificado(currentCertificadoIndex);
    }
}

function showCertificado(index) {
    if (certificadoElements.length === 0) return;

    const prevIndex = (currentCertificadoIndex - 1 + certificadoElements.length) % certificadoElements.length;
    const nextIndex = (currentCertificadoIndex + 1) % certificadoElements.length;

    // Remove classes dos certificados
    certificadoElements.forEach((el, i) => {
        el.classList.remove('active', 'next', 'prev');
        if (i === index) {
            el.classList.add('active');
        } else if (i === nextIndex) {
            el.classList.add('next');
        } else if (i === prevIndex) {
            el.classList.add('prev');
        }
    });
}

function showNextCertificado() {
    if (certificadosData.length > 0) {
        currentCertificadoIndex = (currentCertificadoIndex + 1) % certificadosData.length;
        showCertificado(currentCertificadoIndex);
    }
}

function showPreviousCertificado() {
    if (certificadosData.length > 0) {
        currentCertificadoIndex = (currentCertificadoIndex - 1 + certificadosData.length) % certificadosData.length;
        showCertificado(currentCertificadoIndex);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Carregando dados do perfil
    fetch('path/to/profile.json')
        .then(response => response.json())
        .then(data => updateCertificados(data));

    document.getElementById('next-button').addEventListener('click', showNextCertificado);
    document.getElementById('prev-button').addEventListener('click', showPreviousCertificado);
});




(async () => {
    const profileData = await fetchProfileData()
    updateProfileInfo(profileData)
    updateSoftSkills(profileData)
    updateHardSkills(profileData)
    updateLanguages(profileData)
    updatePortfolio(profileData)
    updateProfessionalExperience(profileData)
    updateCertificados(profileData)
})()