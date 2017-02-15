import React from 'react';
import {Link} from 'react-router';
import './record.css';

class Record extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="record-wrapper">
	           <ul>
		           <li>
			           <div data-flex="">
				           <div data-flex-box="0" className="adv-img">
                              <img src="../../images/adv_temp_icon.png" />
				           </div>
				           <div data-flex-box="1" data-flex="dir:top box:mean" className="adv-detail">
					           <div data-flex="dir:left box:first">
						           <h2>回家的路、充满温暖</h2>
						           <p>26.8元</p>
					           </div>
					           <div data-flex="dir:left box:mean">
						           <span>鹏驰起床</span>
						           <span>一分钟以前</span>
						           <span>观看获赠</span>
					           </div>
				           </div>
			           </div>
		           </li>

		           		           <li>
			           <div data-flex="">
				           <div data-flex-box="0" className="adv-img">
                              <img src="../../images/adv_temp_icon.png" />
				           </div>
				           <div data-flex-box="1" data-flex="dir:top box:mean" className="adv-detail">
					           <div data-flex="dir:left box:first">
						           <h2>回家的路、充满温暖</h2>
						           <p>26.8元</p>
					           </div>
					           <div data-flex="dir:left box:mean">
						           <span>鹏驰起床</span>
						           <span>一分钟以前</span>
						           <span>观看获赠</span>
					           </div>
				           </div>
			           </div>
		           </li>

		           		           <li>
			           <div data-flex="">
				           <div data-flex-box="0" className="adv-img">
                              <img src="../../images/adv_temp_icon.png" />
				           </div>
				           <div data-flex-box="1" data-flex="dir:top box:mean" className="adv-detail">
					           <div data-flex="dir:left box:first">
						           <h2>回家的路、充满温暖</h2>
						           <p>26.8元</p>
					           </div>
					           <div data-flex="dir:left box:mean">
						           <span>鹏驰起床</span>
						           <span>一分钟以前</span>
						           <span>观看获赠</span>
					           </div>
				           </div>
			           </div>
		           </li>
	           </ul>
           </div>
       )
	}	
}

export default Record;