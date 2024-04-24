import Rating from 'react-rating';

export default function ListItem(props) {
    const handleRatingChange = (newRating) => {
        props.editRating(props.name, newRating)
    }

    const deleteItem = () => {
        const confirmed = window.confirm("Czy na pewno chcesz usunąć element?");
        if (confirmed) {
            props.deleteItem(props.name);
        }
    }

    return (
        <li className="list-group-item list-group-item-dark bg-gradient border-3 rounded text-dark my-1">
            <div className="row">
                <img className="col-md-2" src={props.img} height={80} />
                <h2 className="col-md-8">{props.name}</h2>
                <button className="btn btn-outline-secondary col-md-2 rounded-5" onClick={deleteItem}><img src="/img/delete_icon.png" alt=""/></button>
            </div>
            <br></br>
            <div className="row">
                <p className="col-md-12" style={{"overflowWrap": "break-word"}}>{props.desc}</p>
            </div>
            <Rating 
                initialRating={props.rating}
                onChange={handleRatingChange}
                emptySymbol={<img src="/img/star.svg" height={30} width={30}></img>}
                fullSymbol={<img src="/img/star-fill.svg" height={30} width={30}></img>}
            />
        </li>
    )
}