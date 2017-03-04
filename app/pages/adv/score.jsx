import React   from 'react';
import {Link} from 'react-router';
import common from '../../common/common';
import ServerRequest from 'server/serverRequest';

class Score extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            animation : ''
        }
        this.score = '';
        this.scoreHandle = this.scoreHandle.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.hideHandle = this.hideHandle.bind(this);
    }

    componentDidMount(){
        // this.wrapper = document.querySelector('.score-wrapper');
        // this._preventDefault = function (e){ e.preventDefault(); }
        // this.wrapper.addEventListener('touchStart', this._preventDefault);
        // this.wrapper.addEventListener('touchMove', this._preventDefault);
        // this.wrapper.addEventListener('touchEnd', this._preventDefault);
    }

    componentWillReceiveProps(props){
        this.setState({animation:props.animation});
    }

    scoreHandle(event){
        this.score = event.target.value;
    }

    submitHandle(){
        this.setState({'animation':''});
        let server = new ServerRequest();
        server.post({
            url : 'score',
            data:{
                publishId : this.props.videoId,
                score : this.score || 0,
                token : common.getcookies('token')
            }
        });
    }

    hideHandle(event){
        var el = this.refs.scoreWrapper;
        if(event.target == el){
            this.setState({animation:''});
        }
    }

    render(){
      return(
          <div ref='scoreWrapper' className='score-wrapper' style={{display:this.state.animation ? 'block':'none'}} onClick={this.hideHandle}>
              <div className={'score-content ' + this.state.animation}>
                <h2>评分有惊喜！</h2>
                <p className="starability-slot clearfix">
                    <input type="radio" id="rate5-2" name="rating" value="5" onChange={this.scoreHandle}/>
                    <label htmlFor="rate5-2" title="Amazing">5 stars</label>

                    <input type="radio" id="rate4-2" name="rating" value="4"  onChange={this.scoreHandle} />
                    <label htmlFor="rate4-2" title="Very good">4 stars</label>

                    <input type="radio" id="rate3-2" name="rating" value="3"  onChange={this.scoreHandle} />
                    <label htmlFor="rate3-2" title="Average">3 stars</label>

                    <input type="radio" id="rate2-2" name="rating" value="2"  onChange={this.scoreHandle} />
                    <label htmlFor="rate2-2" title="Not good">2 stars</label>

                    <input type="radio" id="rate1-2" name="rating" value="1"  onChange={this.scoreHandle} />
                    <label htmlFor="rate1-2" title="Terrible">1 star</label>
                </p>
                <p className="score-description">你们的脑洞我服了！</p>
                <p className="score-button" onClick={this.submitHandle}>确定</p>
              </div>
          </div>
      )
    }
}

export default Score;
