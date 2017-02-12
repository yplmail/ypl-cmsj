import React from 'react';
import {Link} from 'react-router';
import './mine.css';
var header_img = require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/mine/mine_header_icon.png');
var message_img = require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/mine/mine_msg_icon.png');
var question_img = require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/normal/question_icon.png');
class Mine extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        return (
           <div className="personal-content">
             <Header />
             <Account />
             <Coustomer />
             <Nav />
             <Product />
           </div>
        )
    }
}

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            header_src:header_img,
            message_src:message_img
        };
    }

    render(){
        return (
        <div className="personal-header clearfix">
          <div className="header-left">
                <div className="head-portrait">
                    <img src={this.state.header_src} />
                </div>
                <div className="personal-detail">
                  <p className="mobile">18682243486</p>
                  <p>
                      <span>已认证</span>
                  </p>
                </div>
                <div className="personal-msg">
                      <img src={this.state.message_src} />
                      <span className="msg-count">99</span>
                </div>
          </div>

          <div className="header-right">
            <button className="button">退出</button>
          </div>
        </div>
        )
    }
}

class Account extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            question_src:question_img,
        };
    }

    render(){
        return (
            <div className="personal-account arrow">
                <p className="account-text">
                    <span>账户余额(元)</span>
                    <i className="eye"></i>
                </p>

                <p className="account-money">
                    <span>
                        <span>509888</span>
                        <img src={this.state.question_src} />
                    </span>
                </p>
                <a className="widthdraw">明细 / 提现</a>
            </div>
        )
    }
}

class Coustomer extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <div className="customer-planner">
          <a>
              我的客户/理财师团队
          </a>
        </div>
        )
    }
}

class Nav extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          nav_img_1: require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/mine/mine_about_icon.png'),
          nav_img_2: require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/mine/mine_user_icon.png'),
          nav_img_3: require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/mine/mine_rec_icon.png'),
          nav_img_4: require('!file-loader?limit=10240&name=images/[name]_[hash:7].[ext]!../../images/mine/mine_planner_icon.png'),
        }
    }


    render(){
        return (
        <div className="router-nav">
            <ul>
                <li>
                  <a>
                  <img src={this.state.nav_img_1} />
                  <p>了解我们</p>
                </a>
                </li>

                <li>
                    <a>
                    <img src={this.state.nav_img_2} />
                    <p>新手攻略</p>
                    </a>
                </li>

                <li>
                    <a>
                    <img src={this.state.nav_img_3} />
                    <p>邀请客户</p>
                    </a>
                </li>

                <li>
                  <a>
                      <img src={this.state.nav_img_4} />
                      <p>推荐理财师</p>
                   </a>
                </li>
            </ul>
        </div>
        )
    }
}

class Product extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <div className="planner-product">
        <h1>理财师特供标</h1>
        <ul>
            <li className="product-info">
                <a>
                    <div className="product-name clearfix">
                        <h2>'小牛在线-月月牛'</h2>
                    </div>
                    <div className="product-detail">
                        <div className="detail-top clearfix">
                            <div>
                                <h3>年化佣金率</h3>
                                <p>15<span className="unit">%</span></p>
                            </div>

                            <div>
                                <h3>预期年化</h3>
                                <p>12<span className="unit">%</span></p>
                            </div>

                            <div>
                                <h3>期限</h3>
                                <p>
                                  <span>100天~12个月</span>
                                </p>
                            </div>
                            <div>
                                <a>
                                  <i className="recommand"></i>
                                </a>
                            </div>
                        </div>

                        <div className="detail-bottom">
                            <span className="progress">
                                <i className="percentage" styleName="width:56%"></i>
                            </span>
                            <span className="percentageText">
                                <span>已售56%</span>
                            </span>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
        </div>
        )
    }
}

export default Mine;

