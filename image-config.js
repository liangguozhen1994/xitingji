// 图片配置文件 - 用于管理本地图片路径
const imageConfig = {
    // 轮播图配置
    carousel: [
        {
            src: "images/carousel/slide1.jpg",
            title: "自然风光",
            description: "捕捉大自然的美丽瞬间"
        },
        {
            src: "images/carousel/slide2.jpg", 
            title: "城市建筑",
            description: "记录城市的独特魅力"
        },
        {
            src: "images/carousel/slide3.jpg",
            title: "人文纪实", 
            description: "展现生活的真实面貌"
        }
    ],
    
    // 图集配置
    galleries: {
        nature: {
            title: "自然风光",
            cover: "images/nature/cover.jpg",
            images: [
                "images/nature/1.jpg",
                "images/nature/2.jpg",
                "images/nature/3.jpg",
                "images/nature/4.jpg",
                "images/nature/5.jpg",
                "images/nature/6.jpg",
                "images/nature/7.jpg",
                "images/nature/8.jpg",
                "images/nature/9.jpg",
                "images/nature/10.jpg",
                "images/nature/11.jpg",
                "images/nature/12.jpg"
            ]
        },
        city: {
            title: "城市建筑", 
            cover: "images/city/cover.jpg",
            images: [
                "images/city/1.jpg",
                "images/city/2.jpg",
                "images/city/3.jpg",
                "images/city/4.jpg",
                "images/city/5.jpg",
                "images/city/6.jpg",
                "images/city/7.jpg",
                "images/city/8.jpg"
            ]
        },
        portrait: {
            title: "人像摄影",
            cover: "images/portrait/cover.jpg", 
            images: [
                "images/portrait/1.jpg",
                "images/portrait/2.jpg",
                "images/portrait/3.jpg",
                "images/portrait/4.jpg",
                "images/portrait/5.jpg",
                "images/portrait/6.jpg",
                "images/portrait/7.jpg",
                "images/portrait/8.jpg",
                "images/portrait/9.jpg",
                "images/portrait/10.jpg",
                "images/portrait/11.jpg",
                "images/portrait/12.jpg",
                "images/portrait/13.jpg",
                "images/portrait/14.jpg",
                "images/portrait/15.jpg"
            ]
        },
        street: {
            title: "街头摄影",
            cover: "images/street/cover.jpg",
            images: [
                "images/street/1.jpg",
                "images/street/2.jpg",
                "images/street/3.jpg",
                "images/street/4.jpg",
                "images/street/5.jpg",
                "images/street/6.jpg",
                "images/street/7.jpg",
                "images/street/8.jpg",
                "images/street/9.jpg",
                "images/street/10.jpg"
            ]
        }
    }
};

// 获取图集数据
function getGalleryData() {
    return imageConfig.galleries;
}

// 获取轮播图数据  
function getCarouselData() {
    return imageConfig.carousel;
}