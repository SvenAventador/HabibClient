import React from 'react';
import {
    Button,
    Space,
    Table
} from "antd";
import {useUser} from "../../../state/UserStore";
import Swal from "sweetalert2";
import {useBrand} from "../../../state/supplier/BrandStore";
import BrandModal from "./modal/BrandModal";

const BrandComposition = () => {
    const {
        getBrand,
        getBrands,
        deleteBrand,
        deleteBrands
    } = useBrand()
    const {
        user
    } = useUser()
    const columns = [
        {
            title: '№',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Наименование бренда',
            key: 'brandName',
            dataIndex: 'brandName'
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
                            }}>Изменить наименование бренда</Button>
                    <Button danger
                            onClick={() => {
                                Swal.fire({
                                    title: "Внимание!",
                                    text: "Вы действительно хотите удалить данный бренд?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Да, хочу!",
                                    cancelButtonText: 'Ни в коем случае!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteBrand(record.id).then(() => {
                                             Swal.fire({
                                                title: 'Внимание!',
                                                text: 'Бренд успешно удален!',
                                                icon: "success"
                                            }).then(() => {
                                                 getBrands(user.id).then((data) => {
                                                     setAllBrands(data || [])
                                                 })
                                             })
                                        })
                                    }
                                });
                            }}>Удалить бренд товара</Button>
                </Space>
            ),
        }
    ]

    const [open, setOpen] = React.useState(false)
    const [oneBrand, setOneBrand] = React.useState(null)

    let [allBrands, setAllBrands] = React.useState([])
    React.useEffect(() => {
        getBrands(user.id).then((data) => {
            setAllBrands(data || [])
        })
    }, [getBrands, user.id])

    const handleOk = () => {
        getBrands(user.id).then((data) => {
            setAllBrands(data || [])
        })
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const showModal = (id) => {
        if (id !== null) {
            getBrand(id).then((data) => {
                setOneBrand(data)
            })
        } else {
            setOneBrand(null)
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
                               }}>Добавить бренд товара</Button>
                       <Button danger
                               onClick={() => {
                                   Swal.fire({
                                       title: "Внимание!",
                                       text: "Вы действительно хотите удалить все бренды?",
                                       icon: "question",
                                       showCancelButton: true,
                                       confirmButtonColor: "#3085d6",
                                       cancelButtonColor: "#d33",
                                       confirmButtonText: "Да, хочу!",
                                       cancelButtonText: 'Ни в коем случае!'
                                   }).then((result) => {
                                       if (result.isConfirmed) {
                                           deleteBrands(user.id).then(() => {
                                               setAllBrands([])
                                               return Swal.fire({
                                                   title: 'Внимание!',
                                                   text: 'Бренды успешно удалены!',
                                                   icon: "success"
                                               })
                                           })
                                       }
                                   });
                               }}>Удалить все типы товара</Button>
                   </Space>
                   }
                   dataSource={
                       allBrands.map((brand) => (
                           {...brand, key: brand.id}
                       ))
                   }
                   pagination={{
                       defaultPageSize: 6,
                       showSizeChanger: false
                   }}
                   columns={columns}/>
            <BrandModal open={open}
                        onOk={handleOk}
                        brand={oneBrand}
                        onCancel={handleCancel}/>
        </>
    );
};

export default BrandComposition;
