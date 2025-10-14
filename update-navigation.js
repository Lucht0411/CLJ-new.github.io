// 更新所有页面的导航栏
const fs = require('fs');
const path = require('path');

// 新的导航栏HTML（桌面版）
const newDesktopNav = `                <!-- Desktop Navigation - 左侧导航 -->
                <div class="hidden md:flex items-center space-x-1">
                    <a href="index.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        <span data-i18n="home">ホーム</span>
                    </a>
                    <a href="company.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        <span data-i18n="company">会社案内</span>
                    </a>
                    <a href="services.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        <span data-i18n="services">サービス</span>
                    </a>
                    <a href="schedule.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        <span data-i18n="schedule">スケジュール</span>
                    </a>
                    <a href="news.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        <span data-i18n="news">ニュース</span>
                    </a>
                    <a href="contact.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        <span data-i18n="contact">お問い合わせ</span>
                    </a>
                    <a href="recruitment.html" class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                        採用情報
                    </a>
                </div>`;

// 新的导航栏HTML（移动端）
const newMobileNav = `            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="index.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span data-i18n="home">ホーム</span>
                </a>
                <a href="company.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span data-i18n="company">会社案内</span>
                </a>
                <a href="services.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span data-i18n="services">サービス</span>
                </a>
                <a href="schedule.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span data-i18n="schedule">スケジュール</span>
                </a>
                <a href="news.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span data-i18n="news">ニュース</span>
                </a>
                <a href="contact.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span data-i18n="contact">お問い合わせ</span>
                </a>
                <a href="recruitment.html" class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    採用情報
                </a>
            </div>
            
            <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between mb-3">
                    <select id="mobileLanguageSelector" class="form-input text-sm flex-1 mr-2">
                        <option value="ja">日本語</option>
                        <option value="zh">中文</option>
                        <option value="en">English</option>
                    </select>
                    <button id="mobileLoginBtn" class="p-2 text-gray-600 hover:text-primary-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </button>
                </div>
            </div>`;

// 新的右侧功能区
const newRightSection = `                <!-- 右侧功能区 -->
                <div class="flex items-center space-x-2">
                    <!-- Language Selector -->
                    <div class="hidden md:block">
                        <select id="languageSelector" class="form-input text-sm py-1 px-2 border-0 bg-transparent">
                            <option value="ja">日本語</option>
                            <option value="zh">中文</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    
                    <!-- Theme Toggle -->
                    <button id="themeToggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                        </svg>
                    </button>
                    
                    <!-- Login Button - 图标版本 -->
                    <button id="loginBtn" class="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </button>
                </div>`;

// 文件列表
const files = ['company.html', 'services.html', 'news.html', 'contact.html', 'recruitment.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 更新标题为 COSCO SHIPPING LOGISTICS (JAPAN)
    content = content.replace(/<title>.*?<\/title>/, '<title>COSCO SHIPPING LOGISTICS (JAPAN)</title>');
    
    // 更新导航栏结构
    // 这里需要根据每个文件的具体结构进行调整
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('Navigation update completed!');