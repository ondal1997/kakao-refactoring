import { useState, useEffect } from "react";
import OptionSelector from "./OptionSelector";

const stocks = {}

// TODO : subOptions 캐시하기
const App = ({ itemName, basicPrice }) => {
  const [options, setOptions] = useState([])
  const [subOptions, setSubOptions] = useState([])

  // TODO : effect에 대해 공부하기
  useEffect(async () => {
    try {
      const res = await fetch(`https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options`)
      const _options = await res.json()

      // 권장되지 않는 구문
      setOptions(_options)
    }
    catch (error) {
      console.error(error)
    }
  }, [])

  const handleSelectOption = async (optionId) => {
    try {
      const res = await fetch(`https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options/${optionId}`)
      const _subOptions = await res.json()

      const res2 = await fetch(`https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/stocks/${_subOptions.map(subOption => subOption.id).join(',')}`)
      const _stocks = await res2.json()

      Object.assign(stocks, _stocks)

      // 권장되지 않는 구문
      setSubOptions(_subOptions)
    }
    catch (error) {
      console.error(error)
    }
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
