import React from 'react';
import PropTypes from 'prop-types'


// Для выбора необходимого фильтра нужно нажать соответствующую фильтру кнопку
// Если фильтр активен, то кнопка подсвечивается
// Для этого в Filters передается props.classes
function Filters(props) {
    return (
        <div className="filters">
            <button type="button" className="filters-btn btn btn-primary btn-lg" onClick={props.openFilters}>Закрыть</button>
            <button type="button" className={props.classes.grayscale} onClick={()=>props.addProperty(props.id, 'grayscale')}>Grayscale</button>
            <button type="button" className={props.classes.sepia} onClick={()=>props.addProperty(props.id, 'sepia')}>Sepia</button>
            <button type="button" className={props.classes.blur} onClick={()=>props.addProperty(props.id, 'blur')}>Blur</button>
            <button type="button" className={props.classes.brightness} onClick={()=>props.addProperty(props.id, 'brightness')}>Brightness</button>
            <button type="button" className={props.classes.contrast} onClick={()=>props.addProperty(props.id, 'contrast')}>Contrast</button>
            <button type="button" className={props.classes.saturate} onClick={()=>props.addProperty(props.id, 'saturate')}>Saturate</button>
            <button type="button" className={props.classes.hue} onClick={()=>props.addProperty(props.id, 'hue')}>Hue-rotate</button>
            <button type="button" className={props.classes.invert} onClick={()=>props.addProperty(props.id, 'invert')}>Invert</button>
        </div>
    )
}

Filters.propTypes = {
    id: PropTypes.string.isRequired,
    classes: PropTypes.object,
    addProperty: PropTypes.func,
    openFilters: PropTypes.func,
}

export default Filters;