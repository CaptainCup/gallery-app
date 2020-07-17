/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types'


function Pagination(props) {

    // Массив pages для отображения номеров страниц в Pagination
    let pages=[]
    // Если страница первая, то номера страниц будут 1, 2, 3
    if (props.page === 1) {pages = [1, 2, 3]}
    // Если нет, то номера страниц высчитываются по простой формуле
    else {pages = [props.page-1, props.page, props.page+1]}

    // Нажатие на элементы page-link меняют состояние page родительского элемента MainScreen
    return (
        <nav className='bottom-pagination'>
            <ul className="pagination m-0">
                <li className="page-item"><a className="page-link" href="#" onClick={()=>props.changePage(pages[0])}>Previous</a></li>
                <li className="page-item"><a className="page-link" href="#" onClick={()=>props.changePage(pages[0])}>{pages[0]}</a></li>
                <li className="page-item"><a className="page-link" href="#" onClick={()=>props.changePage(pages[1])}>{pages[1]}</a></li>
                <li className="page-item"><a className="page-link" href="#" onClick={()=>props.changePage(pages[2])}>{pages[2]}</a></li>
                <li className="page-item"><a className="page-link" href="#" onClick={()=>props.changePage(pages[2])}>Next</a></li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
}

export default Pagination;