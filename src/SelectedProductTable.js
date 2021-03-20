import SelectedProductRow from "./SelectedProductRow"

const SelectedProductTable = ({stocks, selectedProducts, setSelectedProducts}) => {
    return (
        <ul>
            {
                selectedProducts.map(selectedProduct => (
                    <li key={selectedProduct.id}>
                        <SelectedProductRow stocks={stocks} setSelectedProducts={setSelectedProducts} product={selectedProduct} />
                    </li>
                ))
            }
        </ul>
    )
}

export default SelectedProductTable
