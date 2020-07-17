import React, { useState } from 'react';
import Filters from './filters'
import PictureInfo from './picture-info'
import PropTypes from 'prop-types'

function FullscreenPicture(props) {
    // Состояние, отображающее выбранное окно в FullscreenPicture (фильтры или информация)
    let [filtersOpen, setFiltersOpen] = useState(false);

    // Функция-обертка для отображения фильтров
    function openFilters() {
        setFiltersOpen(!filtersOpen);
    }

    // Для отображения действующих на фотографии фильтров используется переменная filters
    // которая принимает свое значение в виде css свойства в зависимости от действующих на фотографии фильтров
    let filters = {
        filter: ''
    };

    // Для подсвечивания кнопок с активными фильтрами используется массив classes
    // элементы которого принимают свое значение в виде классов в зависимости от действующих на фотографии фильтров
    let classes = {
        grayscale: "filters-btn btn btn-primary btn-lg",
        sepia: "filters-btn btn btn-primary btn-lg",
        blur: "filters-btn btn btn-primary btn-lg",
        brightness: "filters-btn btn btn-primary btn-lg",
        contrast: "filters-btn btn btn-primary btn-lg",
        saturate: "filters-btn btn btn-primary btn-lg",
        hue: "filters-btn btn btn-primary btn-lg",
        invert: "filters-btn btn btn-primary btn-lg",
    }

    // Проверка активности фильтра и настройки filters и classes
    if (props.picture.grayscale) {
        filters.filter+=' grayscale(1)';
        classes.grayscale = "filters-btn btn btn-primary btn-lg"
    } else {classes.grayscale = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.sepia) {
        filters.filter+=' sepia(1)';
        classes.sepia = "filters-btn btn btn-primary btn-lg"
    } else {classes.sepia = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.blur) {
        filters.filter+=' blur(1px)';
        classes.blur = "filters-btn btn btn-primary btn-lg"
    } else {classes.blur = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.brightness) {
        filters.filter+=' brightness(1.5)';
        classes.brightness = "filters-btn btn btn-primary btn-lg"
    } else {classes.brightness = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.contrast) {
        filters.filter+=' contrast(2)';
        classes.contrast = "filters-btn btn btn-primary btn-lg"
    } else {classes.contrast = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.saturate) {
        filters.filter+=' saturate(2)';
        classes.saturate = "filters-btn btn btn-primary btn-lg"
    } else {classes.saturate = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.hue) {
        filters.filter+=' hue-rotate(90deg)';
        classes.hue = "filters-btn btn btn-primary btn-lg"
    } else {classes.hue = "filters-btn btn btn-secondary btn-lg"}
    if (props.picture.invert) {
        filters.filter+=' invert(1)';
        classes.invert = "filters-btn btn btn-primary btn-lg"
    } else {classes.invert = "filters-btn btn btn-secondary btn-lg"}


    // В зависимости от состояния filtersOpen отображаются либо фильтры, 
    // либо информация о фотографии
    let showingComponent;
    showingComponent = filtersOpen ? 
    <Filters
        id={props.picture.id}
        classes={classes}
        addProperty={props.addProperty}
        openFilters={openFilters}
    /> 
    : 
    <PictureInfo
        picture={props.picture}
        addProperty={props.addProperty}
        openFilters={openFilters}
        showFullPicture={()=>props.showFullPicture(false)}
    />

    return(
        <div className="picture-banner">
            <div className="picture-placeholder">
                <img style={filters} className="picture-fullscreen" src={props.picture.download_url} alt="" />
            </div>
            <div className="picture-info">
                {showingComponent}
            </div>
        </div>
    )
}

FullscreenPicture.propTypes = {
    picture: PropTypes.object.isRequired,
    addProperty: PropTypes.func,
    showFullPicture: PropTypes.func,
}

export default FullscreenPicture;