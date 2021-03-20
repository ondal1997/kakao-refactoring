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
                {`${product.option.optionName} ${product.subOption.optionName} (+${stocks[product.id].optionPrice}원)`}
            </div>
            <div>
                <input type='number' ref={inputElement}></input>
                <button onClick={() => {
                    setSelectedProducts((currentSelectedProducts) => {
                        const newSelectedProducts = currentSelectedProducts.slice()
                        const targetProductIndex = newSelectedProducts.findIndex(selectedProduct => selectedProduct.id === product.id)
                        newSelectedProducts.splice(targetProductIndex, 1)
                        return newSelectedProducts
                    })
                }}>X</button>
            </div>
        </>
    )
}

export default SelectedProductRow