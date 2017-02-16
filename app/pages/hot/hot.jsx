import React from 'react';
import {Link} from 'react-router';
import './hot.css';

class Hot extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
       return(
           <div className="hot-wrapper">
                 <ul>

					<li>
						<div data-flex="main:center cross:center">
							<span className="video-play"></span>
							</div>
							<div data-flex="dir:left">
							<p className="adv-invest">250000.00</p>
							<p className="adv-packetcount">红包已领23622个</p>
							<p className="adv-score">3.6分</p>
							<p className="adv-time"><span>3:26</span></p>
						</div>
					</li>					

					<li>
						<div data-flex="main:center cross:center">
							<span className="video-play"></span>
							</div>
							<div data-flex="dir:left">
							<p className="adv-invest">2500.00</p>
							<p className="adv-packetcount">红包已领236个</p>
							<p className="adv-score">3.6分</p>
							<p className="adv-time"><span>3:26</span></p>
						</div>
					</li>					
					<li>
						<div data-flex="main:center cross:center">
							<span className="video-play"></span>
							</div>
							<div data-flex="dir:left">
							<p className="adv-invest">2500.00</p>
							<p className="adv-packetcount">红包已领236个</p>
							<p className="adv-score">3.6分</p>
							<p className="adv-time"><span>3:26</span></p>
						</div>
					</li>

					<li>
							<div data-flex="main:center cross:center">
							<span className="video-play"></span>
							</div>
							<div data-flex="dir:left">
							<p className="adv-invest">2500.00</p>
							<p className="adv-packetcount">红包已领236个</p>
							<p className="adv-score">3.6分</p>
							<p className="adv-time"><span>3:26</span></p>
							</div>
					</li>
                 </ul>
           </div>
       )
	}	
}

export default Hot;