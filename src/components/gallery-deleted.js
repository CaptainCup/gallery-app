import React from 'react';
import Masonry from 'react-masonry-css';
import Picture from './picture'
import PropTypes from 'prop-types'


// Для разбивания массива фотографий на колонки используется библиотека Masonry
// Массив фотографий преобразуется в компоненты Picture
// Если массив фотографий пуст, то выводится сообщение
function GalleryDeleted(props) {
    if (props.pictures.length === 0) {
        return (
            <div className="empty-favorite">
                <h1>У вас пока что нет ни одного удаленного изображения</h1>
            </div>
            
        )
    }

    return(
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
    )
}

GalleryDeleted.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
    galleryColumns: PropTypes.number.isRequired,
    addProperty: PropTypes.func,
    showFullPicture: PropTypes.func,
}

export default GalleryDeleted;