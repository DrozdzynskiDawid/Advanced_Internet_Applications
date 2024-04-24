import React, { useState } from 'react';
import ListItem from './ListItem';
import AddForm from './AddForm';
import SearchSort from './SearchSort';

export default function AppComponent(props) {
    const [items, setItems] = useState(props.list);
    const [originalItems, setOriginalItems] = useState(props.list);

    const editRating = (name, newRating) => {
        const updated = items.find(item => item.name == name);
        updated.rating = newRating;
        setItems([...items]);
    }

    const addItem = (name, desc, img) => {
        if (!items.find(item => item.name == name)) {
            const newItem = {
                name: name,
                description: desc,
                img: img,
                rating: 0
            }
            setItems([...items, newItem]);
        }
        else {
            alert("Nazwy muszą być unikalne!");
        }
    }

    const deleteItem = (key) => {
        const updatedItems = items.filter(item => item.name !== key);
        setItems(updatedItems);
    }

    const sortItems = (sortId) => {
        switch (sortId) {
            case "ratingDesc":
                const sortedByRatingDesc = [...items].sort((a, b) => b.rating - a.rating);
                setItems(sortedByRatingDesc);
                break;
            case "ratingAsc":
                const sortedByRatingAsc = [...items].sort((a, b) => a.rating - b.rating);
                setItems(sortedByRatingAsc);
                break;
            case "nameDesc":
                const sortedByNameDesc = [...items].sort((a, b) => b.name.localeCompare(a.name));
                setItems(sortedByNameDesc);
                break;
            case "nameAsc":
                const sortedByNameAsc = [...items].sort((a, b) => a.name.localeCompare(b.name));
                setItems(sortedByNameAsc);
                break;
            default: 
                setItems(props.list);
                break;
        }
    }

    const searchItems = (searchQuery) => {
        if (searchQuery != "") {
            setOriginalItems(items);
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setItems(filteredItems);
        }
        else {
            setItems(originalItems);
        }
    }

    return (
        <div>
            <AddForm 
                addItem={addItem}
            />
            <SearchSort
                sortItems={sortItems}
                searchItems={searchItems}
            />
            <ul className="list-group col-md-12 my-3">
                {items.map(item =>
                    <ListItem 
                        name={item.name} 
                        key={item.name} 
                        desc={item.description} 
                        rating={item.rating} 
                        img={item.img} 
                        deleteItem={deleteItem}
                        editRating={editRating}
                    />
                )}
            </ul>
        </div>
    )
}