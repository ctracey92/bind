import React from "react";

function Favorites(props) {
    let reply = props.replyTo ? (` -> @${props.replyTo} `) : ("");
    let retweeted = props.retweeted ? ("green") : ("black")
    return (
        <div style={{border: "2px solid black", marginBottom: "2px", padding: "7px"}}> 
            {/* key={item.id}
            id={item.id} */}
            <span>
                <div className="chip">
                    <img src={props.user.profile_image_url} alt="Twitter Profile Pic" />
                    @{props.user.name}
                    <b>{reply} </b>
                </div>
                <a href={`https://twitter.com/${props.user.screen_name}/status/${props.id}`} target="_blank" rel="noopener noreferrer" style={{float: "right", marginRight: "5px"}}>            <i className="fab fa-twitter fa-2x"></i> See full tweet</a>
                <p>{props.text} <br /> Retweets: <b>{props.retweets}</b> Favorites: <b>{props.favorites} </b>
                <i className="fas fa-retweet fa-lg" style={{color: retweeted}}></i>
                </p>
            </span>

        </div>
        
    )
}

export default Favorites;