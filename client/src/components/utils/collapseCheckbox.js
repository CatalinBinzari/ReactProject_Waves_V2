import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse'
class CollapseCheckbox extends Component {
    state = {
        open: false,
        checked: []
    }


    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }
    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    handleAngle = () => (
        this.state.open ?
            <FontAwesomeIcon
                icon={faAngleUp}
                className="icon"
            />
            :
            <FontAwesomeIcon
                icon={faAngleDown}
                className="icon"
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map((value) => (
                <ListItem key={value._id} style={{ padding: '10px 0' }}>
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={this.handleToggle(value._id)}
                            checked={this.state.checked.indexOf(value._id) !== -1} // if true, then default every checkbox renders as true
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
            : null
    )
    handleToggle = value => () => { //takes whatever from value and run a function
        const { checked } = this.state; // short version of: const checked = this.state.checked
        const currentIndex = checked.indexOf(value) //indexOf search into the array the value
        const newChecked = [...checked]

        if (currentIndex === -1) { //not in the list
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1) //position of the value we want to delete, 1 meands one entry to delete
        }



        this.setState({
            checked: newChecked
        }, () => {
            this.props.handleFilters(newChecked) //callback function that pass the array with checked values to parrent
        })
    }
    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                    <ListItem onClick={this.handleClick} style={{ padding: '10px 23px 10px 0' }}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>

        );
    }
}

export default CollapseCheckbox;