const getOptions = async () => {
    try {
        const res = await fetch(`https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options`)
        const options = await res.json()
        return options
    }
    catch (error) {
        console.error(error)
    }
}

const getSubOptions = async (optionId) => {
    try {
        const res = await fetch(`https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options/${optionId}`)
        const subOptions = await res.json()
        return subOptions
    }
    catch (error) {
        console.error(error)
    }
}

const getStocks = async (subOptions) => {
    try {
        const res = await fetch(`https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/stocks/${subOptions.map(subOption => subOption.id).join(',')}`)
        const stocks = await res.json()
        return stocks
    }
    catch (error) {
        console.error(error)
    }
}

export { getOptions, getSubOptions, getStocks }
