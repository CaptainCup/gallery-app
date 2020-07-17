import React from 'react';
import PropTypes from 'prop-types'


function PictureInfo(props) {

    // В зависимости от свойства favorite фотографии будет отображаться соотвествующая иконка (заполенная или нет)
    // нажатие на иконку меняет соответствующее ей своство у фотографии
    let favoriteIco = props.picture.favorite ? 
        (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="#007bff" xmlns="http://www.w3.org/2000/svg" onClick={() =>props.addProperty(props.picture.id, 'favorite')}>
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
        )
        :
        (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart" fill="#007bff" xmlns="http://www.w3.org/2000/svg" onClick={() =>props.addProperty(props.picture.id, 'favorite')}>
            <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
        );
    
    // В зависимости от свойства deleted фотографии будет отображаться соотвествующая иконка (заполенная или нет)
    // нажатие на иконку меняет соответствующее ей своство у фотографии
    let deletedIco = props.picture.deleted ? 
        (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="#007bff" xmlns="http://www.w3.org/2000/svg" onClick={() =>props.addProperty(props.picture.id, 'deleted')}>
            <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
        </svg>
        )
        :
        (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="#007bff" xmlns="http://www.w3.org/2000/svg" onClick={() =>props.addProperty(props.picture.id, 'deleted')}>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        );

    // Данный компонент необходим для отображения информации в компоненте Fullscreen
    return (
        <React.Fragment>
        <div className="picture-text-grid">
            <span className="picture-text">ID:</span>
            <span className="picture-text">{props.picture.id}</span>
            <span className="picture-text">Автор:</span>
            <span className="picture-text">{props.picture.author}</span>
            <span className="picture-text">Ширина:</span>
            <span className="picture-text">{props.picture.width + 'px'}</span>
            <span className="picture-text">Высота:</span>
            <span className="picture-text">{props.picture.height + 'px'}</span>
            <a className="picture-href" rel="noopener noreferrer" target="_blank" href={props.picture.download_url}>Ссылка на фото</a>
        </div>
        <div className="picture-buttons">
            {favoriteIco}
            {deletedIco}
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-sliders" fill="#007bff" xmlns="http://www.w3.org/2000/svg" onClick={props.openFilters}>
                <path fillRule="evenodd" d="M14 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM11.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM7 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM4.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9.5 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM11.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                <path fillRule="evenodd" d="M9.5 4H0V3h9.5v1zM16 4h-2.5V3H16v1zM9.5 14H0v-1h9.5v1zm6.5 0h-2.5v-1H16v1zM6.5 9H16V8H6.5v1zM0 9h2.5V8H0v1z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-fullscreen-exit" fill="#007bff" xmlns="http://www.w3.org/2000/svg" onClick={props.showFullPicture}>
                <path fillRule="evenodd" d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
            </svg>
        </div>
        </React.Fragment>
    )
}

PictureInfo.propTypes = {
    picture: PropTypes.object.isRequired,
    addProperty: PropTypes.func,
    openFilters: PropTypes.func,
    showFullPicture: PropTypes.func,
}

export default PictureInfo;