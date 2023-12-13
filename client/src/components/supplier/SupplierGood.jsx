import React from 'react';
import {useGood} from "../../state/supplier/DeviceStore";
import {useUser} from "../../state/UserStore";
import {
    Button,
    Image,
    Space,
    Table,
    Typography
} from "antd";
import {useType} from "../../state/supplier/TypeStore";
import {useBrand} from "../../state/supplier/BrandStore";
import GoodModal from "./composition/modal/GoodModal";

const SupplierGood = () => {
    const {
        getAllSupplierGoods,
        getOneSupplierGood
    } = useGood()
    const {
        user
    } = useUser()
    const {
        getTypes
    } = useType()
    const {
        getBrands
    } = useBrand()

    const [open, setOpen] = React.useState(false)
    const [goods, setGoods] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [brands, setBrands] = React.useState([])
    const [oneGood, setOneGood] = React.useState(null)

    React.useEffect(() => {
        getAllSupplierGoods(user.id).then((data) => {
            setGoods(data)
        })
    }, [getAllSupplierGoods, user.id])

    React.useEffect(() => {
        getTypes(user.id).then((data) => {
            setTypes(data)
        })
        getBrands(user.id).then((data) => {
            setBrands(data)
        })
    }, [getBrands, getTypes, user.id])

    const columns = [
        {
            title: '№ устройства',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование товара',
            dataIndex: 'nameGood',
            key: 'nameGood'
        },
        {
            title: 'Цена товара',
            dataIndex: 'priceGood',
            key: 'priceGood'
        },
        {
            title: 'Количество устройств',
            dataIndex: 'countGood',
            key: 'countGood',
            render: (dataCount) => {
                let color;
                if (dataCount <= 10) {
                    color = "red";
                } else if (dataCount > 10 && dataCount < 20) {
                    color = "orange";
                } else {
                    color = "green";
                }
                return (
                    <span style={{color}}>Осталось {dataCount} шт.</span>
                );
            },
        },
        {
            title: 'Тип товара',
            dataIndex: 'companyTypeId',
            key: 'companyTypeId',
            render: (companyTypeId) => {
                const selectType = types.find((type) => type.id === companyTypeId)
                return (
                    <Typography>{selectType ? selectType?.typeName : 'Отсутствует' }</Typography>
                )
            }
        },
        {
            title: 'Бренд товара',
            dataIndex: 'companyBrandId',
            key: 'companyBrandId',
            render: (companyBrandId) => {
                const selectBrand = brands.find((brand) => brand.id === companyBrandId)
                return (
                    <Typography>{selectBrand ? selectBrand?.brandName : 'Отсутствует'}</Typography>
                )
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="large">
                    <Button style={{
                        border: 'orange 1px solid',
                        color: 'orange'
                    }}
                    onClick={() => {
                        showModal(record.id)
                    }}>Изменить товар</Button>
                    <Button danger>Удалить товар</Button>
                </Space>
            ),
        }
    ]

    const handleOk = () => {
        getAllSupplierGoods(user.id).then((data) => {
            setGoods(data)
        })
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const showModal = (goodId) => {
        if (goodId !== null) {
            getOneSupplierGood(goodId).then((data) => {
                setOneGood(data)
            })
        } else {
            setOneGood(null)
        }
        setOpen(true)
    }

    return (
        <>
            <Table bordered
                   locale={{
                       emptyText: 'Пустоватенько...'
                   }}
                   title={() => <Space>
                       <Button style={{
                           border: 'green 1px solid',
                           color: 'green'
                       }}
                       onClick={() => {
                           showModal(null)
                       }}>Добавить товар</Button>
                       <Button danger>Удалить все товары</Button>
                   </Space>
                   }
                   expandable={{
                       expandedRowRender: (record) => {
                           const currentGood = goods.find((good) => good.id === record.id);
                           return (
                               <div style={{
                                   display: 'flex',
                                   flexFlow: 'row wrap'
                               }}>
                                   <div style={{
                                       marginRight: '3rem'
                                   }}>
                                       <Image width={200}
                                              alt={'Good image'}
                                              aria-label={'Good image'}
                                              src={`${process.env.REACT_APP_API_URL}${currentGood.imageGood}`}/>
                                   </div>
                                   <>
                                       <div style={{
                                           display: "flex",
                                           flexFlow: "column wrap"
                                       }}>
                                           <>
                                               <Typography>Описание</Typography>
                                           </>
                                           <>
                                               {
                                                   currentGood.info.map((info) =>
                                                       <Space size={"large"}>
                                                           <Typography>{info.optionKey}</Typography>
                                                           :
                                                           <Typography>{info.optionValue}</Typography>
                                                       </Space>
                                                   )
                                               }
                                           </>
                                       </div>
                                   </>
                               </div>
                           )
                       }
                   }}
                   dataSource={
                       goods.map((good) => (
                           {...good, key: good.id}
                       ))
                   }
                   pagination={{
                       defaultPageSize: 6,
                       showSizeChanger: false
                   }}
                   columns={columns}/>
            <GoodModal open={open}
                       onOk={handleOk}
                       onCancel={handleCancel}
                       good={oneGood}/>
        </>
    );
};

export default SupplierGood;
