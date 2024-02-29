import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CartProduct(props) {

   const [plus, setPlus] = useState(true)
   const [minus, setMinus] = useState(true)
   const [load, setLoad] = useState(false)
   async function update(sign) {
      if (sign == 'plus') {
         setPlus(false)
         await props.updateCount(props.prod.product._id, props.prod.count + 1)
         setPlus(true)
      }
      else {
         setMinus(false)
         await props.updateCount(props.prod.product._id, props.prod.count - 1)
         setMinus(true)
      }
   }

   async function remove(ID) {
      setLoad(true)
      await props.removeCartProduct(ID)
      setLoad(false)
   }

   if (load) return <div className='text-center my-5'><i className='fa fa-spin fa-spinner text-main fa-3x'></i></div>

   return (
      <div className="row align-items-center border-bottom">
         <Link to={'/products/' + props.prod.product._id} className="col-md-2 text-center">
            <img src={props.prod.product.imageCover} className='w-75' alt="" />
         </Link>
         <div className="col-md-7 fw-normal">
            <div>
               <p className='my-2'>{props.prod.product.title}</p>
               <p className='my-2 text-main'>{props.prod.price} EGP</p>
               <button className='btn p-0 my-1 cartTrash border-0' onClick={() => remove(props.prod.product._id)}>
                  <i className="fa-regular fa-trash-can text-main"></i> Remove
               </button>
            </div>
         </div>
         <div className="col-md-3 text-center mb-3">
            <button disabled={props.prod.count <= 1 || !minus || !plus} className='btn cartUpdate p-1 px-2' onClick={() => update('minus')}>
               {
                  minus ? <i className="fa-solid fa-minus"></i> : <i className='fa fa-spin fa-spinner'></i>
               }
            </button>
            <span className='d-inline-block mx-3 fw-normal'>{props.prod.count}</span>
            <button disabled={!plus || !minus} className='btn cartUpdate p-1 px-2' onClick={() => update('plus')}>
               {
                  plus ? <i className="fa-solid fa-plus"></i> : <i className='fa fa-spin fa-spinner'></i>
               }
            </button>
         </div>
      </div>
   )
}
