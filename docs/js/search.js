document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchResultsList = document.getElementById('search-results-list');
  const searchForm = document.getElementById('search-form');
  let searchIndex = [];
  
  // 加载搜索索引
  fetch('/search-index.json')
    .then(response => response.json())
    .then(data => {
      searchIndex = data;
    })
    .catch(error => console.error('加载搜索索引失败:', error));
  
  // 搜索表单提交
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
  });
  
  // 输入框内容变化时进行搜索
  searchInput.addEventListener('input', function() {
    if (searchInput.value.length > 2) {
      performSearch();
    } else {
      hideResults();
    }
  });
  
  // 点击文档其他地方时隐藏搜索结果
  document.addEventListener('click', function(e) {
    if (!searchForm.contains(e.target) && !searchResults.contains(e.target)) {
      hideResults();
    }
  });
  
  // 执行搜索
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
      hideResults();
      return;
    }
    
    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) || 
             item.description.toLowerCase().includes(query) || 
             item.content.toLowerCase().includes(query);
    });
    
    displayResults(results, query);
  }
  
  // 显示搜索结果
  function displayResults(results, query) {
    searchResultsList.innerHTML = '';
    
    if (results.length === 0) {
      searchResultsList.innerHTML = '<li class="search-no-results">没有找到匹配的结果</li>';
    } else {
      results.forEach(result => {
        const li = document.createElement('li');
        li.className = 'search-result-item';
        
        const a = document.createElement('a');
        a.href = result.url;
        a.className = 'search-result-link';
        
        const title = document.createElement('h3');
        title.className = 'search-result-title';
        title.textContent = result.title;
        
        const date = document.createElement('time');
        date.className = 'search-result-date';
        date.textContent = result.date;
        
        const snippet = document.createElement('p');
        snippet.className = 'search-result-snippet';
        
        // 从内容中提取包含查询词的片段
        const content = result.content.toLowerCase();
        const queryIndex = content.indexOf(query.toLowerCase());
        if (queryIndex !== -1) {
          const start = Math.max(0, queryIndex - 50);
          const end = Math.min(content.length, queryIndex + query.length + 50);
          let snippetText = content.substring(start, end);
          
          // 添加省略号
          if (start > 0) snippetText = '...' + snippetText;
          if (end < content.length) snippetText = snippetText + '...';
          
          // 高亮查询词
          snippet.innerHTML = snippetText.replace(
            new RegExp(query, 'gi'), 
            match => `<mark>${match}</mark>`
          );
        } else {
          snippet.textContent = result.description || '无描述';
        }
        
        a.appendChild(title);
        a.appendChild(date);
        a.appendChild(snippet);
        li.appendChild(a);
        searchResultsList.appendChild(li);
      });
    }
    
    searchResults.style.display = 'block';
  }
  
  // 隐藏搜索结果
  function hideResults() {
    searchResults.style.display = 'none';
  }
});
