import React, { Component } from 'react';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux'
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/products_actions'
import FormField from '../../utils/Form/formfield';
class ManageBrands extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the brand'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'brands');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
        console.log(newFormdata)
    }

    showCategoryItems = () => ( //grab brands we have inside props
        this.props.products.brands ?
            this.props.products.brands.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    )

    componentDidMount() {
        this.props.dispatch(getBrands());
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'brands');
        let formIsValid = isFormValid(this.state.formdata, 'brands');

        if (formIsValid) {
            console.log(dataToSubmit)
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                        </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Add brand
                        </button>
                        </form>
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
export default connect(mapStateToProps)(ManageBrands);