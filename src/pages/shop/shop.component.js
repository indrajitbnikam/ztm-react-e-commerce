import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { setShopCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
export class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collections = convertCollectionsSnapshotToMap(snapshot)
      this.props.setShopCollections(collections);
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route exact
          path={`${match.path}`}
          render={(props) =>
            <CollectionOverviewWithSpinner isLoading={loading} {...props}/>
          } />
        <Route exact
          path={`${match.path}/:collection`}
          render={(props) =>
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          } />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  setShopCollections: collections => dispatch(setShopCollections(collections))
})

export default connect(null, mapDispatchToProps)(ShopPage);
