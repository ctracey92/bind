import React from "react";

function SavedBooks (props){
return (
    <div>
        <div className="card">
            <div className="row">
                <div className="col-2">
                   <img src={props.image} className="card-img" alt={props.title} style={{width:"150px"}}/> 
                </div>
                <div className="col-6">
                    <h5 className="card-header">{props.title}</h5>
                    <div className="card-body">
                        <h5 className="card-title">By: {props.author}</h5>
                        <p className="card-text">{props.description}</p>
                        <a href={props.link} className="btn btn-primary">Read Me!</a>
                        {/* <button className="btn btn-secondary" onClick={props.saveFunction}
                         data-title={props.title}
                         data-author={props.author}
                         data-description={props.description}
                         data-link={props.link}
                         data-image={props.image}
                         >Save Me!</button> */}
                    </div>
                 </div>
            </div> 
        </div>
    </div>
)
}

export default SavedBooks;