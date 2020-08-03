import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions'
import ProdNfo from './prodNfo'
import ProdImg from './prodImg'
class ProductPage extends Component {
    componentDidMount() {
        const id = this.props.match.params.id  //get the id from params
        this.props.dispatch(getProductDetail(id))
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail())
    }
    addToCartHandler() {

    }
    render() {
        return (
            <div>
                <PageTop
                    title="Product detail"
                />
                <div className="container">
                    {
                        this.props.products.prodDetail ?
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    <div style={{ width: '500px' }}>
                                        <ProdImg
                                            detail={this.props.products.prodDetail}
                                        />
                                    </div>
                                </div>
                                <div className="right">
                                    <ProdNfo
                                        addToCart={(id) => this.addToCartHandler(id)}
                                        detail={this.props.products.prodDetail}
                                    />

                                </div>
                            </div>
                            : 'Loading'
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductPage);