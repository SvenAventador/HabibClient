import React from 'react';
import {
    Button,
    Modal,
    Typography
} from "antd";

const {Title} = Typography

const AgreementModal = (props) => {
    let {
        open,
        onCancel
    } = props
    return (
        <Modal centered
               width={'100%'}
               onCancel={onCancel}
               open={open}
               footer={[
                   <Button key='cancel'
                           danger
                           onClick={() => onCancel()}>
                       Отмена
                   </Button>,
                   <Button key='ok'
                           style={{
                               backgroundColor: 'green',
                               color: 'white'
                           }}
                           onClick={() => onCancel()}>
                       Принять
                   </Button>
               ]}>
            <Title style={{
                textAlign: 'center'
            }}>
                Пользовательское соглашение для интернет-магазина
            </Title>
            <Title level={5}>
                Данное Пользовательское соглашение (далее — "Соглашение") регулирует использование интернет-магазина
                ИП «Габдрахманов И.И.» (далее — "Магазин") и устанавливает условия совершения покупок Пользователем
                (далее
                — "Покупатель") через веб-сайт Магазина.
            </Title>
            <Typography>
                <Title level={2}>
                    1. Принятие условий соглашения
                </Title>
                <Typography>
                    1.1. Пользование Магазином подразумевает полное и безоговорочное принятие Покупателем условий
                    настоящего Соглашения.
                </Typography>

                <Title level={2}>
                    2. Регистрация и учетные данные
                </Title>
                <Typography>
                    2.1. Для совершения покупок в Магазине Покупатель обязуется предоставить достоверные данные при
                    регистрации.
                </Typography>
                <Typography>
                    2.2. Покупатель несет ответственность за сохранность своих учетных данных и информации о личном
                    кабинете.
                </Typography>

                <Title level={2}>
                    3. Заказ товаров
                </Title>
                <Typography>
                    3.1. Покупатель осуществляет заказ товаров, выбрав их из представленного ассортимента на веб-сайте
                    Магазина.
                </Typography>
                <Typography>
                    3.2. Подтверждение заказа считается завершенным после оплаты товаров в соответствии с условиями,
                    установленными Магазином.
                </Typography>

                <Title level={2}>
                    4. Оплата и цены
                </Title>
                <Typography>
                    4.1. Цены на товары указаны на веб-сайте Магазина и могут подвергаться изменениям. </Typography>
                <Typography>
                    4.2. Оплата товаров осуществляется в соответствии с выбранным Покупателем способом, доступным на
                    веб-сайте.
                </Typography>

                <Title level={2}>
                    5. Доставка
                </Title>
                <Typography>
                    5.1. Информация о сроках и стоимости доставки предоставляется на веб-сайте Магазина.
                </Typography>
                <Typography>
                    5.2. Магазин несет ответственность за сохранность товаров в процессе доставки до момента их передачи
                    Покупателю.
                </Typography>

                <Title level={2}>
                    6. Возврат и обмен товаров
                </Title>
                <Typography>
                    6.1. Политика возврата и обмена регулируется условиями, установленными Магазином и доступными на
                    веб-сайте.
                </Typography>

                <Title level={2}>
                    7. Ответственность сторон
                </Title>
                <Typography>
                    7.1. Магазин не несет ответственность за прямой или косвенный ущерб, вызванный использованием или
                    невозможностью использования веб-сайта или товаров Магазина.
                </Typography>

                <Title level={2}>
                    8. Конфиденциальность
                </Title>
                <Typography>
                    8.1. Магазин обязуется соблюдать конфиденциальность персональных данных Покупателя в соответствии с
                    действующим законодательством.
                </Typography>

                <Title level={2}>
                    9. Заключительные положения
                </Title>
                <Typography>
                    9.1. Настоящее Соглашение может быть изменено Магазином без уведомления Покупателя.
                </Typography>
                <Typography>
                    9.2. Любые споры и разногласия, возникающие из настоящего Соглашения, разрешаются путем переговоров.
                </Typography>

            </Typography>

            <Title level={5}>
                Продолжая использование веб-сайта Магазина, Покупатель подтверждает свое согласие с условиями настоящего
                Соглашения.
            </Title>
        </Modal>
    );
};

export default AgreementModal;