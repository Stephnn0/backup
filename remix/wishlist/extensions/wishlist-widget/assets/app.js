// function getData() {
//   return new Promise((resolve, reject) => {
//     fetch(`https://test-youtubee.myshopify.com/apps/akatski`, {
//       method: 'GET',
//       // redirect: 'manual', // Prevent automatic redirection
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     })
//       .then((response) => {
//         console.log(response, 'response');
//         if (!response.ok) {
//           console.log(response, 'response');

//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }



function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display == 'none' ? 'block' : 'none';
  }

  document.addEventListener('click', function (event) {
    const chatWindow = document.getElementById('chat-window');
    const chatWidget = document.getElementById('chat-widget');

    if (!chatWindow.contains(event.target) && !chatWidget.contains(event.target)) {
      // Clicked outside of both chat window and chat widget
      chatWindow.style.display = 'none';
    }
  });