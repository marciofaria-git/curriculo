// Menu
const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('menu-principal');
hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
});

// Habilidades, botao mais menos
const skillsGridVisible = document.getElementById('skills-visible');
const skillsGridExtra = document.getElementById('skills-extra-grid');
const toggleSkillsBtn = document.getElementById('toggleSkills');
const skillsExtraContainer = document.getElementById('skills-extra');

fetch('data/skills.json')
    .then(response => response.json())
    .then(skills => {
        //4 primeiras habilidades show
        const visibleSkills = skills.slice(0, 4);
      
        const extraSkills = skills.slice(4);

        // habilidades visíveis
        skillsGridVisible.innerHTML = visibleSkills.map(skill => `
            <div class="habilidade" aria-label="${skill.name}">
                <i class="${skill.icon}" aria-hidden="true"></i>
                <h3>${skill.name}</h3>
            </div>
        `).join('');

        // habilidades extras
        skillsGridExtra.innerHTML = extraSkills.map(skill => `
            <div class="habilidade" aria-label="${skill.name}">
                <i class="${skill.icon}" aria-hidden="true"></i>
                <h3>${skill.name}</h3>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Erro ao carregar as habilidades:', error);
        skillsGridVisible.innerHTML = '<p style="text-align:center; color:var(--muted)">Não foi possível carregar as habilidades.</p>';
    });

    //mostrar mais botao
toggleSkillsBtn.addEventListener('click', () => {
    const isHidden = skillsExtraContainer.classList.contains('hidden');
    skillsExtraContainer.classList.toggle('hidden');
    toggleSkillsBtn.textContent = isHidden ? 'Mostrar menos' : 'Mostrar mais';
    toggleSkillsBtn.setAttribute('aria-expanded', String(isHidden));
});

//cards de projeto
const projetosGrid = document.querySelector('.projetos-grid');

fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        projetosGrid.innerHTML = projects.map(project => `
            <div class="projeto">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="ver-mais" aria-label="Expandir card">Ver mais</button>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Erro ao carregar os projetos:', error);
        projetosGrid.innerHTML = '<p style="text-align:center; color:var(--muted)">Não foi possível carregar os projetos. Tente novamente mais tarde.</p>';
    });

// projeto, botao ver mais ou menos
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.ver-mais');
    if (!btn) return;
    const card = btn.closest('.projeto');
    card.classList.toggle('expandido');
    btn.textContent = card.classList.contains('expandido') ? 'Ver menos' : 'Ver mais';
    btn.setAttribute('aria-label', card.classList.contains('expandido') ? 'Recolher card' : 'Expandir card');
});

// link navbar
const links = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('section')];
const onScroll = () => {
    const pos = window.scrollY + 120;
    let currentId = '';
    for (const s of sections) {
        if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
            currentId = s.id;
            break;
        }
    }
    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();