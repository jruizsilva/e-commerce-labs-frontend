import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetail } from '../../actions/index.js'
import { useNavigate } from 'react-router-dom'
import style from './Chat.module.css'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore/lite'
import {
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  orderBy
} from 'firebase/firestore'
import { useParams } from 'react-router-dom'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'e-commerce-labs-frontend.firebaseapp.com',
  projectId: 'e-commerce-labs-frontend',
  storageBucket: 'e-commerce-labs-frontend.appspot.com',
  messagingSenderId: '1095595623237',
  appId: '1:1095595623237:web:0aec9b9fc6afaac371342c',
  measurementId: 'G-CKLM7EC2TR'
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

function escrolear() {
  const scroll = document.querySelector('.scroll')
  scroll.scrollTop = scroll.scrollHeight
}

const Chat = () => {
  const [txt, setTxt] = useState('')
  const [mesagges, setMesagges] = useState([])
  const { user, orderDetail } = useSelector((state) => state)
  let { orderId } = useParams()
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderDetail(orderId))
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (orderDetail.dataValues) {
      let fecha = new Date()
      const chatRef = collection(db, 'chats')
      let id_user_get
      if (user.id == orderDetail.order.userId) {
        id_user_get = orderDetail.product.userId
      } else {
        id_user_get = orderDetail.order.userId
      }
      await setDoc(doc(chatRef), {
        id_user_send: user.id,
        id_user_get,
        id_order: orderId,
        date: fecha,
        text: txt
      })
      setTxt('')
    }
  }

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('id_order', '==', orderId),
      orderBy('date', 'asc')
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = []
      querySnapshot.forEach((doc) => {
        chats.push(doc.data())
      })
      setMesagges(chats)
    })
  }, [])

  let navigate = useNavigate()
  useEffect(() => {
    console.log(orderDetail)
    if (!orderDetail) return navigate('/home')
    if (orderDetail.dataValues) {
      if (
        orderDetail.order?.userId != user.id &&
        orderDetail.product?.userId != user.id
      ) {
        return navigate('/home')
      }
    }
  }, [orderDetail])

  useEffect(() => {
    escrolear()
    console.log('Current chats are: ', mesagges)
  }, [mesagges])

  const handleChange = (e) => {
    setTxt(e.target.value)
  }
  return (
    <main className={style.chatContainer}>
      <section>
        <h2></h2>
        <ul className={`${style.txtContain} scroll`}>
          {mesagges.map((val, k) => {
            return (
              <li
                className={
                  val.id_user_send == user.id
                    ? style.userSend
                    : style.get
                }
                key={k}
              >
                {' '}
                <span>{val.text}</span>
              </li>
            )
          })}
        </ul>
        <form
          className={style.frmSendMessage}
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <textarea
            type='text'
            onChange={(e) => {
              handleChange(e)
            }}
            value={txt}
          ></textarea>
          <button>
            <i className='fa-solid fa-paper-plane'></i>
          </button>
        </form>
      </section>
      <aside></aside>
    </main>
  )
}

export default Chat
