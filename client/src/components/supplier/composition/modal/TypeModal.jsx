import React from 'react';
import {Button, Input, Modal} from "antd";
import {useUser} from "../../../../state/UserStore";
import {useType} from "../../../../state/supplier/TypeStore";
import Swal from "sweetalert2";

const TypeModal = (props) => {
    const {
        open,
        onOk,
        type,
        onCancel
    } = props
    const [typeName, setTypeName] = React.useState(type?.typeName || '')
    React.useEffect(() => {
        setTypeName(type?.typeName || '');
    }, [type?.typeName])

    const {
        user
    } = useUser()
    const {
        addType,
        updateType
    } = useType()

    return (
        <Modal title={type !== null ? 'Изменение типа товара' : 'Добавление типа товара'}
               open={open}
               centered
               maskClosable={false}
               onOk={onOk}
               onCancel={onCancel}
               footer={[
                   <Button onClick={() => {
                       onCancel()
                       setTypeName('')
                   }}
                           key='cancel'
                           type='primary'>
                       Отмена
                   </Button>,
                   <Button key='save'
                           style={{
                               border: 'green 1px solid',
                               color: 'green'
                           }}
                           onClick={() => {
                               if (type === null) {
                                   addType(typeName, user.id)
                                       .then(() => {
                                           Swal.fire({
                                               title: 'Внимание!',
                                               text: 'Тип успешно создан!',
                                               icon: "success"
                                           }).then(() => {
                                               setTypeName('')
                                               onOk()
                                           })
                                       })
                                       .catch((error) => {
                                           Swal.fire({
                                               title: 'Внимание!',
                                               text: error.response.data.message,
                                               icon: "error"
                                           }).then(() => {
                                               setTypeName('')
                                           })
                                       })
                               } else {
                                   updateType(type.id, typeName, user.id)
                                       .then(() => {
                                            Swal.fire({
                                               title: 'Внимание!',
                                               text: 'Тип успешно обновлен!',
                                               icon: "success"
                                           }).then(() => {
                                                setTypeName('')
                                                onOk()
                                            })
                                       })
                                       .catch((error) => {
                                            Swal.fire({
                                               title: 'Внимание!',
                                               text: error.response.data.message,
                                               icon: "error"
                                           }).then(() => {
                                               setTypeName(type?.typeName)
                                            })
                                       })
                               }
                           }}>
                       Сохранить данные
                   </Button>
               ]}>
            <Input
                placeholder="Введите название типа..."
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
            />
        </Modal>
    );
};

export default TypeModal;
