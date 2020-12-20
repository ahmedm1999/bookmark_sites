
const saveBookmark = (e) => {
    const sitName = document.getElementById("siteName").value ;
    const sitUrl = document.getElementById("siteUrl").value ;
    console.log(sitName) ;

    if(!validateForm(sitName, sitUrl)){
        return false;
    }
    const bookmark = {
        name: sitName ,
        url: sitUrl 
    }

    if(localStorage.getItem('bookmarks') === null){
        const bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }

      document.getElementById("myForm").reset() ;
      // add to the sites list .
      fetchBookmarks() ;
} ;

const deleteBookmark = (u) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let i = 0 ; 
    for (i ; i < bookmarks.length; i++) {
        if(bookmarks[i].url === u) {
            bookmarks.splice(i,1) ;
        } else {
            continue ;
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks() ;
};

const fetchBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let result = document.getElementById("bookmarksResults") ; 
    result.innerHTML = '' ;
    for (bookmark of bookmarks) {
        let name = bookmark.name ;
        let url = bookmark.url ;
        result.innerHTML += `<div class="well">
                                <h3>${name}</3>
                                <a class="btn btn-default" href="${url}" target="_blank">Visit</a>
                                <a class="btn btn-danger" onclick="deleteBookmark('${url}')">Delete</a>
                            </div>` ;
    }
} ;

const validateForm = (siteName, siteUrl) => {
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}  ;
document.getElementById("myForm").addEventListener("submit", saveBookmark) ;

// localStorage.removeItem('bookmarks') ;