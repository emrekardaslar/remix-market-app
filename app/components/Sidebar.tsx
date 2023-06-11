import { useLocation, useMatches, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Filter } from './Filter'
interface Props {
  items: any[]
}

function Sidebar(props: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const data = useMatches()
  const { id } = data[data.length - 1]
  const [isOpen, setIsOpen] = useState(true)
  const [isSubItemOpen, setIsSubItemOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isShowFilters, setIsShowFilters] = useState(false)

  useEffect(() => {
    if (location.pathname == '/products') {
      setIsShowFilters(false)
    }
    //Hide menu if products screen
    if (id.endsWith('$subcategory.$id')) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [location])

  const navSubCategory = (item: string, subCategory: string) => {
    navigate(`${item}/${subCategory}`)
    showFilters()
  }

  const showFilters = () => {
    setIsShowFilters(true)
  }

  const subItemsMenu = (status: boolean, category: string) => {
    if (status == true && activeCategory !== category) {
      setActiveCategory(category)
      setIsSubItemOpen(true)
    } else if (activeCategory == category) {
      setActiveCategory(null)
      setIsSubItemOpen(false)
    } else {
      setActiveCategory(category)
      setIsSubItemOpen(true)
    }
  }

  let brandList: any = []
  let products: any = []

  if (isShowFilters) {
    products = data[data.length - 1].data.products
    products?.forEach((product: any) => {
      if (!brandList.includes(product.brand) && product.brand != '') brandList.push(product.brand)
    })
  }

  return (
    <>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <ul className='menu-items'>
          {!isShowFilters &&
            props.items.map((item) => (
              <>
                <li onClick={() => subItemsMenu(!isSubItemOpen, item?.key)}>{item.label}</li>
                {isSubItemOpen && activeCategory == item?.key && (
                  <ul className='sub-items'>
                    {item?.children?.map((subCategory: any) => (
                      <li
                        onClick={() => {
                          navSubCategory(item.key, subCategory.key)
                        }}
                      >
                        {subCategory.key}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          {isShowFilters && <Filter items={data[data.length - 1].data.allBrands} />}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
