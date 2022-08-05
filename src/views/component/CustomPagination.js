import {Pagination, PaginationItem, PaginationLink} from 'reactstrap'
import {ChevronLeft, ChevronRight} from 'react-feather'

const CustomPagination = ({count, current, perPage, searchFunc}) => {
    const search = (pageNum) => {
        searchFunc(pageNum)
    }
    return (
        <div className='d-flex d-flex justify-content-between flex-wrap align-items-center align-self-center mx-0 '>
            <div className=' align-items-center flex-fill mb-1 '>
                <span>تعداد</span>
                <span className='ps-1'>{((current - 1) * perPage) + 1}</span>
                <span>-</span>
                <span className='pe-1'>{Math.min(current * perPage, count)}</span>
                <span>از</span>
                <span className='px-1'> {count}</span>
                <span>مورد</span>
            </div>
            <div className='align-items-center justify-content-center order-sm-0'>
                <Pagination className=''>
                    {current !== 1 &&
                        <PaginationItem>
                            <PaginationLink href='#' onClick={() => searchFunc(current - 1)}>
                                <ChevronLeft size={15}/>
                            </PaginationLink>
                        </PaginationItem>
                    }
                    {current !== 1 &&
                        <PaginationItem>
                            <PaginationLink href='#'
                                            onClick={() => searchFunc(current - 1)}>{current - 1}
                            </PaginationLink>
                        </PaginationItem>
                    }
                    <PaginationItem active>
                        <PaginationLink href='#'>{current}</PaginationLink>
                    </PaginationItem>
                    {current !== Math.ceil(count / perPage) &&
                        <PaginationItem>
                            <PaginationLink href='#'
                                            onClick={() => searchFunc(current + 1)}>{current + 1}</PaginationLink>
                        </PaginationItem>
                    }
                    {current !== Math.ceil(count / perPage) &&
                        <PaginationItem>
                            <PaginationLink href='#'
                                            onClick={() => search(current + 1)}>
                                <ChevronRight size={15}/>
                            </PaginationLink>
                        </PaginationItem>
                    }
                </Pagination>
            </div>
        </div>
    )
}

export default CustomPagination
