import React from 'react';
import './loading.css';

class ScrollUp extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
   	  return(
   	  	<div ref="pullDown" className="scroll-loading">
			<div className="loading-box">
			  <div className="loading-rond">
			    <div className="rond"></div>
			  </div>
			  <div className="loading-center">
			    <p></p>
			  </div>
			</div>         
   	  	</div>
   	  )
   }
}

class ScrollDown extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
   	  return(
   	  	<div ref="pullUp"className="scroll-loading">
			<div className="loading-box">
			  <div className="loading-rond">
			    <div className="rond"></div>
			  </div>
			  <div className="loading-center">
			    <p></p>
			  </div>
			</div>         
   	  	</div>
   	  )
   }
}

export {ScrollUp,ScrollDown};