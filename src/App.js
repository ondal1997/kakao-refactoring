import { useState, useEffect } from "react";
import { getOptions, getStocks, getSubOptions } from "./api";
import OptionSelector from "./OptionSelector";

const stocks = {}

// TODO : subOptions 캐시하기
const App = ({ itemName, basicPrice }) => {
  const [options, setOptions] = useState([])
  const [subOptions, setSubOptions] = useState([])

  // TODO : effect에 대해 공부하기
  useEffect(() => {
    (async () => {
      const newOptions = await getOptions()
      setOptions(newOptions)
    })()
  }, [])

  const handleSelectOption = async (optionId) => {
    const newSubOptions = await getSubOptions(optionId)
    setSubOptions(newSubOptions)

    const newStocks = await getStocks(newSubOptions)
    Object.assign(stocks, newStocks)
  }

  const handleSelectSubOption = (subOptionId) => {
    console.log(stocks[subOptionId])
  }

  return (
    <div className='App'>
      <h1>카카오 인형가게</h1>

      <h2>{itemName}</h2>
      {basicPrice + '원~'}

      <h3>상품 옵션</h3>
      <OptionSelector options={options} handleSelectOption={handleSelectOption} />
      <OptionSelector options={subOptions} handleSelectOption={handleSelectSubOption} />

      <h3>주문 목록</h3>
    </div>
  )
}

export default App;
