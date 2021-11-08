

function SearchBar() {
    return(
        <form method="get">
            <label htmlFor="company-search">
                <span className="company-search" style={{color:"red", fontWeight: "bold"}}>Comapny name: </span>
            </label>
            
            <input
                type="text"
                id="company-search"
                placeholder="Search company"
                style={{
                    borderRadius: 5
                }}
            />
            
            <button type="submit" style={{
                margin: 10,
                borderRadius: 5
            }}>Search</button>

        </form>
    )
}

export default SearchBar;