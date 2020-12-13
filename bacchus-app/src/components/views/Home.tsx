import React, { useEffect, useState} from "react";
import { IProduct } from "../../domain/IProduct";
import { BaseService } from "../../base/BaseService";
import { Utils } from "../Utils"
import { IBid } from "../../domain/IBid";

interface IState {
    products: IProduct[];
    filteredProducts: IProduct[];
    categories: string[];
    bid: number;
    bidderName: string;
    filter: string;
    selectedProduct?: IProduct
}

const Home = () => {
    /*Sets up the state*/
    const [state, setState] = useState({ products: [], filteredProducts: [], categories: [], bid: 0, bidderName: '', filter: '' } as IState);

    /*Main function, fills the state with data.*/
    const data = async (fil: string = '') => await BaseService
        .getEntities<IProduct>()
        .then(data => setState({ ...state, products: addData(data), categories: addCategories(data), 
            filteredProducts: filt(data, fil), selectedProduct: defaultSelected() }));

    /*Function to find all of the current categories for state.*/ 
    function addCategories(products: IProduct[]): string[] {
        var categories: string[] = [];
        products.forEach(element => {
            if (!categories.includes(element.productCategory)) {
                categories.push(element.productCategory);
            }
        });
        return categories;
    }
    /*Fills localstorage with data, used to store past auctions.*/
    function addData(products: IProduct[]): IProduct[] {
        var current: IProduct[] = [];
        if (localStorage.getItem("auctions")) {
            current = JSON.parse(localStorage.getItem("auctions")!);
        }
        products.forEach(product => {
            if (!current.some(p => p.productId === product.productId)) {
                current.push(product)
            }
        });
        localStorage.setItem("auctions", JSON.stringify(current));
        return products;
    }
     
    function defaultSelected() : IProduct{
        return {productName: '', productCategory: '', productDescription: '', productId: '', name: '', biddingEndDate: ''}
    }
    /*Updates the information for the bid in state.*/
    function update(target: EventTarget & HTMLInputElement) {
        setState({ ...state, [target.name]: target.value });
    }
    /*Adds the selcted product for the bid into the state.*/
    function select(product: IProduct){
        setState({ ...state, selectedProduct: product });
    }

    /*Adds the bid to the localstorage.*/
    function bid(product: IProduct) {
        var bids: IBid[] = [];
        if (localStorage.getItem(product.productId)) {
            bids = JSON.parse(localStorage.getItem(product.productId)!);
        }
        bids.push({ bidderName: state.bidderName, bid: state.bid, bidDate: new Date().toISOString(), productId: product.productId })
        localStorage.setItem(product.productId, JSON.stringify(bids));
        setState({ ...state, bid: 0 });
    }

    /*Filter the shown products by selected category by updating the state.*/
    function filter(target: EventTarget & HTMLSelectElement) {
        if (target.value === "All") {
            clearFilter();
        } else {
            setState({ ...state, filteredProducts: state.products.filter(product => product.productCategory === target.value), filter: target.value });
        }
    }

    /*Filters the products after auctions end and new products are loaded in.*/
    function filt(products: IProduct[], fil: string): IProduct[] {
        if (!fil) {
            return products;
        }
        return products.filter(product => product.productCategory === fil)
    }

    function clearFilter() {
        setState({ ...state, filteredProducts: state.products, filter: '' });
    }

    /*If filter is on, show a button for clearing the filter.*/
    function filterOn() {
        if (state.filter) {
            return (
                <div className="btn-group" role="group" aria-label="Third group">
                    <button type="button" className="btn btn-danger" value="All" onClick={(e) => clearFilter()}>X</button>
                </div>)
        }
        return;
    }
    /*Calculates the time remaining for current auctions. In case the auction is over, reload the page with new data.*/
    function timeRemaining(product: IProduct) {
        var current = new Date().getTime();
        var end = Date.parse(product.biddingEndDate);
        if (end - current < 0) {
            data(state.filter);
            return;
        }
        var remaining = Utils.convertToDaysHoursMinutesSeconds(end - current);
        return <h6 className="d-inline d-flex justify-content-end">Time remanining: {remaining.hours}h {remaining.minutes}m {remaining.seconds}s</h6>
    }
    
    useEffect(() => {
        data(state.filter);
    }, []);

    return (
        <div>
            <div className="dropdown">
                <select value={state.filter} onChange={(e) => filter(e.target)}>
                    <option value="All">All</option>
                    {state.categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {filterOn()}
            </div>

            <br />
            <div className="row">
                {state.filteredProducts.map(product => (
                    <div className="col-sm-6" key={product.productId}>
                        <div className="card" key={product.productId}>
                            <div className="card-body" >
                                <h5 className="card-title d-inline">{product.productName}</h5>
                                {timeRemaining(product)}
                                <p className="card-text">{product.productDescription}</p>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => select(product)}>
                                    Add your bid
                                </button>

                                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">{state.selectedProduct!.productName}</h5>
                                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" >X</button>
                                            </div>
                                            <div className="modal-body">
                                                {state.selectedProduct!.productDescription}
                                                <p></p>
                                                <h6>Enter your full name:</h6>
                                                <input className="form-control" type="text" placeholder="Enter name here..." aria-label="deafult input example"
                                                    value={state.bidderName} name="bidderName" onChange={(e) => update(e.target)}></input>
                                                <p></p>
                                                <h6>How much are you going to bid?</h6>
                                                <input className="form-control" type="number" placeholder="0.0$" aria-label="deafult input example"
                                                    value={state.bid} name="bid" onChange={(e) => update(e.target)}></input>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={() => bid(state.selectedProduct!)} data-dismiss="modal">Bid</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;