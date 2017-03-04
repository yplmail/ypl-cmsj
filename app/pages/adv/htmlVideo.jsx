import React   from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import Share from 'share/share';

class HtmlVideo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            display:'none'
        }
        this.handle = this.handle.bind(this);
    }

    handle(){
       this.setState({
        display:'block'
       })
    }

    render() {
        return (
            <div>
            <Video autoPlay loop muted
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                onCanPlayThrough={() => {
                    // Do stuff
                }}>
                <source src="http://test-video-input1.oss-cn-shenzhen.aliyuncs.com/2017/03/05/287535704324850176.MP4" type="video/MP4" />

            </Video>
            <Share display={this.state.display}/>
            <button onClick={this.handle}>播放</button>
            </div>
        );
    }

}


export default HtmlVideo;
