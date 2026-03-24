// 数据存储管理
class DataManager {
    constructor() {
        this.initDefaultData();
    }

    initDefaultData() {
        if (!localStorage.getItem('portfolioData')) {
            const defaultData = {
                about: {
                    description: '我是一名专业的UX设计师，拥有5年的设计经验，专注于用户体验设计、交互设计和界面设计。我相信好的设计应该是直观、易用且美观的。',
                    skills: ['UI设计', 'UX研究', '交互设计', '原型设计', '用户测试']
                },
                works: [
                    {
                        id: 1,
                        title: '移动应用设计',
                        description: '为健康追踪应用设计的用户界面，注重用户体验和数据可视化。',
                        category: 'app',
                        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20ui%20design%20health%20tracking&image_size=landscape_4_3'
                    },
                    {
                        id: 2,
                        title: '企业网站设计',
                        description: '为科技公司设计的响应式网站，突出品牌形象和产品特性。',
                        category: 'web',
                        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corporate%20website%20design%20modern%20tech&image_size=landscape_4_3'
                    },
                    {
                        id: 3,
                        title: '品牌标识设计',
                        description: '为初创公司设计的品牌标识和视觉识别系统。',
                        category: 'brand',
                        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20logo%20design%20modern%20minimalist&image_size=landscape_4_3'
                    }
                ],
                contact: {
                    email: 'email@example.com',
                    phone: '+86 123 4567 8901',
                    social: {
                        behance: '#',
                        dribbble: '#',
                        linkedin: '#'
                    }
                }
            };
            localStorage.setItem('portfolioData', JSON.stringify(defaultData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('portfolioData'));
    }

    saveData(data) {
        localStorage.setItem('portfolioData', JSON.stringify(data));
    }

    updateAbout(description, skills) {
        const data = this.getData();
        data.about.description = description;
        data.about.skills = skills;
        this.saveData(data);
    }

    addWork(work) {
        const data = this.getData();
        work.id = Date.now();
        data.works.push(work);
        this.saveData(data);
    }

    updateWork(id, updatedWork) {
        const data = this.getData();
        const index = data.works.findIndex(work => work.id == id);
        if (index !== -1) {
            data.works[index] = { ...data.works[index], ...updatedWork };
            this.saveData(data);
        }
    }

    deleteWork(id) {
        const data = this.getData();
        data.works = data.works.filter(work => work.id != id);
        this.saveData(data);
    }

    updateContact(contact) {
        const data = this.getData();
        data.contact = contact;
        this.saveData(data);
    }
}

// 初始化数据管理器
const dataManager = new DataManager();

// DOM元素
const elements = {
    cmsPanel: document.getElementById('cms-panel'),
    toggleCms: document.getElementById('toggle-cms'),
    closeCms: document.getElementById('close-cms'),
    cmsTabs: document.querySelectorAll('.cms-tab'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    worksGrid: document.getElementById('works-grid'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    editAbout: document.getElementById('edit-about'),
    saveAbout: document.getElementById('save-about'),
    newSkill: document.getElementById('new-skill'),
    addSkill: document.getElementById('add-skill'),
    skillsList: document.getElementById('skills-list'),
    workTitle: document.getElementById('work-title'),
    workDescription: document.getElementById('work-description'),
    workCategory: document.getElementById('work-category'),
    workImage: document.getElementById('work-image'),
    addWork: document.getElementById('add-work'),
    worksList: document.getElementById('works-list'),
    editEmail: document.getElementById('edit-email'),
    editPhone: document.getElementById('edit-phone'),
    editBehance: document.getElementById('edit-behance'),
    editDribbble: document.getElementById('edit-dribbble'),
    editLinkedin: document.getElementById('edit-linkedin'),
    saveContact: document.getElementById('save-contact'),
    aboutDescription: document.getElementById('about-description'),
    skills: document.querySelector('.skills'),
    contactEmail: document.getElementById('contact-email'),
    contactPhone: document.getElementById('contact-phone'),
    socialLinks: document.querySelectorAll('.social-link')
};

// 初始化页面
function initPage() {
    renderWorks();
    renderAbout();
    renderContact();
    initCMS();
}

// 渲染作品
function renderWorks(filter = 'all') {
    const data = dataManager.getData();
    const works = filter === 'all' ? data.works : data.works.filter(work => work.category === filter);

    elements.worksGrid.innerHTML = works.map(work => `
        <div class="work-item" data-category="${work.category}">
            <img src="${work.image}" alt="${work.title}">
            <div class="work-content">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <span class="work-category">${work.category === 'app' ? '移动应用' : work.category === 'web' ? '网站设计' : '品牌设计'}</span>
            </div>
        </div>
    `).join('');
}

// 渲染个人介绍
function renderAbout() {
    const data = dataManager.getData();
    elements.aboutDescription.textContent = data.about.description;
    elements.skills.innerHTML = data.about.skills.map(skill => `
        <div class="skill" data-skill="${skill}">${skill}</div>
    `).join('');
}

// 渲染联系信息
function renderContact() {
    const data = dataManager.getData();
    elements.contactEmail.textContent = data.contact.email;
    elements.contactPhone.textContent = data.contact.phone;
    elements.socialLinks.forEach(link => {
        const platform = link.dataset.platform;
        link.href = data.contact.social[platform];
    });
}

// 初始化CMS
function initCMS() {
    // 加载数据到CMS表单
    loadDataToCMS();

    // CMS切换
    elements.toggleCms.addEventListener('click', () => {
        elements.cmsPanel.classList.toggle('active');
    });

    elements.closeCms.addEventListener('click', () => {
        elements.cmsPanel.classList.remove('active');
    });

    // 标签切换
    elements.cmsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            elements.cmsTabs.forEach(t => t.classList.remove('active'));
            elements.tabPanes.forEach(pane => pane.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // 保存个人介绍
    elements.saveAbout.addEventListener('click', () => {
        const description = elements.editAbout.value;
        const skills = Array.from(elements.skillsList.querySelectorAll('li')).map(li => li.dataset.skill);
        dataManager.updateAbout(description, skills);
        renderAbout();
        alert('个人介绍已保存');
    });

    // 添加技能
    elements.addSkill.addEventListener('click', () => {
        const skill = elements.newSkill.value.trim();
        if (skill) {
            addSkillToEditList(skill);
            elements.newSkill.value = '';
        }
    });

    // 添加作品
    elements.addWork.addEventListener('click', () => {
        const work = {
            title: elements.workTitle.value.trim(),
            description: elements.workDescription.value.trim(),
            category: elements.workCategory.value.trim(),
            image: elements.workImage.value.trim()
        };
        if (work.title && work.description && work.category && work.image) {
            dataManager.addWork(work);
            renderWorks();
            renderWorksList();
            elements.workTitle.value = '';
            elements.workDescription.value = '';
            elements.workCategory.value = '';
            elements.workImage.value = '';
            alert('作品已添加');
        }
    });

    // 保存联系信息
    elements.saveContact.addEventListener('click', () => {
        const contact = {
            email: elements.editEmail.value.trim(),
            phone: elements.editPhone.value.trim(),
            social: {
                behance: elements.editBehance.value.trim(),
                dribbble: elements.editDribbble.value.trim(),
                linkedin: elements.editLinkedin.value.trim()
            }
        };
        dataManager.updateContact(contact);
        renderContact();
        alert('联系信息已保存');
    });

    // 过滤按钮
    elements.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderWorks(button.dataset.filter);
        });
    });
}

// 加载数据到CMS
function loadDataToCMS() {
    const data = dataManager.getData();

    // 加载个人介绍
    elements.editAbout.value = data.about.description;
    elements.skillsList.innerHTML = '';
    data.about.skills.forEach(skill => {
        addSkillToEditList(skill);
    });

    // 加载联系信息
    elements.editEmail.value = data.contact.email;
    elements.editPhone.value = data.contact.phone;
    elements.editBehance.value = data.contact.social.behance;
    elements.editDribbble.value = data.contact.social.dribbble;
    elements.editLinkedin.value = data.contact.social.linkedin;

    // 加载作品列表
    renderWorksList();
}

// 添加技能到编辑列表
function addSkillToEditList(skill) {
    const li = document.createElement('li');
    li.dataset.skill = skill;
    li.innerHTML = `
        ${skill}
        <button onclick="removeSkill(this, '${skill}')">删除</button>
    `;
    elements.skillsList.appendChild(li);
}

// 删除技能
function removeSkill(button, skill) {
    button.parentElement.remove();
}

// 渲染作品列表
function renderWorksList() {
    const data = dataManager.getData();
    elements.worksList.innerHTML = data.works.map(work => `
        <div class="work-item-edit">
            <h4>${work.title}</h4>
            <p>${work.description}</p>
            <p>分类: ${work.category}</p>
            <div class="work-actions">
                <button class="edit-btn" onclick="editWork(${work.id})">编辑</button>
                <button class="delete-btn" onclick="deleteWork(${work.id})">删除</button>
            </div>
        </div>
    `).join('');
}

// 编辑作品
function editWork(id) {
    const data = dataManager.getData();
    const work = data.works.find(w => w.id == id);
    if (work) {
        if (confirm('确定要编辑此作品吗？')) {
            const title = prompt('作品标题:', work.title);
            const description = prompt('作品描述:', work.description);
            const category = prompt('分类 (app/web/brand):', work.category);
            const image = prompt('图片URL:', work.image);

            if (title && description && category && image) {
                dataManager.updateWork(id, {
                    title, description, category, image
                });
                renderWorks();
                renderWorksList();
                alert('作品已更新');
            }
        }
    }
}

// 删除作品
function deleteWork(id) {
    if (confirm('确定要删除此作品吗？')) {
        dataManager.deleteWork(id);
        renderWorks();
        renderWorksList();
        alert('作品已删除');
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initPage);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});