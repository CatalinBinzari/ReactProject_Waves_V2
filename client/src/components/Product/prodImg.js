import React, { Component } from 'react';

class ProdImg extends Component {
    state = {
        lightbox: false,
        imagePos: 0,
        lightboxImges: []
    }

    componentDidMount() {
        if (this.props.detail.images.length > 0) { //more than one image
            let lightboxImges = [];
            this.props.detail.images.forEach(item => {
                lightboxImges.push(item.url)
            })
            this.setState({
                lightboxImges
            })
        }
    }
    renderCardImage = (images) => {
        if (images.length > 0) { //we have images
            console.log('have image')
            return images[0].url

        } else {
            console.log('dont have images')
            return `/images/image_not_availble.png`
        }
    }

    handleLight = () => {

    }

    showThumbs = () => {
        this.state.lightboxImges.map((item, i) => (
            i > 0 ? //if map iteration is > 0
                <div
                    key={i}
                    onClick={() => this.handleLightBox(i)} //oppens the lightbox
                    className="thumb"
                    style={{ background: `url(${item}) no-repeat` }}
                >

                </div>
                : null
        ))
    }

    render() {
        const { detail } = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{ background: `url(${this.renderCardImage(detail.images)}) no-repeat` }}
                        onClick={() => this.handleLightBox(0)}
                    >

                    </div>
                </div>
                <div className="main_thumbs">
                    {this.showThumbs(detail)}
                </div>
            </div>
        );
    }
}

export default ProdImg;