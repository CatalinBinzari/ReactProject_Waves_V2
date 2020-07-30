import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { frets, price } from '../utils/Form/fixed_categories'

import { connect } from 'react-redux';
import { getProductsToShop, getBrands, getWoods } from '../../actions/products_actions'
import CollapseCheckbox from '../utils/collapseCheckbox'
import CollapseRadio from '../utils/collapseRadio'
import LoadmoreCards from './loadmoreCards';
class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
        this.props.dispatch(getProductsToShop( //func:  getProductsToShop will take all this args
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    handleFilters = (filters, category) => {
        const newFilters = { ...this.state.filters } //copy of filters to dont mutate it
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = this.handlePrice(filters)// filters are prices id: 1,2,3,4,5
            newFilters[category] = priceValues
        }
        this.showFilteredResults(newFilters)
        this.setState({
            filters: newFilters
        })
    }
    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop( //reset to 0 the results evey time user choose smth
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({
                skip: 0
            })
        })
    }
    handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array
    }
    render() {

        const products = this.props.products
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters) => this.handleFilters(filters, 'brand')} //'brand' to know what we are filtering
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Woods"
                                list={products.woods}
                                handleFilters={(filters) => this.handleFilters(filters, 'wood')} //'brand' to know what we are filtering
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filters) => this.handleFilters(filters, 'price')} //'brand' to know what we are filtering
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    grids
                                </div>
                                <div>
                                    <LoadmoreCards
                                        grid={this.state.grid}
                                        limit={this.state.limit}
                                        size={products.toShopSize}
                                        products={products.toShop}
                                        loadMore={() => console.log('load more')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
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
export default connect(mapStateToProps)(Shop);