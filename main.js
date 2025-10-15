// COSCO SHIPPING LOGISTICS 主要JavaScript文件
// 包含所有交互功能和动画效果

class CoscoApp {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'ja';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.initLanguage();
        this.initTheme();
        this.initNavigation();
        this.initScrollAnimations();
        this.initCarousels();
        this.initForms();
        this.initModals();
        this.initSchedulePage();
        this.initLogin();
    }

    // 语言切换功能
    initLanguage() {
        const languageSelector = document.getElementById('languageSelector');
        const mobileLanguageSelector = document.getElementById('mobileLanguageSelector');
        
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
            languageSelector.value = this.currentLanguage;
        }
        
        if (mobileLanguageSelector) {
            mobileLanguageSelector.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
            mobileLanguageSelector.value = this.currentLanguage;
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateLanguageContent(lang);
        
        // 添加语言切换动画
        anime({
            targets: '.content-area, main',
            opacity: [1, 0.7, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    }

    updateLanguageContent(lang) {
        const translations = {
            ja: {
                home: 'ホーム',
                company: '会社案内',
                services: 'サービス',
                schedule: 'スケジュール',
                news: 'ニュース',
                contact: 'お問い合わせ',
                login: 'ログイン',
                username: 'ユーザーID',
                password: 'パスワード',
                forgotPassword: 'パスワードを忘れた方',
                submit: '送信',
                cancel: 'キャンセル',
                moreInfo: '詳しくはこちら',
                'vessel-schedule': '船期検索',
                'cargo-tracking': '貨物追跡',
                'port-info': '港情報',
                'search-schedule': '運航スケジュール検索',
                'origin-port': '出港港',
                'destination-port': '到着港',
                'vessel-name': '船名',
                'departure-date': '出港日',
                search: '検索',
                'search-results': '検索結果',
                export: 'エクスポート',
                'no-search-results': '検索条件を入力してスケジュールを検索してください',
                'container-number': 'コンテナ番号',
                'booking-number': 'ブッキング番号',
                'bill-of-lading': 'B/L番号',
                track: '追跡',
                'tracking-results': '追跡結果',
                'enter-tracking-info': '追跡情報を入力して貨物の状態を確認してください',
                'tracking-tips': '追跡のヒント',
                'tip-1': '• コンテナ番号は通常、4文字のプレフィックスと7桁の数字で構成されます',
                'tip-2': '• 複数のコンテナを追跡する場合は、カンマで区切って入力してください',
                'tip-3': '• 追跡情報はリアルタイムで更新されます',
                'container-format': '4文字のプレフィックス + 7桁の数字'
            },
            zh: {
                home: '首页',
                company: '公司信息',
                services: '服务',
                schedule: '船期',
                news: '新闻',
                contact: '联系我们',
                login: '登录',
                username: '用户名',
                password: '密码',
                forgotPassword: '忘记密码',
                submit: '提交',
                cancel: '取消',
                moreInfo: '了解更多',
                'vessel-schedule': '船期查询',
                'cargo-tracking': '货物追踪',
                'port-info': '港口信息',
                'search-schedule': '船期查询',
                'origin-port': '起运港',
                'destination-port': '目的港',
                'vessel-name': '船名',
                'departure-date': '离港日期',
                search: '搜索',
                'search-results': '搜索结果',
                export: '导出',
                'no-search-results': '请输入搜索条件查询船期',
                'container-number': '集装箱号',
                'booking-number': '订舱号',
                'bill-of-lading': '提单号',
                track: '追踪',
                'tracking-results': '追踪结果',
                'enter-tracking-info': '请输入追踪信息查询货物状态',
                'tracking-tips': '追踪提示',
                'tip-1': '• 集装箱号通常由4位前缀和7位数字组成',
                'tip-2': '• 追踪多个集装箱时，请用逗号分隔',
                'tip-3': '• 追踪信息实时更新',
                'container-format': '4位前缀 + 7位数字'
            },
            en: {
                home: 'Home',
                company: 'Company',
                services: 'Services',
                schedule: 'Schedule',
                news: 'News',
                contact: 'Contact',
                login: 'Login',
                username: 'Username',
                password: 'Password',
                forgotPassword: 'Forgot Password',
                submit: 'Submit',
                cancel: 'Cancel',
                moreInfo: 'Learn More',
                'vessel-schedule': 'Vessel Schedule',
                'cargo-tracking': 'Cargo Tracking',
                'port-info': 'Port Information',
                'search-schedule': 'Search Schedule',
                'origin-port': 'Origin Port',
                'destination-port': 'Destination Port',
                'vessel-name': 'Vessel Name',
                'departure-date': 'Departure Date',
                search: 'Search',
                'search-results': 'Search Results',
                export: 'Export',
                'no-search-results': 'Enter search criteria to find schedules',
                'container-number': 'Container Number',
                'booking-number': 'Booking Number',
                'bill-of-lading': 'B/L Number',
                track: 'Track',
                'tracking-results': 'Tracking Results',
                'enter-tracking-info': 'Enter tracking information to check cargo status',
                'tracking-tips': 'Tracking Tips',
                'tip-1': '• Container number usually consists of 4-letter prefix + 7 digits',
                'tip-2': '• For multiple containers, separate with commas',
                'tip-3': '• Tracking information updated in real-time',
                'container-format': '4-letter prefix + 7 digits'
            }
        };

        const t = translations[lang];
        
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                element.textContent = t[key];
            }
        });

        // 更新页面标题
        this.updatePageTitle(lang);
    }

    updatePageTitle(lang) {
        const titles = {
            ja: 'COSCO SHIPPING LOGISTICS (JAPAN) - ホーム',
            zh: 'COSCO SHIPPING LOGISTICS (JAPAN) - 首页',
            en: 'COSCO SHIPPING LOGISTICS (JAPAN) - Home'
        };
        document.title = titles[lang] || titles.en;
    }

    // 主题切换功能
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // 设置初始主题
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 主题切换动画
        anime({
            targets: 'body',
            opacity: [1, 0.8, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    }

    // 导航功能
    initNavigation() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 滚动动画
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // 轮播图功能
    initCarousels() {
        // 新闻轮播
        this.initNewsCarousel();
    }

    initNewsCarousel() {
        const newsCarousel = document.getElementById('newsCarousel');
        if (!newsCarousel) return;

        const newsData = [
            {
                title: '新航路開設のお知らせ',
                date: '2025-09-29',
                summary: 'アジアと欧州間の新たなコンテナ航路を開設しました。週2便の定期サービスで、より速く、より効率的な輸送を実現。',
                image: 'https://kimi-web-img.moonshot.cn/img/static.vecteezy.com/59c1d13d1409ff2e0b86514ec86eacd6d8cddb41.jpg',
                link: 'news.html'
            },
            {
                title: 'デジタル化推進の新サービス',
                date: '2025-09-28',
                summary: 'AIを活用した貨物追跡システムを導入。リアルタイムでの位置情報確認と到着予測の精度が大幅に向上しました。',
                image: 'https://kimi-web-img.moonshot.cn/img/www.ship-technology.com/2c63667af66eeb5b695c5cee3d7c66f825381b78.jpg',
                link: 'news.html'
            },
            {
                title: '環境配慮型船舶の導入',
                date: '2025-09-27',
                summary: 'LNG燃料搭載の次世代環境配慮型コンテナ船を就航。CO2排出量を従来比40%削減した持続可能な輸送サービスを開始。',
                image: 'https://kimi-web-img.moonshot.cn/img/digitalsenior.sg/2f9b96d619b27e04a513f96407747625c71eafce.jpg',
                link: 'news.html'
            }
        ];

        // 生成新闻轮播内容
        newsData.forEach((news, index) => {
            const newsItem = document.createElement('div');
            newsItem.className = `carousel-item flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4`;
            newsItem.innerHTML = `
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden card-hover">
                    <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">${news.date}</div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">${news.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${news.summary}</p>
                        
                    </div>
                </div>
            `;
            newsCarousel.appendChild(newsItem);
        });

        // 轮播指示器事件
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index);
            });
        });

        // 自动轮播
        this.startNewsCarousel();
    }

    showSlide(index) {
        const carousel = document.getElementById('newsCarousel');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (carousel) {
            const slideWidth = 100 / 3; // 3 slides visible
            carousel.style.transform = `translateX(-${index * slideWidth}%)`;
            
            // 更新指示器
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }
    }

    startNewsCarousel() {
        let currentSlide = 0;
        const totalSlides = 3;
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            this.showSlide(currentSlide);
        }, 5000);
    }

    // 表单功能
    initForms() {
        // 船期搜索表单
        const scheduleSearchForm = document.getElementById('scheduleSearchForm');
        if (scheduleSearchForm) {
            scheduleSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.searchSchedule();
            });
        }

        // 货物追踪表单
        const trackingForm = document.getElementById('trackingForm');
        if (trackingForm) {
            trackingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.trackCargo();
            });
        }
    }

    searchSchedule() {
        const originPort = document.getElementById('originPort')?.value;
        const destinationPort = document.getElementById('destinationPort')?.value;
        const vesselName = document.getElementById('vesselName')?.value;
        const departureDate = document.getElementById('departureDate')?.value;

        // 显示加载状态
        const resultsDiv = document.getElementById('scheduleResults');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="text-center py-12">
                    <div class="loading-spinner w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p class="text-gray-600">検索中...</p>
                </div>
            `;
        }

        // 模拟API调用
        setTimeout(() => {
            this.displayScheduleResults({
                originPort,
                destinationPort,
                vesselName,
                departureDate
            });
        }, 1500);
    }

    displayScheduleResults(searchParams) {
        const resultsDiv = document.getElementById('scheduleResults');
        if (!resultsDiv) return;

        // 模拟搜索结果
        const mockResults = [
            {
                vessel: 'COSCO SHIPPING UNIVERSE',
                voyage: '033W',
                origin: searchParams.originPort || 'CNSHG',
                destination: searchParams.destinationPort || 'NLRTM',
                departure: '2025-10-04',
                arrival: '2025-11-14',
                status: 'on-time'
            },
            {
                vessel: 'COSCO SHIPPING ARIES',
                voyage: '035W',
                origin: searchParams.originPort || 'CNSHG',
                destination: searchParams.destinationPort || 'NLRTM',
                departure: '2025-10-17',
                arrival: '2025-11-25',
                status: 'on-time'
            }
        ];

        let resultsHTML = `
            <div class="overflow-x-auto">
                <table class="schedule-table w-full">
                    <thead>
                        <tr>
                            <th>船名</th>
                            <th>航海</th>
                            <th>出港港</th>
                            <th>到着港</th>
                            <th>出港日</th>
                            <th>到着日</th>
                            <th>状態</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        mockResults.forEach(result => {
            const statusClass = result.status === 'on-time' ? 'status-on-time' : 'status-delayed';
            const statusText = result.status === 'on-time' ? '定時' : '遅延';
            
            resultsHTML += `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="font-medium">${result.vessel}</td>
                    <td>${result.voyage}</td>
                    <td>${result.origin}</td>
                    <td>${result.destination}</td>
                    <td>${result.departure}</td>
                    <td>${result.arrival}</td>
                    <td>
                        <span class="flex items-center">
                            <span class="status-dot ${statusClass}"></span>
                            ${statusText}
                        </span>
                    </td>
                </tr>
            `;
        });

        resultsHTML += `
                    </tbody>
                </table>
            </div>
        `;

        resultsDiv.innerHTML = resultsHTML;

        // 添加动画
        anime({
            targets: resultsDiv,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }

    trackCargo() {
        const containerNumber = document.getElementById('containerNumber')?.value;
        const bookingNumber = document.getElementById('bookingNumber')?.value;
        const billOfLading = document.getElementById('billOfLading')?.value;

        const resultsDiv = document.getElementById('trackingResults');
        if (!resultsDiv) return;

        // 显示加载状态
        resultsDiv.innerHTML = `
            <div class="text-center py-12">
                <div class="loading-spinner w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p class="text-gray-600">追跡中...</p>
            </div>
        `;

        // 模拟API调用
        setTimeout(() => {
            this.displayTrackingResults({
                containerNumber,
                bookingNumber,
                billOfLading
            });
        }, 1500);
    }

    displayTrackingResults(trackingParams) {
        const resultsDiv = document.getElementById('trackingResults');
        if (!resultsDiv) return;

        // 模拟追踪结果
        const mockTracking = {
            container: trackingParams.containerNumber || 'COSU1234567',
            status: 'In Transit',
            currentLocation: 'Singapore Port',
            lastUpdate: '2025-09-29 14:30',
            estimatedArrival: '2025-10-15',
            milestones: [
                { event: 'Container Loaded', location: 'Shanghai Port', date: '2025-09-25 10:00', status: 'completed' },
                { event: 'Vessel Departure', location: 'Shanghai Port', date: '2025-09-26 18:00', status: 'completed' },
                { event: 'In Transit', location: 'Singapore Port', date: '2025-09-29 14:30', status: 'current' },
                { event: 'Vessel Arrival', location: 'Rotterdam Port', date: '2025-10-15 08:00', status: 'pending' }
            ]
        };

        let trackingHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <div class="mb-6">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">コンテナ情報</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">コンテナ番号:</span>
                            <span class="font-medium ml-2">${mockTracking.container}</span>
                        </div>
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">現在位置:</span>
                            <span class="font-medium ml-2">${mockTracking.currentLocation}</span>
                        </div>
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">ステータス:</span>
                            <span class="font-medium ml-2 text-green-600">${mockTracking.status}</span>
                        </div>
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">到着予定:</span>
                            <span class="font-medium ml-2">${mockTracking.estimatedArrival}</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">追跡履歴</h4>
                    <div class="space-y-4">
        `;

        mockTracking.milestones.forEach((milestone, index) => {
            const statusIcon = milestone.status === 'completed' ? '✓' : milestone.status === 'current' ? '●' : '○';
            const statusColor = milestone.status === 'completed' ? 'text-green-600' : milestone.status === 'current' ? 'text-blue-600' : 'text-gray-400';
            
            trackingHTML += `
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${statusColor}">
                        ${statusIcon}
                    </div>
                    <div class="flex-1">
                        <div class="font-medium text-gray-900 dark:text-white">${milestone.event}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${milestone.location} • ${milestone.date}</div>
                    </div>
                </div>
            `;
        });

        trackingHTML += `
                    </div>
                </div>
            </div>
        `;

        resultsDiv.innerHTML = trackingHTML;

        // 添加动画
        anime({
            targets: resultsDiv,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }

    // 模态框功能
    initModals() {
        // 登录模态框
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const mobileLoginIconBtn = document.getElementById('mobileLoginIconBtn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.showLoginModal();
            });
        }
        
        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', () => {
                this.showLoginModal();
            });
        }
        
        if (mobileLoginIconBtn) {
            mobileLoginIconBtn.addEventListener('click', () => {
                this.showLoginModal();
            });
        }
    }

    showLoginModal() {
        // 创建登录模态框
        const modal = document.createElement('div');
        modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="modal-content bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">ログイン</h3>
                    <button class="close-modal text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <form id="modalLoginForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <span data-i18n="username">ユーザーID</span>
                        </label>
                        <input type="text" class="form-input" placeholder="ユーザーIDを入力" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <span data-i18n="password">パスワード</span>
                        </label>
                        <input type="password" class="form-input" placeholder="パスワードを入力" required>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input type="checkbox" class="rounded border-gray-300">
                            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">ログイン状態を保持</span>
                        </label>
                        <a href="#" class="text-sm text-primary-600 hover:text-primary-700">
                            <span data-i18n="forgotPassword">パスワードを忘れた方</span>
                        </a>
                    </div>
                    
                    <button type="submit" class="btn-primary w-full">
                        <span data-i18n="login">ログイン</span>
                    </button>
                </form>
                
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        アカウントをお持ちでない方は
                        <a href="contact.html" class="text-primary-600 hover:text-primary-700 font-medium">
                            こちら
                        </a>
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭模态框事件
        modal.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // 登录表单提交
        modal.querySelector('#modalLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(modal);
        });

        // 添加动画
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });

        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }

    closeModal(modal) {
        anime({
            targets: modal,
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInQuad',
            complete: () => {
                modal.remove();
            }
        });
    }

    handleLogin(modal) {
        // 模拟登录过程
        const submitBtn = modal.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<div class="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"></div>';
        submitBtn.disabled = true;

        setTimeout(() => {
            // 模拟登录成功
            alert('ログイン成功！実際のシステムでは、ここでダッシュボードにリダイレクトされます。');
            this.closeModal(modal);
        }, 2000);
    }

    // Schedule页面功能
    initSchedulePage() {
        // 标签页切换
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // 移除所有活动状态
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // 激活选中的标签页
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // 添加切换动画
        anime({
            targets: `#${tabName}-tab`,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    // 登录功能
    initLogin() {
        // 原有的登录功能现在通过模态框处理
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new CoscoApp();
});

// 全局函数
window.showComingSoon = function() {
    alert('この機能は近日公開予定です。お楽しみに！');
};

window.showContactInfo = function() {
    alert('お問い合わせ：\n電話: 03-1234-5678\nメール: info@cosco-logistics.jp\n営業時間: 平日 9:00-18:00');
};