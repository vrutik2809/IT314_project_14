import React from 'react'
import {useHistory} from "react-router-dom"
import "./Home.css"
export default function Home() {

  const history = useHistory();
  const handleClick = () =>{
      console.log("handleLogin")
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#e3f2fd"}}>
      <a class="navbar-brand mx-2" href="/" style={{fontSize:"40px",fontFamily:"Gabriola", color:"hsla(245, 35%, 51%, 1)"}}>Menulize</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-outline-primary my-2 my-sm-0" onClick={handleClick}>Login</button>
        </form>
      </div>
    </nav>
  <div className="row">
      <div className="col">
        <div className="leftside" style={{height:"80vh", width:"70%", marginLeft:"80px", color:"white", marginTop:"150px", textAlign:"center"}}>
          <img src="./favicon.png" alt=""  style={{marginBottom:"20px", borderRadius:"50%", width:"30%"}}/>
          <h1>
            Welcome to Menulize
          </h1>
          <p>
            One stop solution for automating your restaurant with features like tracking orders, delieveries, and manage clients more efficiently
          </p>
          <p>
          <h3 class="my-5">
          Please Login to Continue 
          </h3>
          </p>
        </div>
      </div>
      <div className="col" style={{color:"white"}}>
        <div className="rightside" style={{height:"100%", width:"100%", backgroundColor:"#cceff5"}}>
          <img src="https://media.licdn.com/dms/image/C4E12AQEbNwDr1TGebg/article-cover_image-shrink_600_2000/0/1652095275578?e=2147483647&v=beta&t=tgDbmyD3YBd4plLVUCpRvF-4sDjHM-m6Sa5s1lxisls" alt=""  style={{marginTop:"110px"}} />
        </div>
      </div>
    </div>
  
 
    </>
)
}
