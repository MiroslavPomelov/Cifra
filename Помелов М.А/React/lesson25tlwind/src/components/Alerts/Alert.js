import style from './modules/alert.module.css'

// Получаем сообщение и тип пропса
const Alert = ({ type, message }) => {

    // Используем стиль .alert для всех а стиль типа ориетируется на то, что нам передали в type/ Это бует строка с названием класса
    return (
        <div className={`${style.alert} ${style[type]}`}>
            {message}
        </div>
    )
}

export default Alert;