// 数据存储管理
class DataManager {
    constructor() {
        this.initDefaultData();
    }

    initDefaultData() {
        if (!localStorage.getItem('portfolioData')) {
            const defaultData = {
                hero: {
                    title: 'UX 设计师',
                    subtitle: '创造有意义的用户体验',
                    buttonText: '查看作品',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                },
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

    updateHero(hero) {
        const data = this.getData();
        data.hero = hero;
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
    editHeroTitle: document.getElementById('edit-hero-title'),
    editHeroSubtitle: document.getElementById('edit-hero-subtitle'),
    editHeroButton: document.getElementById('edit-hero-button'),
    editHeroBg: document.getElementById('edit-hero-bg'),
    saveHero: document.getElementById('save-hero'),
    editAbout: document.getElementById('edit-about'),
    saveAbout: document.getElementById('save-about'),
    newSkill: document.getElementById('new-skill'),
    addSkill: document.getElementById('add-skill'),
    skillsList: document.getElementById('skills-list'),
    workTitle: document.getElementById('work-title'),
    workDescription: document.getElementById('work-description'),
    workCategory: document.getElementById('work-category'),
    workDate: document.getElementById('work-date'),
    workTags: document.getElementById('work-tags'),
    workImage: document.getElementById('work-image'),
    workGallery: document.getElementById('work-gallery'),
    editImage: document.getElementById('edit-image'),
    addWork: document.getElementById('add-work'),
    worksList: document.getElementById('works-list'),
    editEmail: document.getElementById('edit-email'),
    editPhone: document.getElementById('edit-phone'),
    editBehance: document.getElementById('edit-behance'),
    editDribbble: document.getElementById('edit-dribbble'),
    editLinkedin: document.getElementById('edit-linkedin'),
    saveContact: document.getElementById('save-contact'),
    hero: document.querySelector('.hero'),
    heroTitle: document.querySelector('.hero-content h1'),
    heroSubtitle: document.querySelector('.hero-content p'),
    heroButton: document.querySelector('.hero-content .btn'),
    aboutDescription: document.getElementById('about-description'),
    skills: document.querySelector('.skills'),
    contactEmail: document.getElementById('contact-email'),
    contactPhone: document.getElementById('contact-phone'),
    socialLinks: document.querySelectorAll('.social-link'),
    // 图片编辑器元素
    imageEditor: document.getElementById('image-editor'),
    closeEditor: document.getElementById('close-editor'),
    editorCanvas: document.getElementById('editor-canvas'),
    undoBtn: document.getElementById('undo-btn'),
    redoBtn: document.getElementById('redo-btn'),
    resetBtn: document.getElementById('reset-btn'),
    editorTabs: document.querySelectorAll('.editor-tab'),
    editorPanes: document.querySelectorAll('.editor-pane'),
    cropBtns: document.querySelectorAll('.crop-btn'),
    rotateLeft: document.getElementById('rotate-left'),
    rotateRight: document.getElementById('rotate-right'),
    brightness: document.getElementById('brightness'),
    contrast: document.getElementById('contrast'),
    saturation: document.getElementById('saturation'),
    filterItems: document.querySelectorAll('.filter-item'),
    textInput: document.getElementById('text-input'),
    textFont: document.getElementById('text-font'),
    textSize: document.getElementById('text-size'),
    textColor: document.getElementById('text-color'),
    addText: document.getElementById('add-text'),
    stickerItems: document.querySelectorAll('.sticker-item'),
    saveJpg: document.getElementById('save-jpg'),
    savePng: document.getElementById('save-png')
};

// 图片编辑器类
class ImageEditor {
    constructor() {
        this.canvas = elements.editorCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.originalImage = null;
        this.currentImage = null;
        this.history = [];
        this.historyIndex = -1;
        this.filters = {
            none: (ctx) => {},
            grayscale: (ctx) => {
                ctx.filter = 'grayscale(100%)';
            },
            sepia: (ctx) => {
                ctx.filter = 'sepia(100%)';
            },
            blur: (ctx) => {
                ctx.filter = 'blur(5px)';
            },
            bright: (ctx) => {
                ctx.filter = 'brightness(150%)';
            },
            dark: (ctx) => {
                ctx.filter = 'brightness(70%)';
            },
            warm: (ctx) => {
                ctx.filter = 'sepia(30%) brightness(110%)';
            },
            cool: (ctx) => {
                ctx.filter = 'hue-rotate(180deg) brightness(105%)';
            },
            vintage: (ctx) => {
                ctx.filter = 'sepia(50%) contrast(120%) brightness(90%)';
            },
            pop: (ctx) => {
                ctx.filter = 'saturate(150%) contrast(120%)';
            }
        };
        this.currentFilter = 'none';
        this.brightness = 0;
        this.contrast = 0;
        this.saturation = 0;
        this.rotation = 0;
        this.cropRatio = 'free';
        this.texts = [];
        this.stickers = [];
        this.initEventListeners();
    }

    initEventListeners() {
        // 编辑器开关
        elements.editImage.addEventListener('click', () => this.openEditor());
        elements.closeEditor.addEventListener('click', () => this.closeEditor());

        // 编辑器标签切换
        elements.editorTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                elements.editorTabs.forEach(t => t.classList.remove('active'));
                elements.editorPanes.forEach(pane => pane.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
            });
        });

        // 裁剪按钮
        elements.cropBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.cropBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.cropRatio = btn.dataset.ratio;
            });
        });

        // 旋转按钮
        elements.rotateLeft.addEventListener('click', () => this.rotate(-90));
        elements.rotateRight.addEventListener('click', () => this.rotate(90));

        // 调整参数
        elements.brightness.addEventListener('input', (e) => {
            this.brightness = parseInt(e.target.value);
            this.applyChanges();
        });
        elements.contrast.addEventListener('input', (e) => {
            this.contrast = parseInt(e.target.value);
            this.applyChanges();
        });
        elements.saturation.addEventListener('input', (e) => {
            this.saturation = parseInt(e.target.value);
            this.applyChanges();
        });

        // 滤镜
        elements.filterItems.forEach(item => {
            item.addEventListener('click', () => {
                elements.filterItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.currentFilter = item.dataset.filter;
                this.applyChanges();
            });
        });

        // 添加文字
        elements.addText.addEventListener('click', () => this.addText());

        // 添加贴纸
        elements.stickerItems.forEach(item => {
            item.addEventListener('click', () => {
                this.addSticker(item.dataset.sticker);
            });
        });

        // 撤销/重做
        elements.undoBtn.addEventListener('click', () => this.undo());
        elements.redoBtn.addEventListener('click', () => this.redo());
        elements.resetBtn.addEventListener('click', () => this.reset());

        // 保存
        elements.saveJpg.addEventListener('click', () => this.save('jpg'));
        elements.savePng.addEventListener('click', () => this.save('png'));
    }

    openEditor() {
        const imageUrl = elements.workImage.value.trim();
        if (!imageUrl) {
            alert('请先输入图片URL');
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            this.originalImage = img;
            this.currentImage = img;
            this.reset();
            this.canvas.width = Math.min(img.width, 800);
            this.canvas.height = Math.min(img.height, 600);
            this.applyChanges();
            elements.imageEditor.classList.add('active');
        };
        img.onerror = () => {
            alert('图片加载失败，请检查URL');
        };
        img.src = imageUrl;
    }

    closeEditor() {
        elements.imageEditor.classList.remove('active');
    }

    rotate(degrees) {
        this.rotation += degrees;
        this.applyChanges();
    }

    addText() {
        const text = elements.textInput.value.trim();
        if (!text) return;

        this.texts.push({
            text,
            font: `${elements.textSize.value}px ${elements.textFont.value}`,
            color: elements.textColor.value,
            x: 50,
            y: 50
        });
        this.applyChanges();
    }

    addSticker(sticker) {
        this.stickers.push({
            emoji: sticker,
            x: 50,
            y: 50,
            size: 48
        });
        this.applyChanges();
    }

    applyChanges() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 保存当前状态
        this.ctx.save();

        // 应用旋转
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate((this.rotation * Math.PI) / 180);
        this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);

        // 应用滤镜
        this.ctx.filter = 'none';
        this.filters[this.currentFilter](this.ctx);

        // 绘制图像
        this.ctx.drawImage(
            this.currentImage,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        // 应用亮度、对比度、饱和度
        this.ctx.filter = `brightness(${100 + this.brightness}%) contrast(${100 + this.contrast}%) saturate(${100 + this.saturation}%)`;
        this.ctx.drawImage(
            this.canvas,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        // 绘制文字
        this.ctx.filter = 'none';
        this.texts.forEach(textObj => {
            this.ctx.font = textObj.font;
            this.ctx.fillStyle = textObj.color;
            this.ctx.fillText(textObj.text, textObj.x, textObj.y);
        });

        // 绘制贴纸
        this.stickers.forEach(stickerObj => {
            this.ctx.font = `${stickerObj.size}px Arial`;
            this.ctx.fillText(stickerObj.emoji, stickerObj.x, stickerObj.y);
        });

        // 恢复状态
        this.ctx.restore();

        // 保存到历史记录
        this.saveToHistory();
    }

    saveToHistory() {
        // 移除当前索引之后的历史记录
        this.history = this.history.slice(0, this.historyIndex + 1);
        // 保存当前状态
        const state = {
            brightness: this.brightness,
            contrast: this.contrast,
            saturation: this.saturation,
            rotation: this.rotation,
            currentFilter: this.currentFilter,
            texts: JSON.parse(JSON.stringify(this.texts)),
            stickers: JSON.parse(JSON.stringify(this.stickers))
        };
        this.history.push(state);
        this.historyIndex++;

        // 限制历史记录长度
        if (this.history.length > 20) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const state = this.history[this.historyIndex];
            this.brightness = state.brightness;
            this.contrast = state.contrast;
            this.saturation = state.saturation;
            this.rotation = state.rotation;
            this.currentFilter = state.currentFilter;
            this.texts = state.texts;
            this.stickers = state.stickers;
            
            // 更新UI
            elements.brightness.value = this.brightness;
            elements.contrast.value = this.contrast;
            elements.saturation.value = this.saturation;
            elements.filterItems.forEach(item => {
                item.classList.toggle('active', item.dataset.filter === this.currentFilter);
            });

            this.applyChanges();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const state = this.history[this.historyIndex];
            this.brightness = state.brightness;
            this.contrast = state.contrast;
            this.saturation = state.saturation;
            this.rotation = state.rotation;
            this.currentFilter = state.currentFilter;
            this.texts = state.texts;
            this.stickers = state.stickers;
            
            // 更新UI
            elements.brightness.value = this.brightness;
            elements.contrast.value = this.contrast;
            elements.saturation.value = this.saturation;
            elements.filterItems.forEach(item => {
                item.classList.toggle('active', item.dataset.filter === this.currentFilter);
            });

            this.applyChanges();
        }
    }

    reset() {
        this.brightness = 0;
        this.contrast = 0;
        this.saturation = 0;
        this.rotation = 0;
        this.currentFilter = 'none';
        this.texts = [];
        this.stickers = [];
        this.history = [];
        this.historyIndex = -1;

        // 更新UI
        elements.brightness.value = 0;
        elements.contrast.value = 0;
        elements.saturation.value = 0;
        elements.filterItems.forEach(item => {
            item.classList.toggle('active', item.dataset.filter === 'none');
        });
        elements.cropBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.ratio === 'free');
        });

        this.applyChanges();
    }

    save(format) {
        const dataUrl = this.canvas.toDataURL(`image/${format}`, 0.9);
        
        // 创建下载链接
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `edited-image.${format}`;
        link.click();

        // 也可以将结果设置回输入框
        elements.workImage.value = dataUrl;
    }
}

// 初始化页面
function initPage() {
    renderHero();
    renderWorks();
    renderAbout();
    renderContact();
    initCMS();
    // 初始化图片编辑器
    new ImageEditor();
}

// 渲染封面页
function renderHero() {
    const data = dataManager.getData();
    elements.heroTitle.textContent = data.hero.title;
    elements.heroSubtitle.textContent = data.hero.subtitle;
    elements.heroButton.textContent = data.hero.buttonText;
    elements.hero.style.background = data.hero.background;
}

// 渲染作品
function renderWorks(filter = 'all') {
    const data = dataManager.getData();
    const works = filter === 'all' ? data.works : data.works.filter(work => work.category === filter);

    elements.worksGrid.innerHTML = works.map(work => `
        <div class="work-item" data-id="${work.id}" data-category="${work.category}">
            <img src="${work.image}" alt="${work.title}">
            <div class="work-content">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <span class="work-category">${work.category === 'app' ? '移动应用' : work.category === 'web' ? '网站设计' : '品牌设计'}</span>
            </div>
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', () => {
            const workId = parseInt(item.dataset.id);
            showWorkDetail(workId);
        });
    });
}

// 显示作品详情
function showWorkDetail(workId) {
    const data = dataManager.getData();
    const work = data.works.find(w => w.id == workId);
    if (!work) return;

    // 隐藏作品列表，显示详情页
    document.getElementById('works').classList.add('hidden');
    document.getElementById('work-detail').classList.add('active');

    // 填充详情页内容
    const detailContent = document.getElementById('work-detail-content');
    detailContent.innerHTML = `
        <div class="work-detail-header">
            <h1>${work.title}</h1>
            <div class="work-detail-meta">
                <span>分类: ${work.category === 'app' ? '移动应用' : work.category === 'web' ? '网站设计' : '品牌设计'}</span>
                <span>创作时间: ${work.date || '2026'}</span>
            </div>
            <div class="work-detail-tags">
                ${work.tags ? work.tags.map(tag => `<span class="work-detail-tag">${tag}</span>`).join('') : ''}
            </div>
        </div>
        <img src="${work.image}" alt="${work.title}" class="work-detail-image">
        <div class="work-detail-body">
            <div class="work-detail-description">${work.description}</div>
            ${work.gallery ? `
                <div class="work-detail-gallery">
                    ${work.gallery.map(img => `<img src="${img}" alt="${work.title}">`).join('')}
                </div>
            ` : ''}
        </div>
    `;

    // 添加返回按钮事件
    document.getElementById('back-to-works').addEventListener('click', () => {
        document.getElementById('work-detail').classList.remove('active');
        document.getElementById('works').classList.remove('hidden');
    });
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

    // 保存封面页
    elements.saveHero.addEventListener('click', () => {
        const hero = {
            title: elements.editHeroTitle.value.trim(),
            subtitle: elements.editHeroSubtitle.value.trim(),
            buttonText: elements.editHeroButton.value.trim(),
            background: elements.editHeroBg.value.trim()
        };
        if (hero.title && hero.subtitle && hero.buttonText && hero.background) {
            dataManager.updateHero(hero);
            renderHero();
            alert('封面页已保存');
        }
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
            date: elements.workDate.value.trim(),
            tags: elements.workTags.value.trim() ? elements.workTags.value.trim().split(',').map(tag => tag.trim()) : [],
            image: elements.workImage.value.trim(),
            gallery: elements.workGallery.value.trim() ? elements.workGallery.value.trim().split(',').map(img => img.trim()) : []
        };
        if (work.title && work.description && work.category && work.image) {
            dataManager.addWork(work);
            renderWorks();
            renderWorksList();
            elements.workTitle.value = '';
            elements.workDescription.value = '';
            elements.workCategory.value = '';
            elements.workDate.value = '';
            elements.workTags.value = '';
            elements.workImage.value = '';
            elements.workGallery.value = '';
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

    // 加载封面页
    elements.editHeroTitle.value = data.hero.title;
    elements.editHeroSubtitle.value = data.hero.subtitle;
    elements.editHeroButton.value = data.hero.buttonText;
    elements.editHeroBg.value = data.hero.background;

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
            const date = prompt('创作时间:', work.date || '');
            const tags = prompt('标签 (用逗号分隔):', work.tags ? work.tags.join(', ') : '');
            const image = prompt('主图片URL:', work.image);
            const gallery = prompt('图库图片URL (用逗号分隔):', work.gallery ? work.gallery.join(', ') : '');

            if (title && description && category && image) {
                dataManager.updateWork(id, {
                    title,
                    description,
                    category,
                    date: date.trim(),
                    tags: tags.trim() ? tags.trim().split(',').map(tag => tag.trim()) : [],
                    image,
                    gallery: gallery.trim() ? gallery.trim().split(',').map(img => img.trim()) : []
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