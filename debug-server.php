<?php
// 详细服务器诊断脚本
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>服务器详细诊断</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .section { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #007bff; }
        .success { border-left-color: #28a745; background: #d4edda; }
        .warning { border-left-color: #ffc107; background: #fff3cd; }
        .error { border-left-color: #dc3545; background: #f8d7da; }
        code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; }
        pre { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .test-result { margin: 10px 0; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>📊 三丰云服务器详细诊断</h1>
    
    <?php
    // 1. 基本服务器信息
    echo '<div class="section">';
    echo '<h2>🔧 服务器基本信息</h2>';
    echo '<p><strong>PHP版本:</strong> ' . phpversion() . '</p>';
    echo '<p><strong>服务器软件:</strong> ' . ($_SERVER['SERVER_SOFTWARE'] ?? '未知') . '</p>';
    echo '<p><strong>文档根目录:</strong> ' . ($_SERVER['DOCUMENT_ROOT'] ?? '未知') . '</p>';
    echo '<p><strong>当前URL:</strong> ' . ($_SERVER['REQUEST_URI'] ?? '未知') . '</p>';
    echo '</div>';
    
    // 2. 关键文件检查
    echo '<div class="section">';
    echo '<h2>📁 关键文件检查</h2>';
    
    $critical_files = [
        'index.html' => '主页面文件',
        'style.css' => '样式文件',
        'script.js' => 'JavaScript文件',
        'image-config.js' => '图片配置文件',
        'images/' => '图片目录',
        '.htaccess' => 'Apache配置',
        'web.config' => 'IIS配置'
    ];
    
    foreach ($critical_files as $file => $description) {
        if (file_exists($file)) {
            $perms = substr(sprintf('%o', fileperms($file)), -4);
            $size = is_dir($file) ? '目录' : filesize($file) . ' 字节';
            echo "<div class='test-result success'>✅ <strong>$file</strong> - $description<br>";
            echo "权限: $perms | 大小: $size</div>";
        } else {
            echo "<div class='test-result error'>❌ <strong>$file</strong> - $description<br>";
            echo "文件不存在！这是导致无法访问的主要原因</div>";
        }
    }
    echo '</div>';
    
    // 3. 目录结构检查
    echo '<div class="section">';
    echo '<h2>📂 目录结构检查</h2>';
    
    function scanDirectory($dir, $level = 0) {
        $result = '';
        if (is_dir($dir)) {
            $items = scandir($dir);
            foreach ($items as $item) {
                if ($item == '.' || $item == '..') continue;
                $path = $dir . '/' . $item;
                $indent = str_repeat('  ', $level);
                if (is_dir($path)) {
                    $result .= "$indent📁 $item/\n";
                    $result .= scanDirectory($path, $level + 1);
                } else {
                    $size = filesize($path);
                    $result .= "$indent📄 $item ($size 字节)\n";
                }
            }
        }
        return $result;
    }
    
    $dir_structure = scanDirectory('.');
    echo '<pre>' . $dir_structure . '</pre>';
    echo '</div>';
    
    // 4. 文件权限详细检查
    echo '<div class="section">';
    echo '<h2>🔐 文件权限详细检查</h2>';
    
    function checkPermissions($file) {
        if (!file_exists($file)) return '文件不存在';
        
        $perms = fileperms($file);
        $readable = is_readable($file) ? '可读' : '不可读';
        $writable = is_writable($file) ? '可写' : '不可写';
        $executable = is_executable($file) ? '可执行' : '不可执行';
        
        return "权限: " . substr(sprintf('%o', $perms), -4) . 
               " | $readable | $writable | $executable";
    }
    
    $files_to_check = ['index.html', 'style.css', 'script.js', 'images'];
    foreach ($files_to_check as $file) {
        $status = checkPermissions($file);
        if (strpos($status, '不可读') !== false) {
            echo "<div class='test-result error'>❌ $file: $status</div>";
        } else {
            echo "<div class='test-result success'>✅ $file: $status</div>";
        }
    }
    echo '</div>';
    
    // 5. 服务器配置测试
    echo '<div class="section">';
    echo '<h2>⚙️ 服务器配置测试</h2>';
    
    // 测试mod_rewrite
    if (function_exists('apache_get_modules')) {
        $modules = apache_get_modules();
        $has_rewrite = in_array('mod_rewrite', $modules);
        echo $has_rewrite ? 
            "<div class='test-result success'>✅ mod_rewrite 已启用</div>" :
            "<div class='test-result warning'>⚠️ mod_rewrite 未启用</div>";
    }
    
    // 测试MIME类型
    $css_content = @file_get_contents('style.css');
    if ($css_content !== false) {
        echo "<div class='test-result success'>✅ CSS文件可正常访问</div>";
    } else {
        echo "<div class='test-result error'>❌ CSS文件无法访问</div>";
    }
    
    // 测试默认文档
    $index_content = @file_get_contents('index.html');
    if ($index_content !== false) {
        echo "<div class='test-result success'>✅ index.html可正常访问</div>";
    } else {
        echo "<div class='test-result error'>❌ index.html无法访问</div>";
    }
    echo '</div>';
    
    // 6. 问题解决方案
    echo '<div class="section warning">';
    echo '<h2>🚨 问题诊断与解决方案</h2>';
    
    $issues = [];
    
    // 检查常见问题
    if (!file_exists('index.html')) {
        $issues[] = "❌ <strong>index.html文件不存在</strong> - 这是导致无法访问的主要原因";
    }
    
    if (file_exists('index.html') && !is_readable('index.html')) {
        $issues[] = "❌ <strong>index.html文件不可读</strong> - 权限设置错误";
    }
    
    if (!file_exists('images/')) {
        $issues[] = "⚠️ <strong>images目录不存在</strong> - 图片功能将无法使用";
    }
    
    if (empty($issues)) {
        echo "<div class='test-result success'>✅ 所有关键文件检查通过</div>";
        echo "<p>如果仍然无法访问，可能是以下原因：</p>";
        echo "<ol>
            <li><strong>默认文档配置错误</strong> - 联系三丰云客服检查默认文档设置</li>
            <li><strong>域名解析问题</strong> - 确认域名是否正确解析到服务器</li>
            <li><strong>服务器限制</strong> - 虚拟主机可能有特殊限制</li>
        </ol>";
    } else {
        echo "<h3>发现的问题：</h3>";
        foreach ($issues as $issue) {
            echo "<div class='test-result error'>$issue</div>";
        }
        
        echo "<h3>立即解决方案：</h3>";
        echo "<ol>
            <li><strong>重新上传缺失文件</strong> - 确保所有文件完整上传</li>
            <li><strong>设置正确权限</strong> - HTML/CSS/JS文件设为644，目录设为755</li>
            <li><strong>联系三丰云客服</strong> - 提供此诊断页面结果</li>
        </ol>";
    }
    echo '</div>';
    
    // 7. 联系技术支持信息
    echo '<div class="section">';
    echo '<h2>📞 联系技术支持</h2>';
    echo '<p><strong>请将以下信息提供给三丰云客服：</strong></p>';
    echo '<ul>
        <li>域名：ftp6624864.host128.sanfengyun.cn</li>
        <li>问题描述：访问显示"当前无法使用此页面"</li>
        <li>诊断页面URL：' . ($_SERVER['REQUEST_URI'] ?? '') . '</li>
        <li>PHP版本：' . phpversion() . '</li>
    </ul>';
    echo '<p><strong>要求客服检查：</strong></p>';
    echo '<ol>
        <li>默认文档配置（确保index.html在列表中）</li>
        <li>文件权限设置</li>
        <li>静态文件支持配置</li>
        <li>服务器限制检查</li>
    </ol>';
    echo '</div>';
    ?>
    
    <div class="section">
        <h2>🔗 直接测试链接</h2>
        <p>点击测试各个文件是否能正常访问：</p>
        <ul>
            <li><a href="index.html">测试主页面</a></li>
            <li><a href="style.css">测试CSS文件</a></li>
            <li><a href="script.js">测试JavaScript文件</a></li>
            <li><a href="images/">测试图片目录</a></li>
        </ul>
    </div>
</body>
</html>