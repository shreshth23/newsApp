import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    pageitems = 7
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:1,
            lastPage: false,    
            pagenav: []
        }
    }

    handlePages=()=>{
        let ar = [];
        for (let i = 1; i <= Math.ceil(this.state.totalResults/this.pageitems) ; i++) {
            ar.push(i);
        }
        this.setState({pagenav:ar});
    }
    
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=18f960e4d40d4e3da26e61aad56d3994&pageSize=${this.pageitems}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults});
        this.handlePages();
    }

    handleNext = async ()=>{
        console.log("handleNext");
        if (Math.ceil(this.state.totalResults/this.pageitems)>this.state.page){
            this.setState({page: this.state.page+1,lastPage: false})
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=18f960e4d40d4e3da26e61aad56d3994&pageSize=${this.pageitems}&page=${this.state.page+1}`;
            console.log(url)
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles
            });
        }else{
            this.setState({lastPage: true});
        }
    }
    handlePrevious = async ()=>{
        console.log("handlePrevious");
        if (this.state.page>1){
            this.setState({page: this.state.page-1,lastPage: false})
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=18f960e4d40d4e3da26e61aad56d3994&pageSize=${this.pageitems}&page=${this.state.page-1}`;
            console.log(url)
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles
            });
        }
    }
    gotoPage = async (event)=>{
        console.log(event.target.innerText);
        let page = event.target.innerText;
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=18f960e4d40d4e3da26e61aad56d3994&pageSize=${this.pageitems}&page=${page}`;
        console.log(url)
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: page,
            lastPage: Math.ceil(this.state.totalResults/this.pageitems)===page,
            articles: parsedData.articles
        });
    }
    render() {
    return (
      <div className='container my-5' >
        <h2 className='py-4'>NewsMonkey - Top HeadLines</h2>
        <div className='row mx-3'>
            {this.state.articles.map(article =>{return(
                <div className='col-md-3' key={article.url}>
                    <NewsItem title={article.title} altText={article.author} description={article.description} newsUrl={article.url} imageUrl={article.urlToImage}/>
                </div>
            )})}
        </div>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                <button className={`page-link ${this.state.page<=1?"disabled":""}`} aria-label="Previous" onClick={this.handlePrevious} disabled={this.state.page<=1}>
                    <span aria-hidden="true">«</span>
                </button>
                </li>
                {
                    this.state.pagenav.map((elem)=>{
                        return (
                            <li key={elem} className={`page-item ${this.state.page===elem?"active":""}`}><button className="page-link" onClick={this.gotoPage} >{elem}</button></li>
                        )
                    })
                }

                <li className="page-item">
                <button className={`page-link ${this.state.lastPage?"disabled":""}`} aria-label="Next" onClick={this.handleNext}>
                    <span aria-hidden="true">»</span>
                </button>
                </li>
            </ul>
        </nav>
      </div>
    )
  }
}
