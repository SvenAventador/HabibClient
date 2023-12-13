import React from 'react';
import {
    Button,
    Space,
    Table
} from "antd";
import TypeModal from "./modal/TypeModal";
import {useType} from "../../../state/supplier/TypeStore";
import {useUser} from "../../../state/UserStore";
import Swal from "sweetalert2";

const TypeComposition = () => {
    const {
        getType,
        getTypes,
        deleteType,
        deleteTypes
    } = useType()
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
            title: 'Наименование типа',
            key: 'typeName',
            dataIndex: 'typeName'
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
                            }}>Изменить наименование типа</Button>
                    <Button danger
                            onClick={() => {
                                Swal.fire({
                                    title: "Внимание!",
                                    text: "Вы действительно хотите удалить данный тип?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Да, хочу!",
                                    cancelButtonText: 'Ни в коем случае!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteType(record.id).then(() => {
                                             Swal.fire({
                                                title: 'Внимание!',
                                                text: 'Тип успешно удален!',
                                                icon: "success"
                                            }).then(() => {
                                                 getTypes(user.id).then((data) => {
                                                     setAllTypes(data || [])
                                                 })
                                             })
                                        })
                                    }
                                });
                            }}>Удалить тип товара</Button>
                </Space>
            ),
        }
    ]

    const [open, setOpen] = React.useState(false)
    const [oneType, setOneType] = React.useState(null)

    let [allTypes, setAllTypes] = React.useState([])
    React.useEffect(() => {
        getTypes(user.id).then((data) => {
            setAllTypes(data || [])
        })
    }, [getTypes, user.id])

    const handleOk = () => {
        getTypes(user.id).then((data) => {
            setAllTypes(data || [])
        })
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const showModal = (id) => {
        if (id !== null) {
            getType(id).then((data) => {
                setOneType(data)
            })
        } else {
            setOneType(null)
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
                               }}>Добавить тип товара</Button>
                       <Button danger
                               onClick={() => {
                                   Swal.fire({
                                       title: "Внимание!",
                                       text: "Вы действительно хотите удалить все типы?",
                                       icon: "question",
                                       showCancelButton: true,
                                       confirmButtonColor: "#3085d6",
                                       cancelButtonColor: "#d33",
                                       confirmButtonText: "Да, хочу!",
                                       cancelButtonText: 'Ни в коем случае!'
                                   }).then((result) => {
                                       if (result.isConfirmed) {
                                           deleteTypes(user.id).then(() => {
                                               setAllTypes([])
                                               return Swal.fire({
                                                   title: 'Внимание!',
                                                   text: 'Типы успешно удалены!',
                                                   icon: "success"
                                               })
                                           })
                                       }
                                   });
                               }}>Удалить все типы товара</Button>
                   </Space>
                   }
                   dataSource={
                       allTypes.map((type) => (
                           {...type, key: type.id}
                       ))
                   }
                   pagination={{
                       defaultPageSize: 6,
                       showSizeChanger: false
                   }}
                   columns={columns}/>
            <TypeModal open={open}
                       onOk={handleOk}
                       type={oneType}
                       onCancel={handleCancel}/>
        </>
    );
};

export default TypeComposition;
