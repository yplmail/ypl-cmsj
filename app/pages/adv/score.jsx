class Score extends React.Component{
    constructor(props){
        super(props)
        this.score = 0 ;
        this.change = this.change.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }

    change(event){
        this.score = event.target.value;
    }

    clickHandle(){
        this.props.handle(this.score);
    }

    render(){
      return(
          <div className='score-wrapper' style={{display:this.props.animation ? 'block':'none'}}>
              <div className={'score-content ' + this.props.animation}>
                <h2>评分有惊喜！</h2>
                <p className="starability-slot clearfix">
                    <input type="radio" id="rate5-2" name="rating" value="5" onChange={this.change}/>
                    <label htmlFor="rate5-2" title="Amazing">5 stars</label>

                    <input type="radio" id="rate4-2" name="rating" value="4"  onChange={this.change} />
                    <label htmlFor="rate4-2" title="Very good">4 stars</label>

                    <input type="radio" id="rate3-2" name="rating" value="3"  onChange={this.change} />
                    <label htmlFor="rate3-2" title="Average">3 stars</label>

                    <input type="radio" id="rate2-2" name="rating" value="2"  onChange={this.change} />
                    <label htmlFor="rate2-2" title="Not good">2 stars</label>

                    <input type="radio" id="rate1-2" name="rating" value="1"  onChange={this.change} />
                    <label htmlFor="rate1-2" title="Terrible">1 star</label>
                </p>
                <p className="score-description">你们的脑洞我服了！</p>
                <p className="score-button" onClick={this.clickHandle}>确定</p>
              </div>
          </div>
      )
    }
}

export default Score;