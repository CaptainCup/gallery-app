import React from 'react';
import Masonry from 'react-masonry-css';
import Picture from './picture'
import Pagination from './pagination'
import PropTypes from 'prop-types'


// Для разбивания массива фотографий на колонки используется библиотека Masonry
// Массив фотографий преобразуется в компоненты Picture
// Компонент Pagination выполняет отображение текущей страницы и её смену
function Gallery(props) {
    return(
        <React.Fragment>
        <Masonry
            breakpointCols={props.galleryColumns}
            className="gallery"
            columnClassName="gallery__col">
                {
                    props.pictures.map((item) => {return (
                                                    <Picture 
                                                        key={item.id}
                                                        picture={item}
                                                        addProperty={props.addProperty}
                                                        showFullPicture={() => props.showFullPicture(item.id)}
                                                    />   
                    )})
                }
        </Masonry>
        <Pagination page={props.page} changePage={props.changePage} />
        </React.Fragment>
    )
}

Gallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
    galleryColumns: PropTypes.number.isRequired,
    addProperty: PropTypes.func,
    showFullPicture: PropTypes.func,
    page: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
}

export default Gallery;