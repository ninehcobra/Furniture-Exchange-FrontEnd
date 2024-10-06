;(function () {
  let container
  let toggleBtn

  let color = 'blue'

  function initChatWidget() {
    // Tạo style cho widget
    const style = document.createElement('style')
    style.textContent = `
      #chat-widget-container {
        position: fixed;
        z-index: 9999;
        width: 350px;
        height: 520px;

      }
      #chat-widget-toggle {
        position: fixed;
        z-index: 10000;
        width: 45px;
        height: 45px;
  }

        .bg-custom, .btn-primary{
        background-color: ${color} !important;
        }

        .bg-custom-text{
        background-color:${color} !important;
        opacity: 0.7;
        }


  
      
    `
    document.head.appendChild(style)

    // Thêm library vào header
    // FontAwesome
    const fontawesomeLibrary = document.createElement('script')
    fontawesomeLibrary.src = 'https://kit.fontawesome.com/03244eb91d.js'
    fontawesomeLibrary.crossOrigin = 'anonymous'
    // Bootstrap
    const bootstrapLibrary = document.createElement('link')
    bootstrapLibrary.rel = 'stylesheet'
    bootstrapLibrary.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'

    // Moment
    const momentLibrary = document.createElement('script')
    momentLibrary.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js'
    // Thêm các thư viện vào header

    document.head.appendChild(fontawesomeLibrary)
    document.head.appendChild(bootstrapLibrary)
    document.head.appendChild(momentLibrary)
    // Tạo container cho widget
    container = document.createElement('div')
    container.id = 'chat-widget-container'
    container.style.display = 'none'

    // Tạo nút toggle
    toggleBtn = document.createElement('div')
    toggleBtn.id = 'chat-widget-toggle'
    toggleBtn.className =
      'd-flex justify-content-center align-items-center rounded-circle  text-white btn close-btn bg-custom '
    toggleBtn.innerHTML = '<i class="fa-solid fa-comment "></i>'

    // Thêm nội dung chat từ template
    container.innerHTML = `
      <!DOCTYPE html>
<html lang="en">
  <head>
   

    <style>
      :root {
        font-family: "Poppins", system-ui;
      }

      .poppins-100 {
        font-family: "Poppins", system-ui;
        font-weight: 100;
        font-style: normal;
      }

      .poppins-200 {
        font-family: "Poppins", system-ui;
        font-weight: 200;
        font-style: normal;
      }

      .poppins-300 {
        font-family: "Poppins", system-ui;
        font-weight: 300;
        font-style: normal;
      }

      .poppins-400 {
        font-family: "Poppins", system-ui;
        font-weight: 400;
        font-style: normal;
      }

      .poppins-500 {
        font-family: "Poppins", system-ui;
        font-weight: 500;
        font-style: normal;
      }

      .poppins-600 {
        font-family: "Poppins", system-ui;
        font-weight: 600;
        font-style: normal;
      }

      .poppins-700 {
        font-family: "Poppins", system-ui;
        font-weight: 700;
        font-style: normal;
      }

      .poppins-800 {
        font-family: "Poppins", system-ui;
        font-weight: 800;
        font-style: normal;
      }

      .poppins-900 {
        font-family: "Poppins", system-ui;
        font-weight: 900;
        font-style: normal;
      }

      .sidebar {
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #dee2e6;
      }

      .main-chat {
        display: flex;
        flex-direction: column;
      }

      .chat-messages {
        flex-grow: 1;
        overflow-y: auto;
      }

      .chat-list .list-group-item {
        display: flex;
        align-items: center;
        padding: 10px;
      }

      .chat-list .list-group-item img {
        margin-right: 15px;
      }

      .message-row {
        max-width: 100%;
      }

      .message-content {
        display: inline-block;
      }

      @media (max-width: 768px) {
        .sidebar {
          height: auto;
          border-right: none;
          border-bottom: 1px solid #dee2e6;
        }

        .main-chat {
          height: calc(100vh - 200px);
        }
      }

      .chat-container {
        border-radius: 7px;
        border: 1px solid #dee2e6 !important;
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      .dropdown {
        cursor: pointer;
      }

      .close-btn:hover {
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <div style="width: 350px; height: 520px">
      <div class="h-100 chat-container">
        <!-- Main Chat Area -->
        <div class="main-chat h-100">
          <div
            class="chat-header p-3 border-bottom d-flex align-items-center justify-content-between"
          >
            <div class="d-flex align-items-center">
              <img
                src="https://raw.githubusercontent.com/ninehcobra/free-host-image/refs/heads/main/user-1.jpg"
                class="rounded-circle"
                width="40"
                alt="Contact"
              />
              <h5 class="mb-0 ms-3">CaoNiMa</h5>
            </div>
            <div class="dropdown">
              <i class="fa-solid fa-ellipsis"></i>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Contact info</a></li>
                <li><a class="dropdown-item" href="#">Mute</a></li>
                <li><a class="dropdown-item" href="#">Delete chat</a></li>
              </ul>
            </div>
          </div>

          <div class="chat-messages p-3" id="chatBox">
            <div class="message-row d-flex justify-content-start mb-3">
              <div class="message-content bg-light p-2 rounded">
                <p class="mb-0">Hi there! How are you?</p>
                <small class="text-muted">10:30 AM</small>
              </div>
            </div>
            <div class="message-row d-flex justify-content-end mb-3">
              <div class="message-content bg-custom-text text-white p-2 rounded">
                <p class="mb-0">I'm good, thanks! How about you?</p>
                <small class="text-white-50">10:32 AM</small>
              </div>
            </div>
            <div class="message-row d-flex justify-content-start mb-3">
              <div class="message-content bg-light p-2 rounded">
                <p class="mb-0">
                  csadasdaskdkamskdmaksmdkamskdaksdka
                  csadasdaskdkamskdmaksmdkamskdaksdka
                  csadasdaskdkamskdmaksmdkamskdaksdka
                  csadasdaskdkamskdmaksmdkamskdaksdka
                  csadasdaskdkamskdmaksmdkamskdaksdka
                  csadasdaskdkamskdmaksmdkamskdaksdka
                </p>
                <small class="text-muted">10:30 AM</small>
              </div>
            </div>
            <div class="message-row d-flex justify-content-end mb-3">
              <div class="message-content bg-custom-text text-white p-2 rounded">
                <p class="mb-0">I'm good, thanks! How about you?</p>
                <small class="text-white-50">10:32 AM</small>
              </div>
            </div>
            <div class="message-row d-flex justify-content-start mb-3">
              <div class="message-content bg-light p-2 rounded">
                <p class="mb-0">Hi there! How are you?</p>
                <small class="text-muted">10:30 AM</small>
              </div>
            </div>
            <div class="message-row d-flex justify-content-end mb-3">
              <div class="message-content bg-custom-text text-white p-2 rounded">
                <p class="mb-0">I'm good, thanks! How about you?</p>
                <small class="text-white-50">10:32 AM</small>
              </div>
            </div>
            <!-- Add more message rows as needed -->
          </div>

          <div class="chat-input p-3 border-top" >
            <form id="chatForm">
              <div class="input-group">
                <input
                  id="chatInput"
                  type="text"
                  class="form-control p-2"
                  placeholder="Type a message..."
                />
                <button class="btn btn-primary" type="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

   
  </body>
</html>

    `

    // Thêm các phần tử vào body
    document.body.appendChild(container)
    document.body.appendChild(toggleBtn)

    // Xử lý việc hiển thị/ẩn widget
    let isVisible = false
    toggleBtn.addEventListener('click', () => {
      isVisible = !isVisible
      container.style.display = isVisible ? 'block' : 'none'
      toggleBtn.innerHTML = isVisible ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-comment"></i>'
    })

    // logic thêm tin nhắn
    document.getElementById('chatForm').addEventListener('submit', function (event) {
      event.preventDefault() // Ngăn không cho form reload trang

      const chatInput = document.getElementById('chatInput')
      const message = chatInput.value.trim()

      if (message !== '') {
        // Thêm tin nhắn của người dùng vào chat box
        addMessageToChat(message, 'user-message')

        // Xóa input sau khi gửi
        chatInput.value = ''

        // Giả sử hệ thống tự động trả lời (có thể thay bằng API AI chatbot)
        setTimeout(function () {
          addMessageToChat('This is an automated response', 'bot-message')
        }, 500)
      }
    })

    function addMessageToChat(message, className) {
      const chatBox = document.getElementById('chatBox')
      momentLibrary.onload = function () {
        moment.locale('vi')
      }

      const currentTime = moment().format('h:mm A')

      let messageHtml

      if (className === 'user-message') {
        messageHtml = `
                  <div class="message-row d-flex justify-content-end mb-3">
                    <div class="message-content bg-custom-text text-white p-2 rounded">
                      <p class="mb-0">${message}</p>
                      <small class="text-white-50">10:32 AM</small>
                    </div>
                  </div>`
      } else {
        messageHtml = `
                  <div class="message-row d-flex justify-content-start mb-3">
                    <div class="message-content bg-light p-2 rounded">
                      <p class="mb-0">${message}</p>
                      <small class="text-muted">${currentTime}</small>
                    </div>
                  </div>`
      }

      chatBox.innerHTML += messageHtml

      chatBox.scrollTop = chatBox.scrollHeight
    }
  }

  // Gọi hàm initChatWidget khi DOM đã sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget)
  } else {
    initChatWidget()
  }

  // Hàm để đặt vị trí widget
  function setPosition(position) {
    const [vertical, horizontal] = position.split('-')

    container.style[vertical] = '80px'
    container.style[horizontal] = '20px'
    toggleBtn.style[vertical] = '20px'
    toggleBtn.style[horizontal] = '20px'
  }

  // Hàm để đặt màu sắc
  function setColor(newColor) {
    color = newColor
    updateColors()
  }

  function updateColors() {
    const style = document.createElement('style')
    style.textContent = `
      .bg-custom, .btn-primary {
        background-color: ${color} !important;
      }
      .bg-custom-text {
        background-color: ${color} !important;
        opacity: 0.7;
      }
    `
    document.head.appendChild(style)
  }

  // Hàm để cấu hình widget
  window.configChatWidget = function (config) {
    if (config.position) setPosition(config.position)
    if (config.color) setColor(config.color)
  }
})()
