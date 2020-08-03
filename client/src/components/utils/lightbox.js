import React, { Component } from 'react';
import Lightbox from 'react-images';

class ImageLightBox extends Component {

    state = {
        lightboxIsOpen: true,
        currentImage: this.props.pos,
        images: [] //an array of url's
    }

    static getDerivedStateFromProps(props, state) {
        if (props.images) {
            const images = [];
            props.images.forEach(element => {
                images.push({ src: `${element}` })
            });
            return state = {
                images
            }
        }
        return false;
    }
    closeLightbox = () => {
        this.props.onclose();
    }
    gotoPrevious = () => {
        //get current image and rest one
        this.setState({
            currentImage: this.state.currentImage - 1,

        })
    }

    gotoNext = () => {
        //get current image and rest one
        this.setState({
            currentImage: this.state.currentImage + 1,
        })
    }

    render() {
        return (
            <Lightbox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={() => this.gotoPrevious()}
                onClickNext={() => this.gotoNext()}
                onclose={() => this.closeLightbox()}
            />
        );
    }
}

export default ImageLightBox;