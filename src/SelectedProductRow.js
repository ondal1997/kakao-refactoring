import { useEffect, useRef } from "react"

const SelectedProductRow = ({ stocks, setSelectedProducts, product }) => {
    const inputElement = useRef(null)

    useEffect(() => {
        inputElement.current.value = product.quantity;
    })

    useEffect(() => {
        inputElement.current.addEventListener('change', (event) => {
            let newQuantity = event.target.value

            if (stocks[product.id].stock < newQuantity) {
                newQuantity = stocks[product.id].stock;
            }
            else if (newQuantity < 1) {
                newQuantity = 1
            }

            setSelectedProducts((currentSelectedProducts) => {
                const newSelectedProducts = currentSelectedProducts.slice()
                const targetProduct = newSelectedProducts.find(selectedProduct => selectedProduct.id === product.id)
                targetProduct.quantity = newQuantity
                return newSelectedProducts
            })
        });
    }, [])

    return (
        <>
            <div>
                {product.id}
            </div>
            <div>
                <input type='number' ref={inputElement}></input>
            </div>
        </>
    )
}

export default SelectedProductRow