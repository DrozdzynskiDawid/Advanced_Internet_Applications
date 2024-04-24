import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function SearchSort(props) {
    const handleChange = () => {
        const value = document.getElementById("sortSelect").value;
        props.sortItems(value);
    }

    const searchItems = () => {
        const searchQuery = document.getElementById("search").value;
        props.searchItems(searchQuery);
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                        placeholder="Search"
                        aria-label="Search"
                        id="search"
                />
                <Button className="me-5" variant="primary" id="searchButton" onClick={searchItems}>
                    <img src="/img/search.svg"></img>
                </Button>
                <Form.Select id="sortSelect" onChange={handleChange}>
                    <option value="0">Sort By</option>
                    <option value="ratingDesc">Rating &darr;</option>
                    <option value="ratingAsc">Rating &uarr;</option>
                    <option value="nameDesc">Name &darr;</option>
                    <option value="nameAsc">Name &uarr;</option>
                </Form.Select>
            </InputGroup>
        </div>
    )
}