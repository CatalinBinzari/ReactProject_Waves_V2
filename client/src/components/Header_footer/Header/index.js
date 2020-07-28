import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
class Header extends Component {

    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true //public
            },
            {
                name: 'Home',
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false  //not public
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/user/logout',
                public: false
            }
        ]
    }
    defaultLink = (item, i) => (
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )
    showLinks = (type) => {
        let list = [];
        if (this.props.user.userData) { //check if the user is logged in
            type.forEach((item) => {
                if (!this.props.user.userData.isAuth) { //if user is not auth
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {
                    if (item.name !== "Log in") {
                        list.push(item)
                    }
                }
            });
        }
        return list.map((item, i) => {
            return this.defaultLink(item, i)
        })
    }
    render() {

        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            WAVES
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
//connect to redux
function mapStateToProps(state) { //to inject the props we get from redux to connect()
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Header); 