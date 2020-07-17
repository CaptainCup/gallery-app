import React from 'react';
import PropTypes from 'prop-types';


//Компонент для первичного обучения пользователя, заключающееся в том, чтобы показать ему наличие компонента Nav
// При нажатии на button обучение завершается и при повторном использовании Gallery-App показываться не будет
function TutorialBanner(props) {
    return (
        <div className="tutorial-banner">
            <div className="tutorial-div">
                <span className="tutorial-span">Используйте данную кнопку для перемещения между различными категориями фотографий и настройки количества колонок на странице</span>
                <button type="button" className="btn btn-primary btn-lg" onClick={()=>props.setTutorial(true)}>Понятно</button>
            </div>
        </div>
    )
}

TutorialBanner.propTypes = {
    setTutorial: PropTypes.func,
}

export default TutorialBanner;