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
    spinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${news}`)
    const allNews = await res.json()
    displayNews(allNews.data)
}

const displayNews = async newsData => {  
    
    const missing = newsData.length

    const totalFound = document.getElementById('Total-news-found')
    totalFound.innerHTML = '';

    if(missing === 0 || missing !== 0){
        totalFound.innerHTML = `
        <h3>${ newsData.length ? newsData.length : ` Not `  } items found for category </h3>
         `   
    }
        
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML ='';

    
    for(const news of newsData){
    
        const div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('sm:card-top')
        div.classList.add('md:card-side')
        div.classList.add('bg-base-100')
        div.classList.add('mb-7')
        div.innerHTML = `
        <img class=" p-5 sm:w-25 sm:h-25 md:h-full lg:h-full xl:h-full 2xl:h-full " src="${news.thumbnail_url}" alt="News">
        <div class="card-body sm:w-full md:w-5/12  ">
            <h3 class="card-title sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-bold">${news.title}</h3>
            <p class ="sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-medium"> ${news.details.slice(0,278)}</p>
            <p class =" truncate box-border sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-medium "> ${news.details.slice(279, 600)}</p>
            <div class="card-actions flex justify-between items-center ">
                <div class = "flex gap-4">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="${news.author.img}" />
                        </div>
                    </label>
                    <div>
                        <p class ="font-bold">${news.author.name ? news.author.name : 'No data available' }</p>
                        <small>${news.author.published_date}</small>
                    </div>
                </div>
                <div class ="flex gap-3">
                    <div>
                        <i class="fa-regular fa-eye"></i>
                    </div>
                    <p class ="font-bold">${news.total_view ? news.total_view : 'No data available' } M</p>
                </div>
                <div class ="flex gap-2">
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <label onclick ="newsDetails('${news._id}')" for="my-modal-5" ><a class=" cursor-pointer modal-button text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Icon description</span>
              </a>                
                </label>
            </div>
        </div>
        `;
        newsContainer.appendChild(div)
    } 
    spinner(false)
}

const newsDetails = async (details) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/news/${details}`)
    const data = await res.json()
    modalDetails(data.data)
}

const modalDetails = async (modalDetail) => {

    const newsModalcontinser = document.getElementById('news-modal')
    newsModalcontinser.innerHTML = '';
    
    modalDetail.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = `
        <img class=" p-5 sm:w-25 sm:h-25 md:w-full lg:w-full xl:w-full 2xl:w-full" src="${element.image_url}" alt="News">
        <div>
            <h3 class="card-title sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-bold ">${element.title}</h3>
            <p class ="sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl"> ${element.details.slice(0,500)}</p>
            <p class =" truncate box-border sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl"> ${element.details.slice(500, 900)}</p>
        </div>
        <div class="flex justify-between items-center ">
                <div class = "flex gap-4">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="${element.author.img}" />
                        </div>
                    </label>
                    <div>
                        <p class ="font-bold">${element.author.name ? element.author.name : 'No data available' }</p>
                        <small>${element.author.published_date}</small>
                    </div>
                </div>
                <div class ="flex gap-3">
                    <div>
                        <i class="fa-regular fa-eye"></i>
                    </div>
                    <p class ="font-bold" >${element.total_view ? element.total_view : 'View not found' } M</p>
                </div>
                <div class ="flex gap-2">
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="modal-action">
                    <label for="my-modal-5"><a type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#toast-default" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a></label>
                </div>
        </div>    
        `;
        newsModalcontinser.appendChild(div)
    });



}

const spinner = (dataLoad) => {
   const spin = document.getElementById('spinner')
    if(dataLoad){
        spin.classList.remove('hidden')
    }else{
        spin.classList.add('hidden')
    }
}

displayCategory()



