// 轮播图功能
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.interval = null;
        this.init();
    }

    init() {
        // 绑定事件
        document.querySelector('.carousel-prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.carousel-next').addEventListener('click', () => this.nextSlide());
        
        // 绑定指示器点击事件
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // 开始自动轮播
        this.startAutoPlay();
        
        // 鼠标悬停时暂停轮播
        const carousel = document.querySelector('.carousel-container');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showSlide(index) {
        // 隐藏所有幻灯片
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 显示当前幻灯片
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }

    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slides.length) {
            next = 0;
        }
        this.showSlide(next);
    }

    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.slides.length - 1;
        }
        this.showSlide(prev);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    startAutoPlay() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// 获取图集数据
function getGalleryData() {
    return getGalleryData ? getGalleryData() : window.getGalleryData ? window.getGalleryData() : {};
}

// 获取轮播图数据
function getCarouselData() {
    return getCarouselData ? getCarouselData() : window.getCarouselData ? window.getCarouselData() : [];
}

// 打开图集全屏页面
function openGallery(galleryId) {
    const galleryData = getGalleryData();
    const gallery = galleryData[galleryId];
    if (!gallery) return;

    // 创建全屏容器
    const fullscreenGallery = document.createElement('div');
    fullscreenGallery.className = 'fullscreen-gallery';
    fullscreenGallery.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 2000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        padding: 20px;
    `;

    // 创建标题栏
    const header = document.createElement('div');
    header.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2001;
    `;

    const title = document.createElement('h2');
    title.textContent = gallery.title;
    title.style.cssText = `
        color: white;
        margin: 0;
        font-size: 1.5rem;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 2.5rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // 创建图片容器
    const galleryContainer = document.createElement('div');
    galleryContainer.style.cssText = `
        margin-top: 80px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
        max-width: 1200px;
        width: 100%;
        padding: 20px 0;
    `;

    // 添加图片
    gallery.images.forEach((imgSrc, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.style.cssText = `
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;

        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = `${gallery.title} ${index + 1}`;
        imgElement.style.cssText = `
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 8px;
            transition: transform 0.3s ease;
        `;

        imgWrapper.addEventListener('mouseenter', () => {
            imgElement.style.transform = 'scale(1.05)';
        });

        imgWrapper.addEventListener('mouseleave', () => {
            imgElement.style.transform = 'scale(1)';
        });

        imgWrapper.addEventListener('click', () => {
            openLightbox(imgSrc, gallery.images, index);
        });

        imgWrapper.appendChild(imgElement);
        galleryContainer.appendChild(imgWrapper);
    });

    // 组装元素
    header.appendChild(title);
    header.appendChild(closeBtn);
    fullscreenGallery.appendChild(header);
    fullscreenGallery.appendChild(galleryContainer);

    // 添加到页面
    document.body.appendChild(fullscreenGallery);

    // 关闭功能
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(fullscreenGallery);
    });

    // ESC键关闭
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(fullscreenGallery);
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
    document.addEventListener('keydown', handleKeyPress);

    // 点击背景关闭
    fullscreenGallery.addEventListener('click', (e) => {
        if (e.target === fullscreenGallery) {
            document.body.removeChild(fullscreenGallery);
            document.removeEventListener('keydown', handleKeyPress);
        }
    });
}

// 图片灯箱功能
function openLightbox(src, images, currentIndex) {
    // 创建灯箱元素
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';

    // 导航按钮
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '‹';
    prevBtn.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.3);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 10px 15px;
        cursor: pointer;
    `;

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '›';
    nextBtn.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.3);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 10px 15px;
        cursor: pointer;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
    `;

    let currentImgIndex = currentIndex;

    function updateImage() {
        img.src = images[currentImgIndex];
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImgIndex = (currentImgIndex + 1) % images.length;
        updateImage();
    });

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });

    // 键盘导航
    document.addEventListener('keydown', function handleKeyPress(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', handleKeyPress);
        } else if (e.key === 'ArrowLeft') {
            currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
            updateImage();
        } else if (e.key === 'ArrowRight') {
            currentImgIndex = (currentImgIndex + 1) % images.length;
            updateImage();
        }
    });

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(img);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);
}

// 模态框关闭功能
function setupModal() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 平滑滚动导航
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初始化轮播图
function initCarousel() {
    const carouselData = getCarouselData();
    const container = document.getElementById('carouselContainer');
    
    if (!container || carouselData.length === 0) {
        // 如果没有配置数据，使用默认示例
        container.innerHTML = `
            <div class="carousel-slide active">
                <img src="https://picsum.photos/1200/600?random=1" alt="摄影作品1">
                <div class="carousel-caption">
                    <h2>自然风光</h2>
                    <p>请上传图片到 images/carousel/ 目录</p>
                </div>
            </div>
            <div class="carousel-slide">
                <img src="https://picsum.photos/1200/600?random=2" alt="摄影作品2">
                <div class="carousel-caption">
                    <h2>城市建筑</h2>
                    <p>请上传图片到 images/carousel/ 目录</p>
                </div>
            </div>
            <div class="carousel-slide">
                <img src="https://picsum.photos/1200/600?random=3" alt="摄影作品3">
                <div class="carousel-caption">
                    <h2>人文纪实</h2>
                    <p>请上传图片到 images/carousel/ 目录</p>
                </div>
            </div>
            <button class="carousel-prev">‹</button>
            <button class="carousel-next">›</button>
            <div class="carousel-indicators">
                <span class="indicator active"></span>
                <span class="indicator"></span>
                <span class="indicator"></span>
            </div>
        `;
    } else {
        // 使用配置数据创建轮播图
        let slidesHTML = '';
        let indicatorsHTML = '';
        
        carouselData.forEach((slide, index) => {
            const activeClass = index === 0 ? 'active' : '';
            slidesHTML += `
                <div class="carousel-slide ${activeClass}">
                    <img src="${slide.src}" alt="${slide.title}">
                    <div class="carousel-caption">
                        <h2>${slide.title}</h2>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `;
            
            indicatorsHTML += `<span class="indicator ${activeClass}"></span>`;
        });
        
        container.innerHTML = `
            ${slidesHTML}
            <button class="carousel-prev">‹</button>
            <button class="carousel-next">›</button>
            <div class="carousel-indicators">${indicatorsHTML}</div>
        `;
    }
    
    // 初始化轮播图功能
    new Carousel();
}

// 初始化图集
function initGalleries() {
    const galleryData = getGalleryData();
    const container = document.getElementById('galleryGrid');
    
    if (!container || Object.keys(galleryData).length === 0) {
        // 如果没有配置数据，使用默认示例
        container.innerHTML = `
            <div class="gallery-item" onclick="openGallery('nature')">
                <img src="https://picsum.photos/400/300?random=4" alt="自然风光">
                <div class="gallery-info">
                    <h3>自然风光</h3>
                    <p>请上传图片到 images/nature/ 目录</p>
                </div>
            </div>
            <div class="gallery-item" onclick="openGallery('city')">
                <img src="https://picsum.photos/400/300?random=5" alt="城市建筑">
                <div class="gallery-info">
                    <h3>城市建筑</h3>
                    <p>请上传图片到 images/city/ 目录</p>
                </div>
            </div>
            <div class="gallery-item" onclick="openGallery('portrait')">
                <img src="https://picsum.photos/400/300?random=6" alt="人像摄影">
                <div class="gallery-info">
                    <h3>人像摄影</h3>
                    <p>请上传图片到 images/portrait/ 目录</p>
                </div>
            </div>
            <div class="gallery-item" onclick="openGallery('street')">
                <img src="https://picsum.photos/400/300?random=7" alt="街头摄影">
                <div class="gallery-info">
                    <h3>街头摄影</h3>
                    <p>请上传图片到 images/street/ 目录</p>
                </div>
            </div>
        `;
    } else {
        // 使用配置数据创建图集
        let galleriesHTML = '';
        
        Object.keys(galleryData).forEach(galleryId => {
            const gallery = galleryData[galleryId];
            galleriesHTML += `
                <div class="gallery-item" onclick="openGallery('${galleryId}')">
                    <img src="${gallery.cover}" alt="${gallery.title}">
                    <div class="gallery-info">
                        <h3>${gallery.title}</h3>
                        <p>${gallery.images.length}张图片</p>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = galleriesHTML;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initCarousel();
    
    // 初始化图集
    initGalleries();
    
    // 设置平滑滚动
    setupSmoothScroll();
    
    console.log('摄影网站初始化完成');
});