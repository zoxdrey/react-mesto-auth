import ErrorImage from "../images/error.png";
import SuccessImage from "../images/success.png";

export const InfoTooltip = ({isOpen, onClose, isRegistrationSuccess}) => {
    const isPopupOpen = isOpen ? 'popup_opened' : ''
    return (
        <div className={`popup ${isPopupOpen} `}>
            <div className="popup__container">
                <button
                    aria-label="Close"
                    className={`popup__close-icon`}
                    type="button"
                    onClick={onClose}
                />
                <form className={`popup__form info-tooltip`} name={`info-form`} noValidate>
                    <img src={isRegistrationSuccess ? SuccessImage : ErrorImage} className="info-tooltip__image"
                         alt="image"/>
                    <h2 className="info-tooltip__title">{isRegistrationSuccess ?
                        "Вы успешно зарегистрировались" :
                        "Что-то пошло не так\n Попробуйте еще раз."
                    }</h2>
                </form>
            </div>
        </div>
    )
}