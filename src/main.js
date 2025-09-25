// 全局变量
let currentGallery = [];
let uploadedImages = [];

// 初始化函数
function init() {
    loadGalleryData();
    setupEventListeners();
    showSection('home');
}

// 加载图库数据
function loadGalleryData() {
    // 示例数据 - 实际应用中可以从API获取
    currentGallery = [
        {
            id: 1,
            src: 'https://picsum.photos/400/300?random=1',
            title: '自然风光',
            category: 'nature',
            description: '美丽的自然景观摄影作品'
        },
        {
            id: 2,
            src: 'https://picsum.photos/400/300?random=2',
            title: '城市夜景',
            category: 'city',
            description: '现代城市夜景摄影'
        },
        {
            id: 3,
            src: 'https://picsum.photos/400/300?random=3',
            title: '人像摄影',
            category: 'portrait',
            description: '专业人像摄影作品'
        },
        {
            id: 4,
            src: 'https://picsum.photos/400/300?random=4',
            title: '街头瞬间',
            category: 'street',
            description: '街头生活摄影'
        },
        {
            id: 5,
            src: 'https://picsum.photos/400/300?random=5',
            title: '山水之间',
            category: 'nature',
            description: '山水风光摄影'
        },
        {
            id: 6,
            src: 'https://picsum.photos/400/300?random=6',
            title: '建筑艺术',
            category: 'city',
            description: '现代建筑摄影'
        }
    ];
    
    renderGallery();
}

// 渲染图库
function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    const filteredImages = filter === 'all' 
        ? [...currentGallery, ...uploadedImages]
        : [...currentGallery, ...uploadedImages].filter(img => img.category === filter);
    
    galleryGrid.innerHTML = filteredImages.map(image => `
        <div class="gallery-item" data-category="${image.category}" onclick="openModal('${image.src}', '${image.title}', '${image.description}')">
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="image-overlay">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
            </div>
        </div>
    `).join('');
}

// 设置事件监听器
function setupEventListeners() {
    // 导航链接点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            showSection(target);
            
            // 更新活动状态
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // 筛选按钮事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            
            // 更新活动状态
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            renderGallery(filter);
        });
    });
    
    // 文件上传事件
    const fileInput = document.getElementById('fileInput');
    const uploadBox = document.getElementById('uploadBox');
    
    // 点击上传区域触发文件选择
    uploadBox.addEventListener('click', () => {
        fileInput.click();
    });
    
    // 拖放功能
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#ff6b6b';
        uploadBox.style.background = 'rgba(255, 107, 107, 0.1)';
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = '#764ba2';
        uploadBox.style.background = 'rgba(118, 75, 162, 0.05)';
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#764ba2';
        uploadBox.style.background = 'rgba(118, 75, 162, 0.05)';
        
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    // 文件选择变化事件
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    });
}

// 处理上传的文件
function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB限制
    );
    
    if (validFiles.length === 0) {
        alert('请选择有效的图片文件（最大10MB）');
        return;
    }
    
    // 显示上传进度
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    uploadProgress.style.display = 'block';
    
    // 模拟上传过程（实际应用中需要调用API）
    let uploadedCount = 0;
    
    validFiles.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // 创建图片对象
            const newImage = {
                id: Date.now() + index,
                src: e.target.result,
                title: file.name.replace(/\.[^/.]+$/, ""), // 移除扩展名
                category: 'uploaded',
                description: `上传时间: ${new Date().toLocaleString()}`
            };
            
            uploadedImages.push(newImage);
            uploadedCount++;
            
            // 更新进度
            const progress = (uploadedCount / validFiles.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            if (uploadedCount === validFiles.length) {
                // 上传完成
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    progressFill.style.width = '0%';
                    alert(`成功上传 ${validFiles.length} 张图片`);
                    
                    // 刷新图库显示
                    renderGallery();
                }, 500);
            }
        };
        
        reader.readAsDataURL(file);
    });
}

// 显示指定区域
function showSection(sectionId) {
    // 隐藏所有区域
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标区域
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // 如果是图库区域，确保图库已渲染
        if (sectionId === 'gallery') {
            renderGallery();
        }
    }
}

// 打开图片模态框
function openModal(src, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    
    modalImage.src = src;
    imageTitle.textContent = title;
    imageDescription.textContent = description;
    modal.style.display = 'block';
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeyPress);
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // 移除键盘事件监听
    document.removeEventListener('keydown', handleKeyPress);
}

// 键盘事件处理
function handleKeyPress(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeModal();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 全局函数供HTML调用
window.showSection = showSection;
window.openModal = openModal;
window.closeModal = closeModal;