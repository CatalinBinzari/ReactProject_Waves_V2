import React from 'react';
import Card from './card'
const CardBlock = (props) => { //props from the server

    const renderCards = () => (
        //check if we do have a list

        props.list ?
            props.list.map((card, i) => (

                <Card
                    key={i}
                    {...card}
                />

            ))
            : null

    )

    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ?
                        <div className="title">
                            {props.title}
                        </div>
                        : null
                }
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
                >
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    );
};

export default CardBlock;