const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const data = await res.json()
    return data.data.news_category;
}

const displayCategory = async () => {
    const data = await loadData()

    const listContainer = document.getElementById('list-container')
    listContainer.innerHTML = '';

    let unique = [];
    data.forEach(element => {
        // console.log(element)
        if(unique.indexOf(element.category_name) === -1){
            unique.push(element.category_name)
            const li = document.createElement('li')
            li.innerHTML =`
            <a href="#" onclick ="newsProtal('${element.category_id}')" > ${element.category_name} </a>
            `;
            listContainer.appendChild(li)
        }
    }); 
}

const newsProtal = async (news) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${news}`)
    const allNews = await res.json()
    displayNews(allNews.data)
}

const displayNews = newsData => {
    // console.log(newsData)

    for(const news of newsData){
        console.log(news)

        
    }
}

displayCategory()



