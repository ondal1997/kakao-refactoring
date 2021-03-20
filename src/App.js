import { useState, useEffect } from "react";
import { fetchOptions, fetchStocks, fetchSubOptions } from "./api";
import OptionSelector from "./OptionSelector";
import SelectedProductTable from "./SelectedProductTable";

const requestedOptionIds = []

const App = ({ productName, basicPrice }) => {
  const [options, setOptions] = useState([])
  const [subOptions, setSubOptions] = useState([])
  const [stocks, setStocks] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState('')
  const [loadedOptionIds, setLoadedOptionIds] = useState([])

  // TODO: effect에 대해 공부하기
  useEffect(() => {
    (async () => {
      const fetchedOptions = await fetchOptions()
      setOptions(fetchedOptions)
      setIsLoaded(true)
    })()
  }, [])

  // 인자 optionId의 무결성이 보장되는 상태
  const handleSelectOption = async (optionId) => {
    setSelectedOptionId(optionId)

    // 중복 요청 방지
    if (requestedOptionIds.includes(optionId)) {
      return
    }
    requestedOptionIds.push(optionId)

    const fetchedSubOptions = await fetchSubOptions(optionId)
    setSubOptions((currentSubOptions) => [...currentSubOptions, ...fetchedSubOptions])
    setLoadedOptionIds((currentLoadedOptionIds) => [...currentLoadedOptionIds, optionId])

    const fetchedStocks = await fetchStocks(fetchedSubOptions)
    setStocks((currentStocks) => { return { ...currentStocks, ...fetchedStocks } })
  }

  // 인자 subOptionId의 무결성이 보장되는 상태
  const handleSelectSubOption = (subOptionId) => {
    if (!stocks[subOptionId]) {
      alert('아직 재고 정보를 불러오지 못했습니다')
      return
    }

    if (stocks[subOptionId].stock < 1) {
      alert('재고가 없습니다')
      return
    }

    if (selectedProducts.some(({ id }) => id === subOptionId)) {
      alert('이미 선택된 상품입니다')
      return
    }

    const selectedProduct = {
      id: subOptionId,
      quantity: 1
    }

    setSelectedProducts((currentSelectedProducts) => [...currentSelectedProducts, selectedProduct])
  }

  let totalPrice = 0

  selectedProducts.forEach(selectedProduct => {
    totalPrice += (basicPrice + stocks[selectedProduct.id].optionPrice) * selectedProduct.quantity
  });

  return (
    <div className='App'>
      <h1>카카오 인형가게</h1>

      <h2>{productName}</h2>
      {`${basicPrice}원~`}

      <h3>상품 옵션</h3>
      {
        isLoaded ? (
          <OptionSelector options={options} handleSelectOption={handleSelectOption} />
        ) : (
          <span>Loading...</span>
        )
      }
      {
        selectedOptionId && (
          loadedOptionIds.includes(selectedOptionId) ? (
            <OptionSelector options={subOptions.filter(({ parentOptionId }) => parentOptionId === selectedOptionId)} handleSelectOption={handleSelectSubOption} />
          ) : (
            <span>Loading...</span>
          )
        )
      }

      <h3>선택된 상품</h3>
      <SelectedProductTable stocks={stocks} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />

      <h3>총 가격</h3>
      {`${totalPrice}원`}

      <div>
        <button>주문하기</button>
      </div>
    </div>
  )
}

export default App;
