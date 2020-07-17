import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './nav';
import Gallery from './gallery';
import GalleryFavorite from './gallery-favorite';
import GalleryDeleted from './gallery-deleted';
import FullscreenPicture from './fullscreen-picture';
import Tutorial from './tutorial'

//Для сохранения данных в веб-приложении используется localStorage
//Для сохранения состояния фотографий (что они в избранном, удаленном, их фильтры)
let storedGalleryStart = [];
if (localStorage.getItem('storedGallery')) {storedGalleryStart = JSON.parse(localStorage.getItem('storedGallery'))};
//Для сохранения состояния первичного обучения
let startTutorial = false;
if (localStorage.getItem('tutorial')) {startTutorial = true}
//Для сохранения количества столбцов
let startColumns = 3;
if (localStorage.getItem('columns')) {startColumns = Number(localStorage.getItem('columns'))}

export default function MainScreen() {
    //Состояние, отображающее загруженные с сервера фотографии
    let [pictures, setPictures] = React.useState([]);
    //Состояние, отображающее сохраненные фотографии на локальном устройстве
    let [storedGallery, setStoredGallery] = React.useState(storedGalleryStart);
    //Состояние, отображающее количество столбцов
    let [galleryColumns, setGalleryColumns] = React.useState(startColumns);
    //Состояние, отображающее режим полноэкранного просмотра для фотографии
    let [fullscreen, setFullscreen] = React.useState(false);
    //Состояние, отображающее текущую страницу в Галерее
    let [page, setPage] = React.useState(1);
    //Состояние, отображающее статус первичного обучения
    let [tutorial, setTutorial] = React.useState(startTutorial);

    //Загрузка новых фотографий с сервера происходит при изменении состояния Page
    useEffect(() => {
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`)
            .then(response => response.json())
            //Выполняется поиск среди сохраненных фотографий среди загруженных и, если такое фото нашлось в локальном хранилище,
            //то его состояние передается в Pictures, если нет - то у загруженной фотографии будет начальное состояние 
            .then(pictures => setPictures(pictures.map((item) => {if (storedGallery.find(storedItem => item.id === storedItem.id)) 
                                                                    {return storedGallery.find(storedItem => item.id === storedItem.id)}  
                                                                    else {return {...item, 
                                                                            favorite: false, 
                                                                            deleted: false, 
                                                                            blur: false, 
                                                                            grayscale: false, 
                                                                            sepia: false, 
                                                                            brightness: false, 
                                                                            contrast: false,
                                                                            saturate: false,
                                                                            hue: false,
                                                                            invert: false
            }}})))
    }, [page]);

    //Сохранение параметров, хранящихся локально, происходит при изменении данного параметра
    useEffect(()=>localStorage.setItem('storedGallery', JSON.stringify(storedGallery)), [storedGallery]);
    useEffect(()=>localStorage.setItem('tutorial', tutorial), [tutorial]);
    useEffect(()=>localStorage.setItem('columns', galleryColumns), [galleryColumns]);

    //Функция-обертка для смены страницы
    function changePage(toPage) {
        if (page !== toPage) { setPage(toPage) }
    }

    //Функция для изменения свойств фотографии, id - номер фотографии, prop - изменемое свойство
    function addProperty(id, prop) {
        //Если фотография отображается в текущей Галерее, то состояние этой фотографии в Галерее меняется
        setPictures(pictures.map((item) => {if (item.id === id) {return {...item, [prop]: !item[prop]}} else {return item}}));
        //Ищем, есть ли такая фотография в сохраненных, если нет - меняем свойство и добавляем, если есть - просто меняем свойство
        if (!storedGallery.find(item => item.id === id)) {
            let newItem = pictures.find(item => item.id === id);
            newItem[prop] = !newItem[prop];
            storedGallery.push(newItem);
            setStoredGallery(storedGallery);
        } else {
            setStoredGallery(storedGallery.map(item => {if (item.id === id) {return {...item, [prop]: !item[prop]}} else {return item}}));
        }
    }
  
    //Функция для смены состояния Fullscreen и показа выбранной по id фотографии
    //Для того, чтобы можно было отображать как загруженные, так и уже сохраненные фотографии, 
    //просто сохраняем отображаемую фотографию (если она не была до этого сохранена)
    //и в качестве передаваемого props передаем элемент из сохраненного массива фотографий 
    function showFullPicture(id) {    
        if (id) {
            if (!storedGallery.find(item => item.id === id)) {
                let newItem = pictures.find(item => item.id === id);
                storedGallery.push(newItem);
                setStoredGallery(storedGallery);
            }
        }
        setFullscreen(id);
    }

    //Так как в Route Component нельзя передавать props создается компонент-обертка для Route-компонентов
    function WrappedGallery() {
        return (
            <Gallery 
                pictures={pictures.filter((item) => (!item.deleted))}
                galleryColumns={galleryColumns} 
                addProperty={addProperty}
                showFullPicture={showFullPicture}
                page={page}
                changePage={changePage}
            />
        )
    }

    function WrappedGalleryFavorite() {
        return (
            <GalleryFavorite 
                pictures={storedGallery.filter((item) => ((item.favorite) && (!item.deleted)))}
                galleryColumns={galleryColumns}
                addProperty={addProperty}
                showFullPicture={showFullPicture}
            />
        )
    }

    function WrappedGalleryDeleted() {
        return (
            <GalleryDeleted 
                pictures={storedGallery.filter((item) => (item.deleted))}
                galleryColumns={galleryColumns}
                addProperty={addProperty}
                showFullPicture={showFullPicture}
            />
        )
    }

    //Tutorial и Fullscreen отображаются только при необходимости
    return(
        <BrowserRouter>
            <div>
                {!tutorial && <Tutorial setTutorial={setTutorial} />}
                {fullscreen && <FullscreenPicture  
                                    picture = {storedGallery.find(item => item.id === fullscreen)} 
                                    addProperty={addProperty}
                                    showFullPicture={showFullPicture}
                                />}
                <Nav setGalleryColumns={setGalleryColumns} tutorial={tutorial} />
                <Switch>
                    <Route path={'/'} exact component={WrappedGallery} />
                    <Route path={'/favorites'} exact component={WrappedGalleryFavorite} />
                    <Route path={'/deleted'} exact component={WrappedGalleryDeleted} />
                </Switch>
            </div>
        </BrowserRouter>
    ) 
}

