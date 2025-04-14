const NotFoundPage = () =>{
    return (
        <div className="resultNotFound padding-y margin-y fadeIn">
            <strong className="fs-20 pb-2">Sorry! No results found for your selected search criteria.</strong>
            <span className="block text-secondary fs-16">Please check for another date or search criteria and try again.</span>
        </div>
    )
}

export {NotFoundPage}