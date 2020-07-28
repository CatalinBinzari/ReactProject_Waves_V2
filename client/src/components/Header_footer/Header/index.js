import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions'
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
    logoutHandler = () => {
        console.log(this.props.user.userData)
        this.props.dispatch(logoutUser()).then(response => {
            //catch response.payload.success from server.js instead of props
            if (response.payload.success) {
                this.props.history.push('/')//we need to inject router for this
            }
        })
    }
    cartLink = (item, i) => {
        const user = this.props.user.userData
        return ( //if we have smth in user card, we return how many items we have in that list, if not, zero
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }

    defaultLink = (item, i) => (
        item.name === 'Log out' ?
            <div className="log_out_link"
                key={i}
                onClick={() => this.logoutHandler()}>
                {item.name}
            </div>
            :
            < Link to={item.linkTo} key={i} >
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
            if (item.name !== 'My Cart') {
                return this.defaultLink(item, i)
            } else {
                return this.cartLink(item, i)
            }

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
export default connect(mapStateToProps)(withRouter(Header)); 