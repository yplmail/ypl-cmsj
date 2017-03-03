import React   from 'react';
import { DefaultPlayer as Video } from '../../components/dist/index';
import '../../components/dist/styles.css';

class HtmlVideo extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Video autoPlay loop muted
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                onCanPlayThrough={() => {
                    // Do stuff
                }}>
  <source src="http://test-video-input1.oss-cn-shenzhen.aliyuncs.com/2017/03/05/287535704324850176.MP4" type="video/MP4" />

            </Video>
        );
    }

}


export default HtmlVideo;
