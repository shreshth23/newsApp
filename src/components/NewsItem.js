import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,altText} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={!imageUrl?"https://images.hindustantimes.com/img/2022/12/24/550x309/WhatsApp_Image_2021-09-18_at_09.42.18_1631944439782_1671840399678_1671840399678.jpeg":imageUrl} className="card-img-top" alt={altText}/>
            <div className="card-body">
                <h5 className="card-title">{title.slice(0,60)}...</h5>
                <p className="card-text">{description?description.slice(0,88):""}...</p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}
