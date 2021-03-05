import React from 'react';
import { connect } from 'react-redux';
import './collection.styles.scss';
import { selectShopCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({
  collection,
  collection: {
    title,
    items
  }
}) => (
  <div className='collection-page'>
    <h2 className='title'>{ collection.title }</h2>
    <div className='items'>
      {
        items.map(item => (
          <CollectionItem key={item.id} item={item}/>
        ))
      }
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectShopCollection(ownProps.match.params.collection)(state)
})

export default connect(mapStateToProps)(CollectionPage);