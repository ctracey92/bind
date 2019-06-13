import axios from "axios"

export default {
    getBook: function(book){
       return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book)
    },
    saveBook: function(bookinfo) {
    return axios.post("/api/books/post", bookinfo);
    },
    getBooks: function(){
      return axios.get("/api/books")
    }
};