import React, {Component} from "react";
import $ from "jquery";
import API from "../utils/google-books"
import { Input, FormBtn } from "../components/search-box";
import Results from "../components/results/results";

class Search extends Component{
    state = {
        search: "",
        result: [],
    }

    getBook = (book) =>{
        API.getBook(book)
        .then(res=>this.setState({result: res.data.items}))
        .catch(err => console.log(err))

    }

    submitHandler = (e) => {
        e.preventDefault();
        let searchTerm =  $(".form-control").val().replace(/\s/g, "+");
        this.setState({"search":searchTerm});
        this.getBook(searchTerm);
        $(".form-control").val("")
    }

    saveBook = (e) => {
        API.saveBook({
            title: e.target.getAttribute("data-title"),
            author: e.target.getAttribute("data-author"),
            description: e.target.getAttribute("data-description"),
            link: e.target.getAttribute("data-link"),
            image: e.target.getAttribute("data-image")
        })
        .catch(err => console.log(err));
    }

    render(){
      return (
            <div>
                <br />
                <div className="container">
                    <form>
                        <Input name="title" placeholder="Title or Author (required)" />
                        <FormBtn onClick={this.submitHandler}> Search!</FormBtn>
                    </form>                    
                </div>

                <div className="container">
                    {this.state.result.map(item => (
                    <Results 
                    key={item.id}
                    title={item.volumeInfo.title}
                    author={item.volumeInfo.authors}
                    description={item.volumeInfo.description}
                    image={item.volumeInfo.imageLinks.smallThumbnail}
                    link={item.volumeInfo.infoLink}
                    saveFunction={this.saveBook}
                    />
                ))}
                </div>

            </div>
      )  
    }

}

export default Search;