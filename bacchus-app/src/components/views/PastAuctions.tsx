import React, { useEffect, useState } from "react";
import { IProduct } from "../../domain/IProduct";
import { IBid } from "../../domain/IBid";

interface IState {
    pastAuctions: Map<IProduct, IBid[]>;
    keys: IProduct[];
}
const PastAuctions = () => {
    /*Sets up the state*/
    const [state, setState] = useState({ pastAuctions: new Map(), keys: [] } as IState);
    /*Loads the state with data*/
    const data = () => setState({ ...state, pastAuctions: getPastAuctions() });

    /*Gets all the past auctions from the localstorage and it's bids*/
    function getPastAuctions(): Map<IProduct, IBid[]> {
        var pastAuctions: Map<IProduct, IBid[]> = new Map();
        var products: IProduct[] = [];
        if (localStorage.getItem("auctions")) {
            products = JSON.parse(localStorage.getItem("auctions")!);
        }
        products.forEach(product => {
            if (Date.parse(product.biddingEndDate) - new Date().getTime() < 0) {
                var bids: IBid[] = [];
                if (localStorage.getItem(product.productId)) {
                    bids = JSON.parse(localStorage.getItem(product.productId)!);
                }
                pastAuctions.set(product, bids);
                state.keys.push(product)
            }
        })
        state.keys.sort(function (a, b) { return Date.parse(b.biddingEndDate) - Date.parse(a.biddingEndDate); })
        return pastAuctions;
    }

    useEffect(() => {
        data();
    }, []);

    return (
        <table>
            {state.keys.map(product => (
                <table key={product.productId} className="table">
                    <thead className="thead-primary">
                        <tr className="table-primary">
                            <th scope="col">{product.productName}</th>
                            <th colSpan={2} scope="col" className="align-right">End date: {product.biddingEndDate}</th>
                        </tr>
                    </thead>
                    <thead className="thead-primary">
                        <tr className="table-secondary">
                            <th scope="col">Biddor</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date bid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.pastAuctions.get(product)?.sort(function (a, b) { return b.bid - a.bid; }).map(bid => (
                            <tr key={bid.bidDate + bid.bidderName}>
                                <td>{bid.bidderName}</td>
                                <td>{bid.bid}$</td>
                                <td>{bid.bidDate}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td> 
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </table>
    );
};


export default PastAuctions;