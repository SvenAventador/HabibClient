import React from 'react';
import {Tabs} from "antd";
import BrandComposition from "./composition/BrandComposition";
import TypeComposition from "./composition/TypeComposition";

const SupplierComposition = () => {

    return (
        <Tabs defaultActiveKey="1"
              type="card"
              size={"large"}
              style={{
                  backgroundColor: '#f5f5f5',
                  color: 'var(--black)',
                  height: '100vh'
              }}
              items={[
                  {
                      label: 'Типы товаров',
                      key: 'type',
                      children: <TypeComposition />
                  },
                  {
                      label: 'Бренды товаров',
                      key: 'brand',
                      children: <BrandComposition />
                  }
              ]}
        />
    );
};

export default SupplierComposition;
