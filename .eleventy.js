module.exports = function(eleventyConfig) {
  // 添加全局数据
  eleventyConfig.addGlobalData("site", {
    title: "我的个人博客",
    description: "分享我的想法和经验",
    author: "博主",
    url: "https://personal-blog-site.windsurf.build",
    buildTime: new Date()
  });

  // Copy the `css` directory to the output
  eleventyConfig.addPassthroughCopy("css");
  
  // Copy the `images` directory to the output
  eleventyConfig.addPassthroughCopy("images");

  // Copy the `js` directory to the output
  eleventyConfig.addPassthroughCopy("js");
  
  // 添加日期格式化过滤器
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (typeof dateObj === "string") {
      dateObj = new Date(dateObj);
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  });

  eleventyConfig.addFilter("dateToISO", (dateObj) => {
    if (typeof dateObj === "string") {
      dateObj = new Date(dateObj);
    }
    return dateObj.toISOString().split('T')[0];
  });

  // 获取所有标签
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // 这个列表应该匹配你想要过滤掉的标签
            case "post":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // 返回一个数组，按字母顺序排序
    return [...tagSet].sort();
  });
  
  return {
    dir: {
      input: "src",
      output: "docs"
    }
  };
};
