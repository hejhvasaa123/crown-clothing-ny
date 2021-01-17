import React from 'react';

import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CategoryPageOne = ({ match }) => {
    console.log(match.params.categoryId);
    return (
        <div className="category">
            <h2>CATEGORY</h2>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CategoryPageOne);
