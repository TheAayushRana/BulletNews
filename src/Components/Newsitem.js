import React from 'react'

export default function Newsitem(props){
    let { title, description, imgUrl, url, author, publishedAt,source } = props;

        return (
            <div>
                <div className="card m-2">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                    style={{zIndex: "1", left: "95%"}} >
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={imgUrl ? imgUrl : "https://i.ytimg.com/vi/U_s1hYAQX-4/maxresdefault.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text"><small className="text-muted"> Last updated By {author ? author : "Unknown"} On {new Date(publishedAt).toGMTString()} </small></p>
                        <p className="card-text">{description}</p>
                        <a href={url} className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}