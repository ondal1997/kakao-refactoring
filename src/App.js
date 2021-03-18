import { useState, useEffect } from "react";
import { getOptions, getStocks, getSubOptions } from "./api";
import OptionSelector from "./OptionSelector";

// TODO: api 예외 처리 빼내기, api 이름 변경하기
// TODO: subOptions 캐시하기
const App = ({ itemName, basicPrice }) => {
  const [options, setOptions] = useState([])
  const [subOptions, setSubOptions] = useState([])
  const [stocks, setStocks] = useState({})
  const [selectedItems, setSelectedItems] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [requestedOptionIds, setRequestedOptionIds] = useState([])
  const [selectedOptionId, setSelectedOptionId] = useState(null)

  // TODO: effect에 대해 공부하기
  useEffect(() => {
    (async () => {
      const options = await getOptions()
      setOptions((state) => [...state, ...options])
      setIsLoaded(true)
    })()
  }, [])

  const handleSelectOption = async (optionId) => {
    setSelectedOptionId(optionId)

    if (requestedOptionIds.includes(optionId)) {
      return
    }
    setRequestedOptionIds((state) => [...state, optionId])

    const subOptions = await getSubOptions(optionId)
    setSubOptions((state) => [...state, ...subOptions])

    const stocks = await getStocks(subOptions)
    setStocks((state) => { return { ...state, ...stocks } })
  }

  const handleSelectSubOption = (subOptionId) => {
    if (!stocks[subOptionId]) {
      alert('아직 재고 정보를 불러오지 못했습니다')
      return
    }

    if (stocks[subOptionId].stock < 1) {
      alert('재고가 없습니다')
      return
    }

    if (selectedItems.some(({ id }) => id === subOptionId)) {
      alert('이미 선택된 상품입니다')
      return
    }

    const selectedItem = {
      id: subOptionId,
      size: 1
    }

    setSelectedItems((state) => [...state, selectedItem])
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='App'>
      <h1>카카오 인형가게</h1>

      <h2>{itemName}</h2>
      {basicPrice + '원~'}

      <h3>상품 옵션</h3>
      <OptionSelector options={options} handleSelectOption={handleSelectOption} />
      <OptionSelector options={subOptions.filter(({ parentOptionId }) => parentOptionId === selectedOptionId)} handleSelectOption={handleSelectSubOption} />

      <h3>선택된 상품</h3>
      <ul>
        {selectedItems.map(selectedItem => {
          const subOption = subOptions.find(({ id }) => id === selectedItem.id)
          const option = options.find(({ id }) => id === subOption.parentOptionId)

          return (
            <li key={selectedItem.id}>
              <div>
                {`${option.optionName} ${subOption.optionName} (+${stocks[selectedItem.id].optionPrice}원)`}
              </div>
              <div>
                <input value={selectedItem.size}></input>
                <button>-</button>
                <button>+</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App;
