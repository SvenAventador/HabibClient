import React from 'react';
import {Button, Input, Modal} from "antd";
import {useUser} from "../../../../state/UserStore";
import Swal from "sweetalert2";
import {useBrand} from "../../../../state/supplier/BrandStore";

const BrandModal = (props) => {
    const {
        open,
        onOk,
        brand,
        onCancel
    } = props
    const [brandName, setBrandName] = React.useState(brand?.brandName || '')
    React.useEffect(() => {
        setBrandName(brand?.brandName || '');
    }, [brand?.brandName])

    const {
        user
    } = useUser()
    const {
        addBrand,
        updateBrand
    } = useBrand()

    return (
        <Modal title={brand !== null ? 'Изменение бренда товара' : 'Добавление бренда товара'}
               open={open}
               centered
               maskClosable={false}
               onOk={onOk}
               onCancel={onCancel}
               footer={[
                   <Button onClick={() => {
                       onCancel()
                       setBrandName('')
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
                               if (brand === null) {
                                   addBrand(brandName, user.id)
                                       .then(() => {
                                           Swal.fire({
                                               title: 'Внимание!',
                                               text: 'Бренд успешно создан!',
                                               icon: "success"
                                           }).then(() => {
                                               setBrandName('')
                                               onOk()
                                           })
                                       })
                                       .catch((error) => {
                                           Swal.fire({
                                               title: 'Внимание!',
                                               text: error.response.data.message,
                                               icon: "error"
                                           }).then(() => {
                                               setBrandName('')
                                           })
                                       })
                               } else {
                                   updateBrand(brand.id, brandName, user.id)
                                       .then(() => {
                                           Swal.fire({
                                               title: 'Внимание!',
                                               text: 'Бренд успешно обновлен!',
                                               icon: "success"
                                           }).then(() => {
                                               setBrandName('')
                                               onOk()
                                           })
                                       })
                                       .catch((error) => {
                                           Swal.fire({
                                               title: 'Внимание!',
                                               text: error.response.data.message,
                                               icon: "error"
                                           }).then(() => {
                                               setBrandName(brand?.typeName)
                                           })
                                       })
                               }
                           }}>
                       Сохранить данные
                   </Button>
               ]}>
            <Input
                placeholder="Введите название типа..."
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
            />
        </Modal>
    );
};

export default BrandModal;
