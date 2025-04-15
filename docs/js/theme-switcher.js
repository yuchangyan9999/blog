document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const themeText = document.querySelector('.theme-mode-text');
  
  // 检查本地存储中是否有保存的主题
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // 初始化主题
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
    themeText.textContent = '日间模式';
  }
  
  // 切换主题
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeText.textContent = '日间模式';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeText.textContent = '夜间模式';
    }    
  }
  
  toggleSwitch.addEventListener('change', switchTheme, false);
});
