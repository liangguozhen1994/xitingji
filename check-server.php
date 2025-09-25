<?php
// 服务器环境检查脚本
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>服务器环境检查</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .info { background: #e8f4fd; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .success { background: #e8f6e8; }
        .warning { background: #fff3cd; }
        .error { background: #f8d7da; }
        code { background: #eee; padding: 2px 5px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>服务器环境检查</h1>
    
    <?php
    // 检查PHP版本
    echo '<div class="info">';
    echo '<h3>PHP版本信息</h3>';
    echo '<p>PHP版本: ' . phpversion() . '</p>';
    echo '</div>';
    
    // 检查文件权限
    echo '<div class="info">';
    echo '<h3>文件权限检查</h3>';
    $files_to_check = ['index.html', 'style.css', 'script.js', 'images/'];
    
    foreach ($files_to_check as $file) {
        if (file_exists($file)) {
            $perms = substr(sprintf('%o', fileperms($file)), -4);
            echo "<p><span class='success'>✓</span> $file 存在 (权限: $perms)</p>";
        } else {
            echo "<p><span class='error'>✗</span> $file 不存在</p>";
        }
    }
    echo '</div>';
    
    // 检查目录列表
    echo '<div class="info">';
    echo '<h3>目录结构</h3>';
    function listDirectory($dir, $level = 0) {
        $items = scandir($dir);
        foreach ($items as $item) {
            if ($item == '.' || $item == '..') continue;
            $path = $dir . '/' . $item;
            $indent = str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;', $level);
            if (is_dir($path)) {
                echo "<p>$indent📁 $item/</p>";
                listDirectory($path, $level + 1);
            } else {
                echo "<p>$indent📄 $item</p>";
            }
        }
    }
    listDirectory('.');
    echo '</div>';
    
    // 服务器信息
    echo '<div class="info">';
    echo '<h3>服务器信息</h3>';
    echo '<p>服务器软件: ' . ($_SERVER['SERVER_SOFTWARE'] ?? '未知') . '</p>';
    echo '<p>文档根目录: ' . ($_SERVER['DOCUMENT_ROOT'] ?? '未知') . '</p>';
    echo '<p>当前URL: ' . ($_SERVER['REQUEST_URI'] ?? '未知') . '</p>';
    echo '</div>';
    ?>
    
    <div class="info warning">
        <h3>问题排查步骤</h3>
        <ol>
            <li><strong>检查默认文档</strong>: 确保服务器配置了 <code>index.html</code> 作为默认文档</li>
            <li><strong>检查文件权限</strong>: 确保所有文件权限正确（通常应为644，目录为755）</li>
            <li><strong>检查路径大小写</strong>: Linux服务器对文件名大小写敏感，确保文件名正确</li>
            <li><strong>联系客服</strong>: 如果以上都正常，请联系三丰云客服检查服务器配置</li>
        </ol>
    </div>
    
    <div class="info">
        <h3>立即测试</h3>
        <p>点击以下链接测试网站功能：</p>
        <ul>
            <li><a href="index.html">访问主页面</a></li>
            <li><a href="style.css">测试CSS文件</a></li>
            <li><a href="script.js">测试JavaScript文件</a></li>
            <li><a href="images/">测试图片目录</a></li>
        </ul>
    </div>
</body>
</html>