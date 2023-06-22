import React from 'react'
import storeItem from "../Data/item.json";
import {Col,Row} from "react-bootstrap"
import StoreItem from '../Components/StoreItem';

const Store = () => {

  return (
    <>
    <h1>Store</h1>
      <Row ms={2} xs={1}  lg={3} className='g-3'>
        {storeItem.map(item => (
          <Col key={item.id}>
          <StoreItem  {...item} />
          </Col>
        ))}

      </Row>
    </>
  )
}

export default Store
