import { ReactComponent } from 'react';
import React from 'react';

import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.components";

import CollectionPage from "../collection/collection.component.jsx";

// import CategoryPageOne from "../../components/collection1/collection.component";

const ShopPage = ({ match }) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);

export default ShopPage;