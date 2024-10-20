// 'use client'
// import React, { useState, useRef, ReactNode } from 'react' // Assuming you have this file with the initial messages

import { ReactNode } from 'react'

// export const messages = [
//   {
//     from: 'James Johnson',
//     photo: '/images/profile/user-1.jpg',
//     subject: 'Hey, how are you?',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'Hi Luke.',
//         date: new Date('2016-01-05')
//       },
//       {
//         type: 'odd',
//         msg: 'How are you my friend?',
//         date: new Date('2016-01-06')
//       },
//       {
//         type: 'even',
//         msg: 'I am good and what about you?',
//         date: new Date('2016-01-07')
//       },
//       {
//         type: 'odd',
//         msg: 'Lorem Ipsum is simply dummy text of the printing & type setting industry.',
//         date: new Date('2016-01-08')
//       },
//       {
//         type: 'even',
//         msg: 'I would love to join the team.',
//         date: new Date('2016-01-09')
//       },
//       {
//         type: 'odd',
//         msg: 'Well we have good budget for the project.',
//         date: new Date('2016-01-10')
//       }
//     ]
//   },
//   {
//     from: 'Maria Hernandez',
//     photo: '/images/profile/user-2.jpg',
//     subject: 'Lorem ipsum done dkaghdka',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'this is odd2',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even2',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'Simply dummy text of the printing & type setting industry.',
//         date: new Date('2016-01-08')
//       },
//       {
//         type: 'even',
//         msg: 'Love to join the team.',
//         date: new Date('2016-01-09')
//       },
//       {
//         type: 'odd',
//         msg: 'Have good budget for the project.',
//         date: new Date('2016-01-10')
//       }
//     ]
//   },
//   {
//     from: 'David Smith',
//     photo: '/images/profile/user-3.jpg',
//     subject: 'Thanks mate',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'Hi Luke.',
//         date: new Date('2016-01-05')
//       },
//       {
//         type: 'odd',
//         msg: 'How are you my friend?',
//         date: new Date('2016-01-06')
//       },
//       {
//         type: 'even',
//         msg: 'I am good and what about you?',
//         date: new Date('2016-01-07')
//       },
//       {
//         type: 'odd',
//         msg: 'Lorem Ipsum is simply dummy text of the printing & type setting industry.',
//         date: new Date('2016-01-08')
//       },
//       {
//         type: 'even',
//         msg: 'I would love to join the team.',
//         date: new Date('2016-01-09')
//       },
//       {
//         type: 'odd',
//         msg: 'Well we have good budget for the project.',
//         date: new Date('2016-01-10')
//       }
//     ]
//   },
//   {
//     from: 'Maria Rodriguez',
//     photo: '/images/profile/user-4.jpg',
//     subject: 'This is my shot',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       }
//     ]
//   },
//   {
//     from: 'Robert Smith',
//     photo: '/images/profile/user-5.jpg',
//     subject: 'You have to do it with your self',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       }
//     ]
//   },
//   {
//     from: 'Joseph Sarah',
//     photo: '/images/profile/user-6.jpg',
//     subject: 'No mate this is not',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       }
//     ]
//   },
//   {
//     from: 'Thomas Smith',
//     photo: '/images/profile/user-1.jpg',
//     subject: 'Arti thai gai ne?',
//     chat: [
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'odd',
//         msg: 'this is odd',
//         date: new Date('2016-01-10')
//       },
//       {
//         type: 'even',
//         msg: 'this is even',
//         date: new Date('2016-01-10')
//       }
//     ]
//   }
// ]

// const Chat = (): ReactNode => {
//   const [sidePanelOpened, setSidePanelOpened] = useState<boolean>(true)
//   const [selectedMessage, setSelectedMessage] = useState<string>(messages[0])
//   const [msg, setMsg] = useState<string>('')
//   const inputRef = useRef<HTMLElement>(null)

//   const isOver = () => {
//     return window.matchMedia(`(max-width: 960px)`).matches
//   }

//   const onSelect = (message) => {
//     setSelectedMessage(message)
//   }

//   const onAddMsg = () => {
//     if (msg !== '') {
//       setSelectedMessage((prevState) => ({
//         ...prevState,
//         chat: [
//           ...prevState.chat,
//           {
//             type: 'even',
//             msg: msg,
//             date: new Date()
//           }
//         ]
//       }))
//       setMsg('')
//       inputRef.current.focus()
//     }
//   }

//   return (
//     <div className='card chat-app'>
//       <div className={`d-flex ${sidePanelOpened ? 'side-panel-opened' : 'side-panel-closed'}`}>
//         <div className={`bg-white ${isOver() ? 'position-absolute' : ''}`} style={{ width: '320px' }}>
//           <div className='p-4'>
//             <div className='d-flex align-items-center'>
//               <img src='/images/profile/user-1.jpg' className='rounded-circle' width='54' alt='User' />
//               <div className='ml-3'>
//                 <h4 className='mb-0 fs-5 fw-semibold'>Julia Roberts</h4>
//                 <span className='text-muted fs-6'>Marketing Manager</span>
//               </div>
//             </div>
//           </div>
//           <div className='px-4'>
//             <div className='input-group mb-3'>
//               <input type='text' className='form-control' placeholder='Search Contacts' />
//               <span className='input-group-text'>
//                 <i className='fas fa-search'></i>
//               </span>
//             </div>
//             <div className='dropdown'>
//               <button
//                 className='btn btn-secondary dropdown-toggle'
//                 type='button'
//                 id='dropdownMenuButton'
//                 data-bs-toggle='dropdown'
//                 aria-expanded='false'
//               >
//                 Recent Chats
//               </button>
//               <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
//                 <li>
//                   <a className='dropdown-item' href='#'>
//                     Sort by Time
//                   </a>
//                 </li>
//                 <li>
//                   <a className='dropdown-item' href='#'>
//                     Sort by Unread
//                   </a>
//                 </li>
//                 <li>
//                   <a className='dropdown-item' href='#'>
//                     Mark as all Read
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <ul className='list-group list-group-flush chat-list'>
//             {messages.map((message) => (
//               <li
//                 key={message.id}
//                 className={`list-group-item ${message === selectedMessage ? 'active' : ''}`}
//                 onClick={() => onSelect(message)}
//               >
//                 <div className='d-flex align-items-center'>
//                   <img src={message.photo} alt='' width='42' className='rounded-circle' />
//                   <div className='ml-3'>
//                     <h5 className='mb-0'>{message.from}</h5>
//                     <p className='mb-0 text-muted'>{message.subject}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className='flex-grow-1'>
//           <div className='bg-white border-bottom p-3 d-flex align-items-center'>
//             <button className='btn btn-link me-3' onClick={() => setSidePanelOpened(!sidePanelOpened)}>
//               <i className='fas fa-bars'></i>
//             </button>
//             <img src={selectedMessage.photo} width='40' className='rounded-circle' alt='' />
//             <h5 className='mb-0 ms-3'>{selectedMessage.from}</h5>
//             <div className='dropdown ms-auto'>
//               <button
//                 className='btn btn-link'
//                 type='button'
//                 id='dropdownMenuButton2'
//                 data-bs-toggle='dropdown'
//                 aria-expanded='false'
//               >
//                 <i className='fas fa-ellipsis-v'></i>
//               </button>
//               <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton2'>
//                 <li>
//                   <a className='dropdown-item' href='#'>
//                     Contact info
//                   </a>
//                 </li>
//                 <li>
//                   <a className='dropdown-item' href='#'>
//                     Mute
//                   </a>
//                 </li>
//                 <li>
//                   <a className='dropdown-item' href='#'>
//                     Delete chat
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className='chat-messages p-4' style={{ height: 'calc(100vh - 250px)', overflowY: 'auto' }}>
//             {selectedMessage.chat.map((c, index) => (
//               <div key={index} className={`chat-message ${c.type === 'odd' ? 'text-start' : 'text-end'} mb-3`}>
//                 <div
//                   className={`d-inline-block p-3 rounded ${c.type === 'odd' ? 'bg-light' : 'bg-primary text-white'}`}
//                 >
//                   {c.msg}
//                 </div>
//                 <div className='text-muted small mt-1'>{new Date(c.date).toLocaleString()}</div>
//               </div>
//             ))}
//           </div>
//           <div className='p-3 border-top'>
//             <div className='input-group'>
//               <input
//                 type='text'
//                 className='form-control'
//                 placeholder='Type a message'
//                 value={msg}
//                 onChange={(e) => setMsg(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && onAddMsg()}
//                 ref={inputRef}
//               />
//               <button className='btn btn-primary' type='button' onClick={onAddMsg} disabled={!msg}>
//                 <i className='fas fa-paper-plane'></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Chat

export default function Chat(): ReactNode {
  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}
