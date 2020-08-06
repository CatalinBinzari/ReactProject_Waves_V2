import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block'
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import { getCartItems } from '../../actions/user_actions';
class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showtotal: false,
        showSuccess: false
    }
    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;
        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id) //push just id's from cart to cartItem
                });

                this.props.dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(() => {

                    })

            }
        }
    }
    removeFromCart() {

    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My carts</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                    </div>
                </div>
            </UserLayout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UserCart); 