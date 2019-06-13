import React, {Component} from "react";
import SavedBooks from "../components/saved/saved"
import API from "../utils/google-books"

class Saved extends Component{
    state = {
        result: [],
        test: ""
    }

    loadBooks(){
        API.getBooks()
        .then(res =>{
            console.log(typeof res)
            this.setState({result: res})
        })
            
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.loadBooks()
    }

     render(){
        return (
            <div>
                <SavedBooks />
            </div>
        )
    }

}

export default Saved;