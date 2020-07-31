import React, { Component } from 'react';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux'
import { getWoods, addWood } from '../../../actions/products_actions'
import FormField from '../../utils/Form/formfield';
class ManageWoods extends Component {
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
                    placeholder: 'Enter the wood'
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
    showCategoryItems = () => ( //grab brands we have inside props
        this.props.products.woods ?
            this.props.products.woods.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    )
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'woods');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
        console.log(newFormdata)
    }
    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formdata, 'woods')

        this.setState({
            formdata: newFormData,
            formSuccess: true
        })
    }
    componentDidMount() {
        this.props.dispatch(getWoods());
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'woods');
        let formIsValid = isFormValid(this.state.formdata, 'woods');
        let existingBrands = this.props.products.woods

        if (formIsValid) {
            this.props.dispatch(addWood(dataToSubmit, existingBrands)).then(response => {
                if (response.payload.success) {
                    this.resetFieldsHandler()
                } else {
                    this.setState({ formError: true })
                }
            })


        } else {
            this.setState({
                formError: true
            })
        }
    }
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
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
                                Add wood
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
export default connect(mapStateToProps)(ManageWoods);