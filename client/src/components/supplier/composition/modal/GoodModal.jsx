import React from 'react';
import {
    Button,
    Input, message,
    Modal, Select, Typography, Upload
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useType} from "../../../../state/supplier/TypeStore";
import {useBrand} from "../../../../state/supplier/BrandStore";
import {useUser} from "../../../../state/UserStore";
import {
    DeleteOutlined,
    UploadOutlined
} from "@ant-design/icons";
import Swal from "sweetalert2";
import {useGood} from "../../../../state/supplier/DeviceStore";

const GoodModal = (props) => {
    const {
        open,
        onOk,
        good,
        onCancel
    } = props
    const [info, setInfo] = React.useState([])
    const addInfo = () => {
        setInfo([...info, {optionKey: '', optionValue: '', number: Date.now()}])
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    };

    const [goodName, setGoodName] = React.useState('')
    const [goodPrice, setGoodPrice] = React.useState(0)
    const [goodDescription, setGoodDescription] = React.useState('')
    const [goodCount, setGoodCount] = React.useState(0)
    const [goodType, setGoodType] = React.useState(null)
    const [goodBrand, setGoodBrand] = React.useState(null)

    const [goodAllType, setGoodAllType] = React.useState([])
    const [goodAllBrand, setGoodAllBrand] = React.useState([])
    const [file, setFile] = React.useState(null)

    const {
        getTypes,
    } = useType()
    const {
        getBrands,
    } = useBrand()
    const {
        user
    } = useUser()
    const {
        addSupplierGood,
        updateSupplierDevice
    } = useGood()

    React.useEffect(() => {
        getTypes(user.id).then((data) => {
            setGoodAllType(data)
        })
        getBrands(user.id).then((data) => {
            setGoodAllBrand(data)
        })
    }, [getBrands, getTypes, user.id])

    const clearData = () => {
        setGoodName('')
        setGoodPrice(0)
        setGoodDescription('')
        setGoodCount(0)
        setGoodType(null)
        setGoodBrand(null)
        onCancel()
    }

    React.useEffect(() => {
        if (good === null) {
            setGoodName('')
            setGoodPrice(0)
            setGoodDescription('')
            setGoodCount(0)
            setGoodType(null)
            setGoodBrand(null)
        } else {
            setGoodName(good?.nameGood)
            setGoodPrice(good?.priceGood)
            setGoodDescription(good?.descriptionGood)
            setGoodCount(good?.countGood)
            setGoodType(good?.companyBrandId)
            setGoodBrand(good?.companyTypeId)
        }
    }, [good])

    const onChangeSelect = (value, setValue) => {
        if (value === "Выберите тип товара" || value === "Выберите бренд товара") {
            setValue(null);
        } else {
            setValue(value);
        }
    };

    const prop = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setFile(info.file.originFileObj);
                message.success(`${info.file.name} файл успешно загружен!`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} файл загружен с ошибками!.`);
            }
        },
    };

    const createGood = () => {
        if (!goodName) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите название товара!',
                icon: 'error'
            })
        }

        if (!goodPrice || goodPrice < 100) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите корректную цену товара! (P.S. цены начинаются от 100 рублей!)',
                icon: 'error'
            })
        }

        if (!goodDescription) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите описание товара!',
                icon: 'error'
            })
        }

        if (!goodCount || goodCount < 1) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите корректное количество товара!',
                icon: 'error'
            })
        }

        if (!goodType) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, выберите тип!',
                icon: 'error'
            })
        }

        if (!goodBrand) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, выберите бренд!',
                icon: 'error'
            })
        }

        if (!file) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, выберите изображение товара!',
                icon: 'error'
            })
        }

        const isEmptyInfo = info.some((item) => item.optionKey === '');
        const isEmptyDescription = info.some((item) => item.optionValue === '')

        if (isEmptyInfo) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название свойства!!'
            })
        }

        if (isEmptyDescription) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите описание свойства!!'
            })
        }

        const formData = new FormData();
        formData.append('nameGood', goodName)
        formData.append('priceGood', goodPrice)
        formData.append('descriptionGood', goodDescription)
        formData.append('countGood', goodCount)
        formData.append('companyTypeId', goodType)
        formData.append('companyBrandId', goodBrand)
        formData.append('info', JSON.stringify(info))
        formData.append('imageGood', file)
        formData.append('userId', user.id)

        addSupplierGood(formData).then(() => {
            return Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Товар успешно создан!'
            }).then(() => {
                onOk()
            })
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: e.response.data.message
            });
        })
    }

    const updateGood = () => {
        if (!goodName) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите название товара!',
                icon: 'error'
            })
        }

        if (!goodPrice || goodPrice < 100) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите корректную цену товара! (P.S. цены начинаются от 100 рублей!)',
                icon: 'error'
            })
        }

        if (!goodDescription) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите описание товара!',
                icon: 'error'
            })
        }

        if (!goodCount || goodCount < 1) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, введите корректное количество товара!',
                icon: 'error'
            })
        }

        if (!goodType) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, выберите тип!',
                icon: 'error'
            })
        }

        if (!goodBrand) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Пожалуйста, выберите бренд!',
                icon: 'error'
            })
        }

        const formData = new FormData();
        formData.append('id', good.id)
        formData.append('nameGood', goodName)
        formData.append('priceGood', goodPrice)
        formData.append('descriptionGood', goodDescription)
        formData.append('countGood', goodCount)
        formData.append('companyTypeId', goodType)
        formData.append('companyBrandId', goodBrand)
        formData.append('info', JSON.stringify(info))
        formData.append('imageGood', file)
        formData.append('userId', user.id)

        updateSupplierDevice(formData).then(() => {
            return Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Товар успешно обновлен!'
            }).then(() => {
                onOk()
            })
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: e.response.data.message
            });
        })
    }


    return (
        <Modal title={good !== null ? 'Изменение товара' : 'Добавление товара'}
               width={'100%'}
               open={open}
               centered
               maskClosable={false}
               onOk={onOk}
               onCancel={clearData}
               footer={[
                   <Button type={"primary"}
                           key={'clear'}
                           onClick={onCancel}>
                       Отмена
                   </Button>,
                   <Button key={'save'}
                           onClick={() => {
                               if (good === null) {
                                   createGood()
                               } else {
                                   updateGood()
                               }
                           }}>
                       Сохранить данные
                   </Button>
               ]}>
            <Input value={goodName}
                   onChange={(e) => setGoodName(e.target.value)}
                   style={{marginBottom: '1rem'}}
                   placeholder="Введите название товара..."
            />
            <Input value={goodPrice}
                   onChange={(e) => setGoodPrice(e.target.value)}
                   style={{marginBottom: '1rem'}}
                   placeholder="Введите цену устройства..."
                   prefix='₽'
            />
            <Input value={goodCount}
                   prefix='Кол-во'
                   onChange={(e) => setGoodCount(e.target.value)}
                   style={{marginBottom: '1rem'}}
                   placeholder="Введите количество устройства..."
            />
            <TextArea value={goodDescription}
                      onChange={(e) => setGoodDescription(e.target.value)}
                      style={{marginBottom: '1rem'}}
                      rows={5}
                      placeholder="Введите описание устройства..."
            />
            {
                good === null ? (
                        <div style={{
                            display: "flex",
                            flexFlow: 'column wrap',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <Select value={goodType !== null ? goodType : "Выберите тип товара"}
                                    onChange={(value) => onChangeSelect(value, setGoodType)}
                                    style={{
                                        marginRight: '1rem',
                                        width: '225px',
                                        marginBottom: '1rem'
                                    }}>
                                {
                                    goodAllType.map((typeItem) => (
                                        <Select.Option value={typeItem.id} key={typeItem.id}>
                                            {typeItem.typeName}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                            <Select value={goodBrand !== null ? goodBrand : "Выберите бренд устройства"}
                                    onChange={(value) => onChangeSelect(value, setGoodBrand)}
                                    style={{
                                        marginRight: '1rem',
                                        width: '225px',
                                        marginBottom: '1rem'
                                    }}>
                                {
                                    goodAllBrand.map((brandItem) => (
                                        <Select.Option value={brandItem.id} key={brandItem.id}>
                                            {brandItem.brandName}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                            <Upload {...prop}>
                                <Button icon={<UploadOutlined/>}>Загрузите изображение</Button>
                            </Upload>
                            <>
                                <Button onClick={addInfo} style={{marginTop: '1rem'}}>Добавить характеристику</Button>
                                {info.map((i) => (
                                    <div style={{display: "flex", flexFlow: "row nowrap", alignItems: 'center'}}
                                         key={i.number}>
                                        <Input
                                            style={{width: "350px", marginTop: '1rem', marginRight: '1rem'}}
                                            value={i.optionKey}
                                            onChange={(e) => changeInfo('optionKey', e.target.value, i.number)}
                                            placeholder="Введите название свойства"
                                        />
                                        <Input
                                            style={{width: "350px", marginTop: '1rem'}}
                                            value={i.optionValue}
                                            onChange={(e) => changeInfo('optionValue', e.target.value, i.number)}
                                            placeholder="Введите описание свойства"
                                        />
                                        <Button className="btn-reset" onClick={() => removeInfo(i.number)}>
                                            <DeleteOutlined/>
                                        </Button>
                                    </div>
                                ))}
                            </>
                        </div>
                    ) :
                    (
                        <div style={{
                            display: "flex",
                            flexFlow: 'row wrap',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <>
                                <Typography>Пожалуйста, выберите тип товара: </Typography>
                                <Select value={goodType !== null ? goodType : "Выберите тип товара"}
                                        onChange={(value) => onChangeSelect(value, setGoodType)}
                                        style={{
                                            marginRight: '1rem',
                                            width: '225px',
                                            marginLeft: '1rem'
                                        }}>
                                    {
                                        goodAllType.map((typeItem) => (
                                            <Select.Option value={typeItem.id} key={typeItem.id}>
                                                {typeItem.typeName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </>
                            <>
                                <Typography>Пожалуйста, выберите бренд товара: </Typography>
                                <Select value={goodBrand !== null ? goodBrand : "Выберите бренд устройства"}
                                        onChange={(value) => onChangeSelect(value, setGoodBrand)}
                                        optionLabelProp="children"
                                        style={{
                                            marginRight: '1rem',
                                            width: '225px',
                                            marginLeft: '1rem'
                                        }}>
                                    {
                                        goodAllBrand.map((brandItem) => (
                                            <Select.Option value={brandItem.id} key={brandItem.id}>
                                                {brandItem.brandName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </>
                        </div>
                    )
            }
        </Modal>
    );
};

export default GoodModal;
